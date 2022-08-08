import { useAppDispatch, useAppSelector } from "@/app/hook";
import { usePlayersStates } from "@/hooks/usePlayersStates";
import { Position, Symbol } from "@/interfaces/game-rooms.interface";
import { ERROR_400 } from "@/navigation/const";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { Card, Col, Container, Row, ProgressBar } from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars-2";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../loading";
import { selectUsers } from "../user/usersSlice";
import { PopupGame } from "./components/PopupGame";
import { actionGame, selectGame } from "./gameSlice";

const ProgressBarTimer = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentPlayForFunRoom } = useAppSelector(selectGame);
  const [timer, setTimer] = useState(0);

  const getProgressType = () => {
    const lowerBound = currentPlayForFunRoom.timeOut / 3;
    const isSuccess = _.inRange(timer, lowerBound);
    if (isSuccess) return "success";

    const upperBound = lowerBound * 2;
    const isWarning = _.inRange(timer, lowerBound, upperBound);
    if (isWarning) return "warning";

    return "danger";
  };

  useEffect(() => {
    const gameRoom = currentPlayForFunRoom;
    const isFinished = gameRoom.boardGame.winnerPositions.length > 0;
    const isLoading = gameRoom.timeOut === 0;

    if (isFinished || isLoading) return;

    const lastActionTime =
      gameRoom.lastActionTime === 0 ? _.now() : gameRoom.lastActionTime;

    const timeElapsed = Math.max(_.floor((_.now() - lastActionTime) / 1000), 0);
    setTimer((timer) => timeElapsed);
    const interval = setInterval(() => setTimer((timer) => timer + 1), 1000);

    return () => {
      clearInterval(interval);
    };
  }, [currentPlayForFunRoom]);

  useEffect(() => {
    const gameRoom = currentPlayForFunRoom;
    const isFinished = gameRoom.boardGame.winnerPositions.length > 0;
    const isLoading = gameRoom.timeOut === 0;
    const isNotPlayerAFK = _.inRange(timer, gameRoom.timeOut);

    if (isFinished || (!isLoading && isNotPlayerAFK)) return;

    // const isLostConnection = timer >= gameRoom.timeOut + 2;
    // if (isLostConnection) {
    //   navigate(ERROR_400);
    // }

    dispatch(
      actionGame.requestCheckPlayerAFKAndSwitchTurn(currentPlayForFunRoom._id)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  return (
    <ProgressBar
      variant={getProgressType()}
      now={timer}
      max={currentPlayForFunRoom.timeOut}
      label={timer}
    />
  );
};

const GameHeader = () => {
  const { roomId } = useParams();
  const [player1, player2] = usePlayersStates(roomId || "");

  return (
    <Row className="d-flex align-items-center my-2">
      <Col lg={3} md={2} sm={2} xs={2}>
        <Card
          className={player1.isMyTurn ? "selected-card" : "unSelected-card"}
        >
          <Row className="d-flex justify-content-start align-items-center">
            <Col className="d-none d-lg-block">
              <h5 className="text-center">
                {_.truncate(player1.name, { length: 14 })}
              </h5>
            </Col>
            <Col lg={3} className="d-flex justify-content-center">
              <Avatar
                src={player1.avatar}
                name={player1.name}
                size="3rem"
                color="gray"
                round
              />
            </Col>
          </Row>
        </Card>
      </Col>

      <Col>
        <ProgressBarTimer />
      </Col>

      <Col lg={3} md={2} sm={2} xs={2}>
        <Card
          className={player2.isMyTurn ? "selected-card" : "unSelected-card"}
        >
          <Row className="d-flex justify-content-start align-items-center">
            <Col lg={3} className="d-flex justify-content-center">
              <Avatar
                src={player2.avatar}
                name={player2.name}
                size="3rem"
                color="gray"
                round
              />
            </Col>
            <Col className="d-none d-lg-block">
              <h5 className="text-center">
                {_.truncate(player2.name, { length: 14 })}
              </h5>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default function GameContainer() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentPlayForFunRoom } = useAppSelector(selectGame);
  const { currentUser } = useAppSelector(selectUsers);
  const [loading, setLoading] = useState(true);
  const [completedGame, setCompletedGame] = useState(false);
  const [boardGameData, setBoardGameData] = useState<string[][]>([]);

  const handleClickToPlayGame = (e: React.MouseEvent<HTMLDivElement>) => {
    const isTurnOfCurrentPlayer =
      currentPlayForFunRoom.turnOf === currentUser._id;

    if (completedGame || !isTurnOfCurrentPlayer) return;

    const c = _.toNumber(e.currentTarget.getAttribute("data-col"));
    const r = _.toNumber(e.currentTarget.getAttribute("data-row"));
    const pos: Position = { r, c };
    const roomId = currentPlayForFunRoom._id;
    dispatch(actionGame.playGame({ roomId, pos }));
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading) {
      timer = setTimeout(() => {
        navigate(ERROR_400);
      }, 2000);
    }
    return () => timer && clearTimeout(timer);
  });

  useEffect(() => {
    const gameRoom = currentPlayForFunRoom;

    const notFoundRoom = gameRoom._id === "";
    setLoading(notFoundRoom);

    const data = gameRoom.boardGame.data;
    setBoardGameData(data);

    const isFinish = gameRoom.boardGame.winnerPositions.length > 0;
    setCompletedGame(isFinish);
  }, [currentPlayForFunRoom]);

  return (
    <Container className="vh-100">
      <GameHeader />

      <div className="scroll-bar-board-game">
        <Scrollbars
          autoHide={true}
          renderThumbVertical={(props) => (
            <div {...props} className="thumb-vertical" />
          )}
          renderTrackVertical={(props) => (
            <div {...props} className="track-vertical" />
          )}
          renderThumbHorizontal={(props) => (
            <div {...props} className="thumb-horizontal" />
          )}
          renderTrackHorizontal={(props) => (
            <div {...props} className="track-horizontal" />
          )}
        >
          <div className="board-game-10x20">
            {boardGameData.map((rowData, r) =>
              rowData.map((cell, c) => {
                const winnerPositions =
                  currentPlayForFunRoom.boardGame.winnerPositions;

                let cellClazz = "cell";
                if (completedGame) {
                  const findPos = _.find(winnerPositions, { r, c });
                  cellClazz = findPos ? "cell animation-highlight" : cellClazz;
                }

                switch (cell) {
                  case Symbol.O:
                    return (
                      <div className={cellClazz}>
                        <div className="O-symbol center" />
                      </div>
                    );

                  case Symbol.X:
                    return (
                      <div className={cellClazz}>
                        <div className="X-symbol center" />
                        <div className="X-symbol center" />
                      </div>
                    );

                  default:
                    return (
                      <div
                        className="cell"
                        data-row={r}
                        data-col={c}
                        onClick={handleClickToPlayGame}
                      />
                    );
                }
              })
            )}
          </div>
        </Scrollbars>
      </div>

      {completedGame && <PopupGame />}
      {loading && <Loading />}
    </Container>
  );
}
