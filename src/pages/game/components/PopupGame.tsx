import { useAppDispatch, useAppSelector } from "@/app/hook";
import { usePlayersStates } from "@/hooks/usePlayersStates";
import { ROOT } from "@/navigation/const";
import { selectUsers } from "@/pages/user/usersSlice";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { actionGame } from "../gameSlice";

export const PopupGame = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { roomId } = useParams();
  const { currentUser } = useAppSelector(selectUsers);
  const [player1, player2] = usePlayersStates(_.defaultTo(roomId, ""));
  const [show, setShow] = useState(false);
  const [popupInfo, setPopupInfo] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const isPlayer = player1._id === currentUser._id;
    let info = "GAME DRAW";

    if (isPlayer) {
      info = player1.isWinner ? "YOU WIN" : "YOU LOSE";
    } else {
      if (player1.isWinner) {
        info = `${_.toUpper(player1.name)} WON`;
      }

      if (player2.isWinner) {
        info = `${_.toUpper(player2.name)} WON`;
      }
    }

    setPopupInfo(info);
  }, [currentUser._id, player1, player2]);

  const handleClickToGoHome = () => {
    dispatch(
      actionGame.requestLeaveCurrentRoom({
        roomId: _.defaultTo(roomId, ""),
        currentUserId: currentUser._id,
      })
    );
    navigate(ROOT);
  };

  return (
    <>
      {show && (
        <div className="pop-game-container">
          <div className="pop-game-info">
            <h1>{popupInfo}</h1>
            <Button onClick={handleClickToGoHome}>GO HOME</Button>
          </div>
        </div>
      )}
    </>
  );
};
