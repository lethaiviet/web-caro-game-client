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
import { PlusCircle } from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { actionGame, selectGame } from "../game/gameSlice";
import noRoomImage from "@assets/no-rooms.png";
import { useNavigate } from "react-router";
import { LOBBY, ROOM_ID_PARAM } from "@/navigation/const";
import _ from "lodash";
import { SyntheticEvent, useEffect, useState } from "react";
import { selectUsers } from "../user/usersSlice";
import RoomsCardList from "./components/RoomCardsList";

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
  const [filteredRoomsData, setFilteredRoomsData] = useState(playForFunRooms);
  const [wordSearch, setWordSearch] = useState("");

  useEffect(() => {
    const hasNoRoom = playForFunRooms.length === 0;
    if (hasNoRoom) return;

    const word = _.trim(wordSearch);
    const isEmptyWordSearch = word === "";

    let roomsData = playForFunRooms;

    if (!isEmptyWordSearch) {
      roomsData = playForFunRooms.filter(
        (room) => room._id.includes(word) || room.name.includes(word)
      );
    }

    setFilteredRoomsData(roomsData);
  }, [wordSearch, playForFunRooms]);

  useEffect(() => {
    const notFoundRoom = currentPlayForFunRoom._id === "";
    if (notFoundRoom) return;

    const lobyUrl = _.replace(LOBBY, ROOM_ID_PARAM, currentPlayForFunRoom._id);
    navigate(lobyUrl);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayForFunRoom]);

  useEffect(() => {
    const notFoundUser = currentUser._id === "";
    const hasNoRoom = playForFunRooms.length === 0;

    if (notFoundUser || hasNoRoom) return;

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playForFunRooms, currentUser]);

  const handleClickToCreateRoom = () => {
    dispatch(actionGame.createPlayForFunRoom());
  };

  const handleChangeWordSearch = (e: SyntheticEvent) => {
    const target = e.target as HTMLFormElement;
    setWordSearch(target.value);
  };

  return (
    <Container>
      <Stack className="full-screen-height">
        <Row className="my-3">
          <Col>
            <InputGroup>
              <InputGroup.Text>Search</InputGroup.Text>
              <Form.Control
                name="wordSearch"
                placeholder="Room name or Room Id"
                aria-label="room-name"
                value={wordSearch}
                onChange={handleChangeWordSearch}
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

        {playForFunRooms.length === 0 && <EmptyFromView />}
        {playForFunRooms.length > 0 && (
          <RoomsCardList roomsData={filteredRoomsData} />
        )}
      </Stack>
    </Container>
  );
}
