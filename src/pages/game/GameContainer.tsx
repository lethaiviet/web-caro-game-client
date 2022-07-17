import { getAvatarTemplate } from "@/utils/utils";
import { useState } from "react";
import { Card, Col, Container, Row, ProgressBar } from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars-2";
import Avatar from "./components/Avatar";
import variables from "./variables.module.scss";

const initEmptyBoardGameData = () => {
  const numRows = parseInt(variables["num-of-rows-grid"]);
  const numCols = parseInt(variables["num-of-cols-grid"]);
  let gridData = [];
  for (let r = 0; r < numRows; r++) {
    gridData[r] = Array(numCols).fill("");
  }
  return gridData;
};

export default function GameContainer() {
  const [boardGameData, setBoardGameData] = useState(initEmptyBoardGameData());

  return (
    <Container className="vh-100">
      <Row className="d-flex align-items-center my-2">
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
          autoHide={true}
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
          <div className="board-game-10x20">
            {boardGameData.map((rowData) =>
              rowData.map((cell) => {
                if (cell === "o") {
                  return (
                    <div className="cell">
                      <div className="O-symbol center" />
                    </div>
                  );
                }

                if (cell === "x") {
                  return (
                    <div className="cell">
                      <div className="X-symbol center" />
                      <div className="X-symbol center" />
                    </div>
                  );
                }

                return <div className="cell" />;
              })
            )}
          </div>
        </Scrollbars>
      </div>
    </Container>
  );
}
