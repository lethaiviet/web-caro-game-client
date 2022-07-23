import { useAppDispatch, useAppSelector } from "@/app/hook";
import { Player, Symbol } from "@/interfaces/game-rooms.interface";
import { UserStates } from "@/interfaces/users.interface";
import { GAME, ROOM_ID_PARAM } from "@/navigation/const";
import { actionChat, selectChat } from "@/pages/chat/chatSlice";
import { actionGame, selectGame } from "@/pages/game/gameSlice";
import { selectUsers } from "@/pages/user/usersSlice";
import { getCurrentUser } from "@/pages/user/usersThunk";
import { getAvatarTemplate } from "@/utils/utils";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useConnectSocket } from "./useConnectSocket";

export interface PlayerDetail extends Player {
  isMyTurn: boolean;
  name: string;
  avatar: string;
}

const emptyPlayerDetail: PlayerDetail = {
  name: "",
  avatar: "",
  isMyTurn: false,
  _id: "",
  isReady: false,
  symbol: Symbol.UNDEFINED,
};

export const usePlayersStates = (roomId: string): PlayerDetail[] => {
  const isConnected = useConnectSocket();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [player1, setPlayer1] = useState(emptyPlayerDetail);
  const [player2, setPlayer2] = useState(emptyPlayerDetail);
  const { currentPlayForFunRoom } = useAppSelector(selectGame);
  const { usersStates } = useAppSelector(selectChat);
  const { currentUser } = useAppSelector(selectUsers);

  useEffect(() => {
    const isMatchRoom = currentPlayForFunRoom._id === roomId;
    const players = currentPlayForFunRoom.players;
    const numOfPlayer = players.length;
    const MAX_PLAYER = 2;

    const getPlayerDataByIdx = (idx: number): PlayerDetail => {
      idx = Math.min(idx, MAX_PLAYER);
      const player = players[idx];

      const playerState: UserStates | undefined = _.find(usersStates, [
        "_id",
        player._id,
      ]);

      const playerData: PlayerDetail = {
        _id: player._id,
        name: playerState?.name || "",
        avatar: playerState?.avatar || "",
        isReady: player.isReady,
        isMyTurn: player._id === currentPlayForFunRoom.turnOf,
        symbol: player.symbol,
      };

      playerData.avatar =
        playerData.avatar === ""
          ? getAvatarTemplate(playerData.name, 100)
          : playerData.avatar;

      return playerData;
    };

    if (numOfPlayer === 0 || numOfPlayer > MAX_PLAYER || !isMatchRoom) return;

    if (
      roomId &&
      numOfPlayer === MAX_PLAYER &&
      currentPlayForFunRoom.isStarted
    ) {
      navigate(_.replace(GAME, ROOM_ID_PARAM, roomId));
    }

    if (numOfPlayer === 1) {
      setPlayer1(getPlayerDataByIdx(0));
      setPlayer2(emptyPlayerDetail);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayForFunRoom, currentUser]);

  useEffect(() => {
    if (isConnected && roomId) {
      dispatch(actionGame.joinPlayForFunRoom(roomId));
    }

    if (isConnected && currentUser._id === "") {
      dispatch(getCurrentUser("_"));
    }

    if (isConnected && usersStates.length === 0) {
      dispatch(actionChat.requestGetAllUsersState());
    }
  }, [currentUser._id, dispatch, isConnected, roomId, usersStates.length]);

  return [player1, player2];
};
