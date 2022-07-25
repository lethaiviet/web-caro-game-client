import { useAppDispatch, useAppSelector } from "@/app/hook";
import { PlayerDetail, usePlayersStates } from "@/hooks/usePlayersStates";
import { PLAY_FOR_FUN, ROOT } from "@/navigation/const";
import _ from "lodash";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { actionGame, selectGame } from "../game/gameSlice";
import { selectUsers } from "../user/usersSlice";
import Avatar from "./components/Avatar";

const Player1Card = ({ data }: { data: PlayerDetail }) => {
  return (
    <Card border="dark" className="lobby-card">
      <Row>
        {data._id === "" ? (
          <Col className="d-flex align-items-center">
            <Row>
              <h1 className="text-center">Slot Empty</h1>
            </Row>
          </Col>
        ) : (
          <>
            <Col lg={8} className="d-flex align-items-center">
              <Stack>
                <Row>
                  <h1 className="text-center">{data.name}</h1>
                </Row>
                <Row>
                  <p className="text-center fs-5">
                    {data.isReady ? "Ready" : "UnReady"}
                  </p>
                </Row>
              </Stack>
            </Col>
            <Col className="d-none d-lg-block">
              <Avatar src={data.avatar} />
            </Col>
          </>
        )}
      </Row>
    </Card>
  );
};

const Player2Card = ({ data }: { data: PlayerDetail }) => {
  return (
    <Card border="dark" className="lobby-card">
      <Row>
        {data._id === "" ? (
          <Col className="d-flex align-items-center">
            <Row>
              <h1 className="text-center">Slot Empty</h1>
            </Row>
          </Col>
        ) : (
          <>
            <Col lg={4} className="d-none d-lg-block">
              <Avatar src={data.avatar} />
            </Col>
            <Col className="d-flex align-items-center">
              <Stack>
                <Row>
                  <h1 className="text-center">{data.name}</h1>
                </Row>
                <Row>
                  <p className="text-center fs-5">
                    {data.isReady ? "Ready" : "UnReady"}
                  </p>
                </Row>
              </Stack>
            </Col>
          </>
        )}
      </Row>
    </Card>
  );
};

export default function LobbyContainer() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(selectUsers);
  const { currentPlayForFunRoom } = useAppSelector(selectGame);
  const [player1, player2] = usePlayersStates(_.defaultTo(roomId, ""));

  const handleClickToAcceptRunningGame = () => {
    dispatch(
      actionGame.acceptRunningGame({
        roomId: currentPlayForFunRoom._id,
        isReady: !player1.isReady,
      })
    );
  };

  const handleClickToLeaveGameRoom = () => {
    dispatch(
      actionGame.requestLeaveCurrentRoom({
        roomId: _.defaultTo(roomId, ""),
        currentUserId: currentUser._id,
      })
    );
    navigate(PLAY_FOR_FUN);
  };

  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col md={5}>
          <Player1Card data={player1} />
        </Col>

        <Col md={2}>
          <h1 className="text-center">VS</h1>
        </Col>

        <Col md={5}>
          <Player2Card data={player2} />
        </Col>
      </Row>

      <Row>
        {currentPlayForFunRoom.isStarted || (
          <Col className="d-flex justify-content-center mt-3">
            {player1._id === currentUser._id && (
              <Button
                className="american-purple-btn"
                onClick={handleClickToAcceptRunningGame}
              >
                {player1.isReady ? "Unready" : "Ready"}
              </Button>
            )}

            {(currentUser._id === player1._id && player1.isReady) || (
              <Button
                className="ms-2 american-purple-btn"
                onClick={handleClickToLeaveGameRoom}
              >
                Leave
              </Button>
            )}
          </Col>
        )}
      </Row>
    </Container>
  );
}
