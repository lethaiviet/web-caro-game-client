import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Stack,
  Image,
} from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars-2";
import RoomCard from "./components/RoomCard";
import { PlusCircle } from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { actionGame, selectGame } from "../game/gameSlice";
import noRoomImage from "@assets/no-rooms.png";
import { useNavigate } from "react-router";
import { LOBBY, ROOM_ID_PARAM } from "@/navigation/const";
import _ from "lodash";
import { useEffect, useState } from "react";
import { selectUsers } from "../user/usersSlice";

const EmptyFromView = () => {
  return (
    <Container className="border h-75 d-flex justify-content-center align-items-center">
      <Stack className="d-flex justify-content-center align-items-center">
        <Image src={noRoomImage} alt={noRoomImage} fluid width={300} />
        <h5>Currently, there are no room here.</h5>
        <div>Please click create new room button.</div>
      </Stack>
    </Container>
  );
};

export default function PlayForFunContainer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { playForFunRooms, currentPlayForFunRoom } = useAppSelector(selectGame);
  const { currentUser } = useAppSelector(selectUsers);
  const [disableCreateRoomBtn, setDisableCreateRoomBtn] = useState(false);

  useEffect(() => {
    if (currentPlayForFunRoom._id !== "") {
      navigate(_.replace(LOBBY, ROOM_ID_PARAM, currentPlayForFunRoom._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayForFunRoom]);

  useEffect(() => {
    if (playForFunRooms.length > 0 || currentUser._id !== "") {
      const findRoomJoinedIdx = playForFunRooms.findIndex((room) =>
        _.find(room.players, { _id: currentUser._id })
      );

      const isJoinedAnyRoom = findRoomJoinedIdx >= 0;
      setDisableCreateRoomBtn(isJoinedAnyRoom);

      if (isJoinedAnyRoom) {
        dispatch(
          actionGame.joinPlayForFunRoom(playForFunRooms[findRoomJoinedIdx]._id)
        );
      }
    }
  }, [playForFunRooms, currentUser]);

  const handleClickToCreateRoom = () => {
    const dispatchCreateRoom = async () => {
      dispatch(actionGame.createPlayForFunRoom());
    };

    dispatchCreateRoom();
  };

  return (
    <Container>
      <Stack className="full-screen-height">
        <Row className="my-3">
          <Col>
            <InputGroup>
              <InputGroup.Text>Search</InputGroup.Text>
              <Form.Control
                placeholder="Room name or Room Id"
                aria-label="room-name"
              />
            </InputGroup>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              className="d-flex align-items-center american-purple-btn"
              onClick={handleClickToCreateRoom}
              disabled={disableCreateRoomBtn}
            >
              <PlusCircle className="me-2" size={20} />
              Create New Room
            </Button>
          </Col>
        </Row>

        {playForFunRooms.length === 0 ? (
          <EmptyFromView />
        ) : (
          <Scrollbars className="border">
            <Container className="my-2">
              <Row className="row-cols-lg-3 row-cols-md-2 row-cols-1 g-2">
                {playForFunRooms.map((x) => (
                  <Col>
                    <RoomCard data={x} />
                  </Col>
                ))}
              </Row>
            </Container>
          </Scrollbars>
        )}
      </Stack>
    </Container>
  );
}
