import React, { useState } from 'react';
import axios from 'axios';



const painters = {
  'Picasso': ['art-transfer/src/styles/Picasso/Pablo_Picasso_4.jpg', 'art-transfer/src/styles/Picasso/Pablo_Picasso_14.jpg', 'art-transfer/src/styles/Picasso/Pablo_Picasso_23.jpg', 'art-transfer/src/styles/Picasso/Pablo_Picasso_54.jpg'],
  'DaVinci': ['art-transfer/src/styles/DaVinci/Mona_Lisa.jpg', 'art-transfer/src/styles/DaVinci/Leonardo_da_Vinci_20.jpg', 'art-transfer/src/styles/DaVinci/Leonardo_da_Vinci_47.jpg', 'art-transfer/src/styles/DaVinci/Leonardo_da_Vinci_67.jpg'],
  'VanGogh': ['art-transfer/src/styles/VanGogh/Vincent_van_Gogh_2.jpg', 'art-transfer/src/styles/VanGogh/Vincent_van_Gogh_5.jpg', 'art-transfer/src/styles/VanGogh/Vincent_van_Gogh_10.jpg', 'art-transfer/src/styles/VanGogh/Vincent_van_Gogh_26.jpg'],
  'Monet': ['art-transfer/src/styles/Monet/Claude_Monet_10.jpg', 'art-transfer/src/styles/Monet/Claude_Monet_3.jpg', 'art-transfer/src/styles/Monet/Claude_Monet_18.jpg', 'art-transfer/src/styles/Monet/Claude_Monet_66.jpg'],
  'Kandinskiy': ['art-transfer/src/styles/ Kandinskiy/Vasiliy_Kandinskiy_1.jpg', 'art-transfer/src/styles/ Kandinskiy/Vasiliy_Kandinskiy_4.jpg', 'art-transfer/src/styles/ Kandinskiy/Vasiliy_Kandinskiy_7.jpg', 'art-transfer/src/styles/ Kandinskiy/Vasiliy_Kandinskiy_10.jpg'],
};

function App() {
  const [selectedPainter, setSelectedPainter] = useState('');
  const [selectedPainting, setSelectedPainting] = useState('');
  const [image, setImage] = useState(null);
  const [styledImageUrl, setStyledImageUrl] = useState('');

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleStyleTransfer = async () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('style', selectedPainting);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        responseType: 'blob'
      });
      const url = URL.createObjectURL(new Blob([response.data]));
      setStyledImageUrl(url);
    } catch (error) {
      console.error('Error during style transfer:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Neural Style Transfer</h1>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Upload your image:</label>
        <input type="file" onChange={handleImageUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Select a painter:</label>
        <select onChange={(e) => setSelectedPainter(e.target.value)} className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option value="">Select a painter</option>
          {Object.keys(painters).map(painter => (
            <option key={painter} value={painter}>{painter}</option>
          ))}
        </select>
      </div>
      {selectedPainter && (
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Select a painting:</label>
          <select onChange={(e) => setSelectedPainting(e.target.value)} className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="">Select a painting</option>
            {painters[selectedPainter].map(painting => (
              <option key={painting} value={painting}>{painting}</option>
            ))}
          </select>
        </div>
      )}
      <button onClick={handleStyleTransfer} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Apply Style Transfer</button>
      {styledImageUrl && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">Styled Image:</h2>
          <img src={styledImageUrl} alt="Styled" className="border rounded-md" />
          <a href={styledImageUrl} download={`styled_image.png`} className="block mt-2 text-blue-500 hover:underline">Download Image</a>
        </div>
      )}
    </div>
  );
}

export default App;
