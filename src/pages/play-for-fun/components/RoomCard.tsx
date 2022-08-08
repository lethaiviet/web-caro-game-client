import { useAppDispatch } from "@/app/hook";
import { GameRoom } from "@/interfaces/game-rooms.interface";
import { UserStates } from "@/interfaces/users.interface";
import { useEffect, useState } from "react";
import { Button, Card, Stack, Row, Col } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import _ from "lodash";
import { actionGame } from "@/pages/game/gameSlice";
import { useUsersStates } from "@/hooks/useUsersStates";
import Avatar from "react-avatar";

const PlayersInfoSection = ({ data }: { data: UserStates[] }) => {
  const numOfPlayer = data.length;
  const numOfEmptySlot = 2 - numOfPlayer;

  return (
    <>
      {numOfEmptySlot > 0 && <Row>Left {numOfEmptySlot} slot</Row>}
      {numOfEmptySlot === 0 && <Row>Room is Full</Row>}

      <Row>
        {data.map((player) => (
          <div className="m-1 p-0" style={{ width: "2rem" }}>
            <Avatar
              key={player._id}
              name={player.name}
              src={player.avatar}
              size="2rem"
              round
              color="gray"
            />
          </div>
        ))}

        {_.fill(Array(numOfEmptySlot), "").map((x, idx) => (
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
  const usersStates = useUsersStates();
  const dispatch = useAppDispatch();

  const handleClickToJoinRoom = () => {
    dispatch(actionGame.joinPlayForFunRoom(data._id));
  };

  useEffect(() => {
    const findPlayers = _.filter(usersStates, (x) =>
      _.some(data.players, ["_id", x._id])
    );
    setPlayers(findPlayers);
  }, [data, usersStates]);

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
            <Button
              className="american-purple-btn"
              onClick={handleClickToJoinRoom}
            >
              {players.length < 2 ? "Join" : "Spectate"}
            </Button>
          </Col>
          <Col xs={{ span: 4, offset: 3 }}>
            <PlayersInfoSection data={players} />
          </Col>
        </Row>
      </Stack>
    </Card>
  );
}
