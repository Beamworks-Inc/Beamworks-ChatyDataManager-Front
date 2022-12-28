export default function Img(props: { src: string; alt: string }) {
  return (
    <img
      src={props.src}
      alt={props.alt}
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
