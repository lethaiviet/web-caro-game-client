import { UserStates } from "@/interfaces/users.interface";
import { getAvatarTemplate } from "@/utils/utils";
import { Stack } from "react-bootstrap";
import Avatar from "./Avatar";

interface ContactProps {
  data: UserStates;
}

export default function Contact({ data }: ContactProps) {
  return (
    <div className="w-100">
      <Stack
        direction="horizontal"
        className="border-start border-bottom border-end P-20"
      >
        <Avatar
          src={
            data.avatar === "" ? getAvatarTemplate(data.name, 75) : data.avatar
          }
        />
        <Stack className="justify-content-center pL-20">
          <small className="lh-1">{data.name}</small>
          <h6 className="lh-1 my-0 fw-light">{data.status}</h6>
        </Stack>
      </Stack>
    </div>
  );
}
