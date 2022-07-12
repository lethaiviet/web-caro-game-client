import { UserStates } from "@/interfaces/users.interface";
import { getAvatarTemplate } from "@/utils/utils";
import { Badge, Stack } from "react-bootstrap";
import { CircleFill, Circle } from "react-bootstrap-icons";
import Avatar from "./Avatar";

interface ContactProps {
  data: UserStates;
  onClick?: () => void;
  selected?: boolean;
  countNotification?: number;
}

export default function Contact({
  data,
  onClick,
  selected,
  countNotification = 0,
}: ContactProps) {
  return (
    <div
      className={"contact w-100" + (selected ? " selected" : "")}
      onClick={onClick}
    >
      <Stack direction="horizontal" className="border-bottom P-20">
        <Avatar
          src={
            data.avatar === "" ? getAvatarTemplate(data.name, 75) : data.avatar
          }
        />
        <Stack className="justify-content-center pL-20">
          <small className="lh-1 mb-1">{data.name}</small>
          <h6
            className="lh-1 my-0 fw-light d-flex align-items-center"
            style={{ color: data.status === "Online" ? "#8DE69C" : "gray" }}
          >
            {data.status === "Online" ? (
              <CircleFill size={10} className="me-1" />
            ) : (
              <Circle size={10} className="me-1" />
            )}
            {data.status}
          </h6>
        </Stack>
        {countNotification > 0 && (
          <Badge
            className="p-1 rounded-circle"
            pill
            bg="info"
            style={{ lineHeight: 0.7 }}
          >
            {countNotification > 9 ? "9+" : countNotification}
            <span className="visually-hidden">unread messages</span>
          </Badge>
        )}
      </Stack>
    </div>
  );
}
