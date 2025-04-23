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

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch("https://structural-defect-ai.onrender.com/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.detected && data.detected.length > 0) {
        const name = data.detected[0];
        const confidence = (data.confidences[0] * 100).toFixed(2);
        setResult(`Detected: ${name} — Confidence: ${confidence}%`);
      } else {
        setResult("No defects detected.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Error analyzing image.");
    }
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