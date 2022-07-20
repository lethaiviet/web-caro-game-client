import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Stack,
} from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars-2";
import RoomCard from "./components/RoomCard";
import { PlusCircle } from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { actionGame, selectGame } from "../game/gameSlice";

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
              className="d-flex align-items-center"
              onClick={handleClickToCreateRoom}
            >
              <PlusCircle className="me-2" />
              Create New Room
            </Button>
          </Col>
        </Row>

        {playForFunRooms.length === 0 ? (
          <div>
            Currently, there are no room here. Please click create new room
            button.
          </div>
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
