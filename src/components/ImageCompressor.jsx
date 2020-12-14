import React, { useState } from "react";
import imageCompression from "browser-image-compression";

function ImageCompressor() {
	const [img, setImg] = useState(null);
	const [fileUpload, setFileUpload] = useState(false);
	const [compressedImg, setCompressedImg] = useState(null);
	const [compressedURL, setcompressedURL] = useState("");

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
		if (options.maxSizeMB >= img.size / 1024 / 1024) {
			alert("This image is too small to be compressed");
		}
		imageCompression(img, options)
			.then((compressedFile) => {
				setCompressedImg(compressedFile);
			})
			.catch((err) => {
				alert(err.message);
			});
	};

	const download = () => {
		const blob = new Blob([compressedImg], {
			type: "application/octet-stream",
		});
		let downloadLink = URL.createObjectURL(blob);
		setcompressedURL(downloadLink);
	};

	if (compressedImg !== null) {
		console.log(compressedImg.size / 1024 / 1024);

		console.log(img.size / 1024 / 1024);
	}

	return (
		<div>
			<label htmlFor="file-input">Choose an image</label>
			<input type="file" accept="image/*" onChange={handleImageUpload} />
			<label htmlFor="compress-button ">Compress</label>
			<button className="btn btn-outline" onClick={compress}>
				Compress
			</button>
			<label htmlFor="download-button">Download</label>
			<a
				href={compressedURL}
				className="btn  btn-outline"
				download={compressedURL}
				onClick={download}
			>
				Download
			</a>
		</div>
	);
}

export default ImageCompressor;
