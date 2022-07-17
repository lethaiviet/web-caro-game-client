import { getAvatarTemplate } from "@/utils/utils";
import { Button, Card, Stack, Row, Col } from "react-bootstrap";
import Avatar from "./Avatar";

export default function RoomCard() {
  return (
    <Card border="dark" style={{ borderRadius: "20px" }} className="font-round">
      <Stack className="P-25">
        <span className="fs-4" style={{ lineHeight: "0.4" }}>
          Name Room
        </span>
        <span className="fs-6" style={{ marginBottom: "32px" }}>
          #012345678abv
        </span>
        <Row>
          <Col className="d-flex align-items-end">
            <Button>Join</Button>
          </Col>
          <Col xs={{ span: 4, offset: 4 }}>
            <Row>Left 2 slot</Row>
            <Row>
              <Avatar src={getAvatarTemplate("A", 75)} />
              <Avatar src={getAvatarTemplate("B", 75)} />
            </Row>
          </Col>
        </Row>
      </Stack>
    </Card>
  );
}
