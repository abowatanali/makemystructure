import React, { useState } from 'react';

function UploadImage() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!image) return alert("Please select an image.");
    setResult("Analyzing image...");

    // This is where your AI API will be called later
    setTimeout(() => {
      setResult("Detected: Crack in the wall - Confidence: 85%");
    }, 1500);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Analyze Image</button>
      {result && <p>{result}</p>}
    </div>
  );
}

export default UploadImage;
