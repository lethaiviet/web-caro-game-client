import { Image } from "react-bootstrap";
import { CSSProperties } from "react";

export interface AvatarProps {
  style?: CSSProperties;
}

export default function Avatar({ style }: AvatarProps) {
  return (
    <Image
      style={{ ...style, width: "3rem" }}
      src="https://via.placeholder.com/200?text=G"
      alt="..."
      fluid
      roundedCircle
    />
  );
}
