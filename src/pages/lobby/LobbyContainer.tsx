import { useAppDispatch, useAppSelector } from "@/app/hook";
import { PlayerDetail, usePlayersStates } from "@/hooks/usePlayersStates";
import { ERROR_400, PLAY_FOR_FUN } from "@/navigation/const";
import _ from "lodash";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { actionGame, selectGame } from "../game/gameSlice";
import Loading from "../loading";
import { selectUsers } from "../user/usersSlice";

const EmptySlotCard = () => {
  return (
    <Col className="d-flex align-items-center">
      <Row>
        <h1 className="text-center">Empty Slot</h1>
      </Row>
    </Col>
  );
};

const Player1Card = ({ data }: { data: PlayerDetail }) => {
  return (
    <Card border="dark" className="lobby-card">
      <Row>
        {data._id === "" ? (
          <EmptySlotCard />
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
            <Col lg={4} className="d-none d-lg-block">
              <Avatar
                src={data.avatar}
                name={data.name}
                round
                size="7rem"
                color="gray"
              />
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
          <EmptySlotCard />
        ) : (
          <>
            <Col lg={4} className="d-none d-lg-block">
              <Avatar
                src={data.avatar}
                name={data.name}
                round
                size="7rem"
                color="gray"
              />
            </Col>
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const notFoundPlayer1 = player1._id === "";
    setLoading(notFoundPlayer1);
  }, [player1]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading) {
      timer = setTimeout(() => {
        navigate(ERROR_400);
      }, 2000);
    }
    return () => timer && clearTimeout(timer);
  });

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

            {(player1._id === currentUser._id && player1.isReady) || (
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

      {loading && <Loading />}
    </Container>
  );
}
