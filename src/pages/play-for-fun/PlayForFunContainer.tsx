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
  const { playForFunRooms } = useAppSelector(selectGame);

  const handleClickToCreateRoom = () => {
    dispatch(actionGame.createPlayForFunRoom());
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
