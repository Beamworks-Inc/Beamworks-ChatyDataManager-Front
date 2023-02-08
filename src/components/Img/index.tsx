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
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					boxSizing: "border-box",
					color: "red",
					fontWeight: "bolder",
				}}
			>
				<div>잘못된 링크 형식입니다</div>
				<div>'이미지'링크를 그대로 붙여넣어 주세요</div>
			</div>
		);
	}

	return (
		<img
			onError={() => setValid(false)}
			src={src}
			alt={"No Valid Image Link\n"}
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
