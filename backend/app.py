from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from image_processing import load_image, perform_style_transfer

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
STYLES_FOLDER = 'styles'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(STYLES_FOLDER, exist_ok=True)


@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files or 'style' not in request.form:
        return jsonify({'error': 'No image or style provided'}), 400

    image = request.files['image']
    style = request.form['style']

    filename = secure_filename(image.filename)
    image_path = os.path.join(UPLOAD_FOLDER, filename)
    image.save(image_path)

    content_img = load_image(image_path)
    style_img = load_image(os.path.join(STYLES_FOLDER, f'{style}.jpg'))

    output_image_path = perform_style_transfer(content_img, style_img)

    return send_file(output_image_path, mimetype='image/png', as_attachment=True, download_name=f'styled_{filename}')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
