import { getAvatarTemplate } from "@/utils/utils";
import { Card, Col, Container, Row, ProgressBar } from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars-2";
import Avatar from "./components/Avatar";

const data = Array.from({ length: 10 * 20 }, (i) => i);
export default function GameContainer() {
  return (
    <Container>
      <Row className="d-flex align-items-center mb-3">
        <Col lg={3} md={2} sm={2} xs={2}>
          <Card border="dark" className="p-2" style={{ borderRadius: "10px" }}>
            <Row className="d-flex justify-content-start align-items-center">
              <Col className="d-none d-lg-block">
                <h5 className="text-center">
                  {"lethaiviet92123456789".slice(0, 10) + "..."}
                </h5>
              </Col>
              <Col lg={3} className="d-flex justify-content-center">
                <Avatar src={getAvatarTemplate("A", 100)} />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col>
          <ProgressBar
            variant="success"
            now={30}
            min={10}
            label={`30s`}
            key={1}
          />
        </Col>

        <Col lg={3} md={2} sm={2} xs={2}>
          <Card border="dark" className="p-2" style={{ borderRadius: "10px" }}>
            <Row className="d-flex justify-content-start align-items-center">
              <Col lg={3} className="d-flex justify-content-center">
                <Avatar src={getAvatarTemplate("A", 100)} />
              </Col>
              <Col className="d-none d-lg-block">
                <h5 className="text-center">
                  {"lethaiviet92123456789".slice(0, 10) + "..."}
                </h5>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <div className="scroll-bar-board-game">
        <Scrollbars
          renderThumbVertical={(props) => (
            <div {...props} className="thumb-vertical" />
          )}
          renderTrackVertical={(props) => (
            <div {...props} className="track-vertical" />
          )}
          renderThumbHorizontal={(props) => (
            <div {...props} className="thumb-horizontal" />
          )}
          renderTrackHorizontal={(props) => (
            <div {...props} className="track-horizontal" />
          )}
        >
          <div className="board-game">
            {data.map((x) => (
              <div className="cell">x</div>
            ))}
          </div>
        </Scrollbars>
      </div>
    </Container>
  );
}
