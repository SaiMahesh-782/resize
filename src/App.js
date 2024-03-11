import React, { useState } from "react";
import './App.css';
import ImageResize from "./components/ImageResizer";

function App() {
    const [imageToResize, setImageToResize] = useState(undefined);
    const [ResizedImage, setResizedImage] = useState(undefined);

    const onUploadFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setImageToResize(event.target.files[0]);
        }
    };

    return (
        <div className="app">
            <h1>Image Resizer</h1>
          
            <input
                type="file"
                accept="image/*"
                onChange={onUploadFile}
            />
            <div className="image-container">
                <div className="image-row">
                    {/* First image with 20% width and 500px height */}
                    <ImageResize
                        imageToResize={imageToResize}
                        onImageResized={(resizedImage) => setResizedImage(resizedImage)}
                        style={{ margin:'10px', width: '20%', height: '500px' }}
                    />
                    {/* Second image with 80% width and 500px height */}
                    <ImageResize
                        imageToResize={imageToResize}
                        onImageResized={(resizedImage) => setResizedImage(resizedImage)}
                        style={{margin:'10px', width: '73%', height: '500px' }}
                    />
                </div>
                {/* Third image with 100% width and 500px height */}
                <ImageResize
                    imageToResize={imageToResize}
                    onImageResized={(resizedImage) => setResizedImage(resizedImage)}
                    style={{margin:'10px', width: '100%', height: '500px' }}
                />
            </div>
          
        </div>
    );
}

export default App;
