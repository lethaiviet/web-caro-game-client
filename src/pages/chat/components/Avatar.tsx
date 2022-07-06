import { Image } from "react-bootstrap";
import { CSSProperties } from "react";

export interface AvatarProps {
  style?: CSSProperties;
  src: string;
}

export default function Avatar({ style, src }: AvatarProps) {
  return (
    <Image
      style={{ ...style, width: "3rem" }}
      src={src}
      alt={src}
      fluid
      roundedCircle
    />
  );
}
