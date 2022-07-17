import { Image } from "react-bootstrap";
import { CSSProperties } from "react";

export interface AvatarProps {
  style?: CSSProperties;
  src: string;
}

export default function Avatar({ style, src }: AvatarProps) {
  return (
    <Image
      className="m-1 p-0"
      style={{ ...style, width: "2rem" }}
      src={src}
      alt={src}
      fluid
      roundedCircle
    />
  );
}
