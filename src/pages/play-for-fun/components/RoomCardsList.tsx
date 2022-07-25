import { GameRoom } from "@/interfaces/game-rooms.interface";
import { Container, Row, Col } from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars-2";
import RoomCard from "./RoomCard";

const RoomsCardList = ({ roomsData }: { roomsData: GameRoom[] }) => {
  return (
    <Scrollbars className="border">
      <Container className="my-2">
        <Row className="row-cols-lg-3 row-cols-md-2 row-cols-1 g-2">
          {roomsData.map((room) => (
            <Col key={room._id}>
              <RoomCard data={room} />
            </Col>
          ))}
        </Row>
      </Container>
    </Scrollbars>
  );
};

export default RoomsCardList;
