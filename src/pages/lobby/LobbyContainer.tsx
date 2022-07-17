import { getAvatarTemplate } from "@/utils/utils";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import Avatar from "./components/Avatar";

export default function LobbyContainer() {
  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col md={5}>
          <Card border="dark" className="lobby-card">
            <Row>
              <Col lg={8} className="d-flex align-items-center">
                <Stack>
                  <Row>
                    <h1 className="text-center">Player 1</h1>
                  </Row>
                  <Row>
                    <p className="text-center fs-5">Ready</p>
                  </Row>
                </Stack>
              </Col>
              <Col className="d-none d-lg-block">
                <Avatar src={getAvatarTemplate("A", 100)} />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col md={2}>
          <h1 className="text-center">VS</h1>
        </Col>

        <Col md={5}>
          <Card border="dark" className="lobby-card">
            <Row>
              <Col lg={4} className="d-none d-lg-block">
                <Avatar src={getAvatarTemplate("A", 75)} />
              </Col>
              <Col className="d-flex align-items-center">
                <Stack>
                  <Row>
                    <h1 className="text-center">Player 2</h1>
                  </Row>
                  <Row>
                    <p className="text-center fs-5">Unready</p>
                  </Row>
                </Stack>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-center mt-3">
          <Button>Ready</Button>
        </Col>
      </Row>
    </Container>
  );
}
