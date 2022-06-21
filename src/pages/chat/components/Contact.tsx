import { Stack } from "react-bootstrap";
import Avatar from "./Avatar";

export default function Contact() {
  return (
    <div className="w-100">
      <Stack
        direction="horizontal"
        className="border-start border-bottom border-end P-20"
      >
        <Avatar />
        <Stack className="justify-content-center pL-20">
          <small className="lh-1">Fake Name</small>
          <h6 className="lh-1 my-0 fw-light">Online</h6>
        </Stack>
      </Stack>
    </div>
  );
}
