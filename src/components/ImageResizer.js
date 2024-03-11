import React, { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import { Resizable } from "re-resizable";

function ImageResize(props) {
    const { imageToResize, onImageResized, resizeAspect, resizeQuality, style } = props;

    const [imageToResizeUri, setImageToResizeUri] = useState();
    const [imageToResizeWidth, setImageToResizeWidth] = useState();
    const [imageToResizeHeight, setImageToResizeHeight] = useState();
    const [resizableStyle, setResizableStyle] = useState(style);

    useEffect(() => {
        if (imageToResize) {
            const reader = new FileReader();

            reader.addEventListener('load', () => {
                setImageToResizeUri(reader.result);
            });

            reader.readAsDataURL(imageToResize);
        }
    }, [imageToResize]);

    useEffect(() => {
        if (imageToResizeUri) {
            const img = new Image();
            img.onload = () => {
                setImageToResizeWidth(img.width);
                setImageToResizeHeight(img.height);
            };
            img.src = imageToResizeUri;
        }
    }, [imageToResizeUri]);

    useEffect(() => {
        if (imageToResize && imageToResizeWidth !== undefined && imageToResizeHeight !== undefined) {
            const newWidth = imageToResizeWidth * resizeAspect;
            const newHeight = imageToResizeHeight * (newWidth / imageToResizeWidth);

            Resizer.imageFileResizer(
                imageToResize,
                newWidth,
                newHeight,
                "JPEG",
                resizeQuality,
                0,
                (uri) => {
                    onImageResized(uri);
                },
                "base64"
            );
        }
    }, [imageToResize, imageToResizeWidth, imageToResizeHeight, onImageResized, resizeAspect, resizeQuality]);
  
    return (
        <Resizable
            style={resizableStyle}
            defaultSize={{ width: resizableStyle.width, height: resizableStyle.height }}
            onResizeStop={(e, direction, ref, d) => {
                if (ref.style.width && ref.style.height) {
                    setResizableStyle({ ...resizableStyle, width: ref.style.width, height: ref.style.height });
                }
            }}
        >
            {imageToResizeUri && (
                <img
                    src={imageToResizeUri}
                    alt="Resized Image"
                    style={{ width: '100%', height: '100%', objectFit: "cover" }}
                />
            )}
        </Resizable>
    );
}

ImageResize.defaultProps = {
    onImageResized: () => {},
    resizeAspect: 0.9,
    resizeQuality: 100
};

export default ImageResize;
