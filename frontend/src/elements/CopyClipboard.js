import React, { useState } from "react";

const CopyClipboard = ({ copyText }) => {
	const [isCopied, setIsCopied] = useState(false);

	async function copyTextToClipboard(text) {
		if ("clipboard" in navigator) {
			return await navigator.clipboard.writeText(text);
		} else {
			return document.execCommand("copy", true, text);
		}
	}

	const handleCopyClick = () => {
		copyTextToClipboard(copyText)
			.then(() => {
				setIsCopied(true);
				setTimeout(() => {
					setIsCopied(false);
				}, 1500);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<input style={{ width: "65%" }} type="text" value={copyText} readOnly />
			<button style={{ width: "35%" }} onClick={handleCopyClick}>
				<span>{isCopied ? "Copiado!" : "Copiar"}</span>
			</button>
		</div>
	);
};

export default CopyClipboard;
