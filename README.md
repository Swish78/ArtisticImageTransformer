# Neural Style Transfer Web App

This project implements the neural style transfer algorithm as described in the paper "A Neural Algorithm of Artistic Style" by Leon A. Gatys et al. It provides a web application where users can upload an image and apply the style of one of several famous painters to it. The application uses a Flask backend for processing and a React frontend for user interaction.

## Features

- Upload your own image to be styled.
- Choose from styles of 5 fixed painters.
- View the styled image directly in your browser.
- Hosted on AWS for processing and storage.

## Technologies

- **Backend**: Flask
- **Frontend**: React
- **Style Transfer**: PyTorch (Neural Style Transfer model)
- **Deployment**: AWS

## Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/neural-style-transfer-web-app.git
   ```

2. Navigate to the backend directory:
   ```bash
   cd neural-style-transfer-web-app/backend
   ```

3. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

4. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Set up environment variables (e.g., for AWS S3 credentials).

6. Run the Flask server:
   ```bash
   python app.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd neural-style-transfer-web-app/frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

## Usage

1. Open your web browser and navigate to `http://localhost:3000` (or the URL where your React app is hosted).
2. Upload an image and select a style from the available options.
3. The styled image will be displayed after processing.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [A Neural Algorithm of Artistic Style](https://arxiv.org/abs/1508.06576) by Leon A. Gatys et al.
- [PyTorch](https://pytorch.org/)
- [React](https://reactjs.org/)
- [Flask](https://flask.palletsprojects.com/)
```
