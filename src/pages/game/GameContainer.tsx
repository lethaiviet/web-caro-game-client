import { useAppDispatch, useAppSelector } from "@/app/hook";
import { usePlayersStates } from "@/hooks/usePlayersStates";
import { Position, Symbol } from "@/interfaces/game-rooms.interface";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, ProgressBar } from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars-2";
import { useParams } from "react-router-dom";
import Avatar from "./components/Avatar";
import { actionGame, selectGame } from "./gameSlice";

const ProgressBarTimer = () => {
  const { currentPlayForFunRoom } = useAppSelector(selectGame);
  const [timer, setTimer] = useState(0);
  const dispatch = useAppDispatch();

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

    if (gameRoom.timeOut === 0) return;
    const lastActionTime =
      gameRoom.lastActionTime === 0 ? _.now() : gameRoom.lastActionTime;

    const timeElapsed = _.floor((_.now() - lastActionTime) / 1000);

    setTimer((timer) => timeElapsed);
    const interval = setInterval(() => setTimer((timer) => timer + 1), 1000);

    return () => {
      clearInterval(interval);
    };
  }, [currentPlayForFunRoom]);

  useEffect(() => {
    const gameRoom = currentPlayForFunRoom;
    if (gameRoom.timeOut !== 0 && timer <= gameRoom.timeOut) return;

    dispatch(
      actionGame.requestCheckPlayerAFKAndSwitchTurn(currentPlayForFunRoom._id)
    );
  });

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
              <Avatar src={player1.avatar} />
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
              <Avatar src={player2.avatar} />
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
  const [boardGameData, setBoardGameData] = useState<string[][]>([]);
  const { currentPlayForFunRoom } = useAppSelector(selectGame);
  const dispatch = useAppDispatch();

  const handleClickToPlayGame = (e: React.MouseEvent<HTMLDivElement>) => {
    const c = _.toNumber(e.currentTarget.getAttribute("data-col"));
    const r = _.toNumber(e.currentTarget.getAttribute("data-row"));
    const pos: Position = { r, c };
    const roomId = currentPlayForFunRoom._id;
    dispatch(actionGame.playGame({ roomId, pos }));
  };

  useEffect(() => {
    const data = currentPlayForFunRoom.boardGame.data;
    setBoardGameData(data);
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
                if (cell === Symbol.O) {
                  return (
                    <div className="cell">
                      <div className="O-symbol center" />
                    </div>
                  );
                }

                if (cell === Symbol.X) {
                  return (
                    <div className="cell">
                      <div className="X-symbol center" />
                      <div className="X-symbol center" />
                    </div>
                  );
                }

                return (
                  <div
                    className="cell"
                    data-row={r}
                    data-col={c}
                    onClick={handleClickToPlayGame}
                  />
                );
              })
            )}
          </div>
        </Scrollbars>
      </div>
    </Container>
  );
}
