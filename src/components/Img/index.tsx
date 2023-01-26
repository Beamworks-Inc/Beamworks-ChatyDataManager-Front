function isImageAddress(url: URL) {
	return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url.toString());
}

function isValidImage(src: string) {
	try {
		if (isImageAddress(new URL(src))) return true;
		else return false;
	} catch (error) {
		return false;
	}
}

export default function Img(props: { src: string }) {
	const { src } = props;

	if (!isValidImage(src)) {
		return (
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					boxSizing: "border-box",
					color: "red",
					fontWeight: "bolder",
				}}
			>
				No Valid Image Link
			</div>
		);
	}

	return (
		<img
			src={src}
			alt={"No Valid Image Link"}
			style={{
				width: "100%",
				height: "100%",
				borderRadius: "10px",
				objectFit: "contain",
			}}
			loading="lazy"
		/>
	);
}
