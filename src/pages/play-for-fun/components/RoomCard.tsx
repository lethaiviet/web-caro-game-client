import { useAppSelector } from "@/app/hook";
import { GameRoom } from "@/interfaces/game-rooms.interface";
import { UserStates } from "@/interfaces/users.interface";
import { selectChat } from "@/pages/chat/chatSlice";
import { getAvatarTemplate } from "@/utils/utils";
import { useEffect, useState } from "react";
import { Button, Card, Stack, Row, Col } from "react-bootstrap";
import Avatar from "./Avatar";
import { PersonCircle } from "react-bootstrap-icons";

const PlayersInfoSection = ({ data }: { data: UserStates[] }) => {
  const numOfPlayer = data.length;
  const numOfEmptySlot = 2 - numOfPlayer;
  console.log(numOfEmptySlot);
  return (
    <>
      {numOfEmptySlot > 0 && <Row>Left {numOfEmptySlot} slot</Row>}
      {numOfEmptySlot === 0 && <Row>Room is Full</Row>}

      <Row>
        {data.map((player) => (
          <Avatar
            src={
              player.avatar === ""
                ? getAvatarTemplate(player.name, 75)
                : player.avatar
            }
          />
        ))}

        {Array(numOfEmptySlot)
          .fill("")
          .map((x) => (
            <div className="m-1 p-0" style={{ height: "2rem", width: "2rem" }}>
              <PersonCircle size="2rem" className="p-0" />
            </div>
            // <Avatar src={getAvatarTemplate(x, 75)} />
          ))}
      </Row>
    </>
  );
};

export default function RoomCard({ data }: { data: GameRoom }) {
  const [players, setPlayers] = useState<UserStates[]>([]);
  const { usersStates } = useAppSelector(selectChat);

  useEffect(() => {
    const findPlayers = usersStates.filter((x) => data.players.includes(x._id));
    setPlayers(findPlayers);
  }, [data]);

  return (
    <Card border="dark" style={{ borderRadius: "20px" }} className="font-round">
      <Stack className="P-25">
        <span className="fs-4" style={{ lineHeight: "0.4" }}>
          {data.name}
        </span>
        <span className="fs-6" style={{ marginBottom: "32px" }}>
          {`#${data._id}`}
        </span>
        <Row>
          <Col className="d-flex align-items-end">
            <Button>Join</Button>
          </Col>
          <Col xs={{ span: 4, offset: 4 }}>
            <PlayersInfoSection data={players} />
          </Col>
        </Row>
      </Stack>
    </Card>
  );
}
