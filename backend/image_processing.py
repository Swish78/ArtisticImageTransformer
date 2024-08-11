import torch
from torch import optim, nn
from torchvision import models, transforms
from torchvision.utils import save_image
from PIL import Image

# Define image transformations
image_size = 224
loader = transforms.Compose([
    transforms.Resize((image_size, image_size)),
    transforms.ToTensor(),
])


def load_image(image_path):
    image = Image.open(image_path)
    image = loader(image).unsqueeze(0)
    return image.to(torch.device("cuda" if torch.cuda.is_available() else "cpu"), torch.float)


class VGG(nn.Module):
    def __init__(self):
        super(VGG, self).__init__()
        self.features_to_use = ['0', '5', '10', '19', '28']
        self.model = models.vgg19(weights='IMAGENET1K_V1').features

    def forward(self, x):
        features = []
        for layer_num, layer in enumerate(self.model):
            x = layer(x)
            if str(layer_num) in self.features_to_use:
                features.append(x)
        return features


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = VGG().to(device).eval()


def perform_style_transfer(content_img, style_img, total_steps=2000, alpha=1e5, beta=1e10):
    optimizer = optim.Adam([content_img.requires_grad_()], lr=0.003)
    mse_loss = nn.MSELoss()
    generated = content_img.clone().requires_grad_(True)

    for step in range(total_steps):
        generated_features = model(generated)
        content_img_features = model(content_img)
        style_img_features = model(style_img)

        content_loss = 0
        style_loss = 0

        for gen_fea, cont_fea, style_fea in zip(generated_features, content_img_features, style_img_features):
            batch_size, channel, height, width = gen_fea.shape
            content_loss += mse_loss(gen_fea, cont_fea)

            G = gen_fea.view(channel, height * width).mm(gen_fea.view(channel, height * width).t())
            A = style_fea.view(channel, height * width).mm(style_fea.view(channel, height * width).t())
            style_loss += mse_loss(G, A)

        total_loss = alpha * content_loss + beta * style_loss

        optimizer.zero_grad()
        total_loss.backward()
        optimizer.step()

    # Save the generated image
    output_image_path = "generated_image.png"
    save_image(generated, output_image_path)
    return output_image_path
