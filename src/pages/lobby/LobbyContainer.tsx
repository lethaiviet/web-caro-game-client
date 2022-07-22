import { useAppDispatch, useAppSelector } from "@/app/hook";
import { UserStates } from "@/interfaces/users.interface";
import { getAvatarTemplate } from "@/utils/utils";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import { useParams } from "react-router";
import { selectChat } from "../chat/chatSlice";
import { actionGame, selectGame } from "../game/gameSlice";
import { selectUsers } from "../user/usersSlice";
import Avatar from "./components/Avatar";

interface PlayerData {
  _id: string;
  name: string;
  avatar: string;
  isReady: boolean;
}

const emptyPlayerData: PlayerData = {
  _id: "",
  name: "",
  avatar: "",
  isReady: false,
};

const Player1Card = ({ data }: { data: PlayerData }) => {
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

const Player2Card = ({ data }: { data: PlayerData }) => {
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
  const { currentUser } = useAppSelector(selectUsers);
  const { usersStates } = useAppSelector(selectChat);
  const { currentPlayForFunRoom, isConnected } = useAppSelector(selectGame);
  const [player1, setPlayer1] = useState(emptyPlayerData);
  const [player2, setPlayer2] = useState(emptyPlayerData);
  const dispatch = useAppDispatch();
  const { roomId } = useParams();

  useEffect(() => {
    console.log(currentPlayForFunRoom);
    const players = currentPlayForFunRoom.players;
    const numOfPlayer = players.length;

    const getPlayerDataByIdx = (idx: number): PlayerData => {
      const MAX_PLAYER = 2;
      idx = Math.min(idx, MAX_PLAYER);
      const player = players[idx];

      const playerState: UserStates | undefined = _.find(usersStates, [
        "_id",
        player._id,
      ]);

      const playerData: PlayerData = {
        _id: player._id,
        name: playerState?.name || "",
        avatar: playerState?.avatar || "",
        isReady: player.isReady,
      };

      playerData.avatar =
        playerData.avatar === ""
          ? getAvatarTemplate(playerData.name, 100)
          : playerData.avatar;

      return playerData;
    };

    if (numOfPlayer == 0 || numOfPlayer > 2) return;

    if (numOfPlayer == 1) {
      setPlayer1(getPlayerDataByIdx(0));
      setPlayer2(emptyPlayerData);
      return;
    }

    const currentPlayerIdx = _.findIndex(players, ["_id", currentUser._id]);
    const hasCurrentUserIdInPlayers = currentPlayerIdx >= 0;

    if (hasCurrentUserIdInPlayers) {
      setPlayer1(getPlayerDataByIdx(currentPlayerIdx));
      setPlayer2(getPlayerDataByIdx(1 ^ currentPlayerIdx));
    } else {
      setPlayer1(getPlayerDataByIdx(0));
      setPlayer2(getPlayerDataByIdx(1));
    }
  }, [currentPlayForFunRoom]);

  useEffect(() => {
    if (isConnected && roomId !== undefined) {
      dispatch(actionGame.joinPlayForFunRoom(roomId));
    }
  }, [isConnected]);

  const handleClickToAcceptRunningGame = () => {
    dispatch(
      actionGame.acceptRunningGame({
        roomId: currentPlayForFunRoom._id,
        isReady: !player1.isReady,
      })
    );
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
            <Button className="ms-2 american-purple-btn">Leave</Button>
          </Col>
        )}
      </Row>
    </Container>
  );
}
