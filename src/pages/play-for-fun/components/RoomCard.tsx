import { useAppDispatch, useAppSelector } from "@/app/hook";
import { GameRoom } from "@/interfaces/game-rooms.interface";
import { UserStates } from "@/interfaces/users.interface";
import { selectChat } from "@/pages/chat/chatSlice";
import { getAvatarTemplate } from "@/utils/utils";
import { useEffect, useState } from "react";
import { Button, Card, Stack, Row, Col } from "react-bootstrap";
import Avatar from "./Avatar";
import { PersonCircle } from "react-bootstrap-icons";
import _ from "lodash";
import { actionGame } from "@/pages/game/gameSlice";

const PlayersInfoSection = ({ data }: { data: UserStates[] }) => {
  const numOfPlayer = data.length;
  const numOfEmptySlot = 2 - numOfPlayer;

  return (
    <>
      {numOfEmptySlot > 0 && <Row>Left {numOfEmptySlot} slot</Row>}
      {numOfEmptySlot === 0 && <Row>Room is Full</Row>}

      <Row>
        {data.map((player) => (
          <Avatar
            key={player._id}
            src={
              player.avatar === ""
                ? getAvatarTemplate(player.name, 75)
                : player.avatar
            }
          />
        ))}

        {Array(numOfEmptySlot)
          .fill("")
          .map((x, idx) => (
            <div
              key={idx}
              className="m-1 p-0"
              style={{ height: "2rem", width: "2rem" }}
            >
              <PersonCircle size="2rem" className="p-0" />
            </div>
          ))}
      </Row>
    </>
  );
};

export default function RoomCard({ data }: { data: GameRoom }) {
  const [players, setPlayers] = useState<UserStates[]>([]);
  const { usersStates } = useAppSelector(selectChat);
  const dispatch = useAppDispatch();

  const handleClickToJoinRoom = () => {
    dispatch(actionGame.joinPlayForFunRoom(data._id));
  };

  useEffect(() => {
    const findPlayers = _.filter(usersStates, (x) =>
      _.some(data.players, ["_id", x._id])
    );
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
            <Button onClick={handleClickToJoinRoom}>Join</Button>
          </Col>
          <Col xs={{ span: 4, offset: 4 }}>
            <PlayersInfoSection data={players} />
          </Col>
        </Row>
      </Stack>
    </Card>
  );
}
