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

export default function PlayForFunContainer() {
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
            <Button className="d-flex align-items-center">
              <PlusCircle className="me-2" />
              Create New Room
            </Button>
          </Col>
        </Row>

        <Scrollbars className="border">
          <Container className="my-2">
            <Row className="row-cols-lg-3 row-cols-md-2 row-cols-1 g-2">
              <Col>
                <RoomCard />
              </Col>
              <Col>
                <RoomCard />
              </Col>
              <Col>
                <RoomCard />
              </Col>

              <Col>
                <RoomCard />
              </Col>
              <Col>
                <RoomCard />
              </Col>
              <Col>
                <RoomCard />
              </Col>

              <Col>
                <RoomCard />
              </Col>
              <Col>
                <RoomCard />
              </Col>
              <Col>
                <RoomCard />
              </Col>
            </Row>
          </Container>
        </Scrollbars>
      </Stack>
    </Container>
  );
}
