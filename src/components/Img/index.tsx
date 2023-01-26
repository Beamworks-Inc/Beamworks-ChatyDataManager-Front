import React from "react";

export default function Img(props: { src: string }) {
	const { src } = props;

	const [valid, setValid] = React.useState(true);

	React.useEffect(() => {
		setValid(true);
	}, [src]);

	if (!valid) {
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
			onError={() => setValid(false)}
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
