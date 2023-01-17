function isInValidImage(src: string) {
	try {
		new URL(src);
		return true;
	} catch (error) {
		return false;
	}
}

export default function Img(props: { src: string }) {
	const { src } = props;

	if (!isInValidImage(src)) {
		return (
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					boxSizing: "border-box",
				}}
			>
				No Valid Image Link
			</div>
		);
	}

	return (
		<img
			src={src}
			alt={"Image Link is not valid"}
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
