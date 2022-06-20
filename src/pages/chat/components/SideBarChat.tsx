//@ts-ignore
import { Scrollbars } from "react-custom-scrollbars-2";

import Contact from "./Contact";

const data = Array.from({ length: 30 }, (i) => i);

export default function SideBarChat() {
  return (
    <div
      className="position-relative top-0 start-0 bottom-0 vh-100 overflow-auto"
      style={{ width: "250px" }}
    >
      <Scrollbars>
        {data.map((x) => (
          <Contact />
        ))}
      </Scrollbars>
    </div>
  );
}
