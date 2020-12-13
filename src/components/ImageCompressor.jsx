import React, { useState } from "react";

function ImageCompressor() {
	const [img, setImg] = useState("");
	const [fileUpload, setFileUpload] = useState(false);
	const [compressedImg, setCompressedImg] = useState("");

	const handleImageUpload = (event) => {
		const imageFile = event.target.files[0];
		setImg(imageFile);
		setFileUpload(true);
	};

	const compress = () => {
		const options = {
			maxSizeMB: 1,
			maxWidthOrHeight: 1920,
			useWebWorker: true,
		};
		console.log(img.size / 1024 / 1024);
		if (options.maxSizeMB >= img.size / 1024 / 1024) {
			alert("This image is too small to be compressed");
		}
	};

	console.log(img);
	return (
		<div>
			<label htmlFor="file-input">Choose an image</label>
			<input type="file" accept="image/*" onChange={handleImageUpload} />
			<label htmlFor="compress-button">Compress</label>
			<button onClick={compress}>Compress</button>
		</div>
	);
}

export default ImageCompressor;
