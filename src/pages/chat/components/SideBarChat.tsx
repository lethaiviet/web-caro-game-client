import { Offcanvas } from "react-bootstrap";
import Contact from "./Contact";

const data = Array.from({ length: 30 }, (i) => i);

export default function SideBarChat() {
  return (
    <Offcanvas show={true} className="mx-0" style={{ width: "282px" }}>
      <Offcanvas.Body>
        {data.map((x) => (
          <Contact />
        ))}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
