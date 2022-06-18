import { Button, Col, Container, Row } from "react-bootstrap";

export default function LoginScreen() {
  return (
    <div className="container-fluid">
      <Col className="d-flex flex-column align-items-center justify-content-center min-vw-100 min-vh-100">
        <Row>
          <div style={{ height: "200px" }}>
            <img
              src="https://via.placeholder.com/200"
              alt="..."
              className="img-fluid align-self-center"
            />
          </div>
        </Row>
        <Row>
          <h1>Caro Game</h1>
        </Row>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Button className="btn-lg">Login</Button>
          <Button className="btn-secondary btn-lg">Register</Button>
        </div>
      </Col>
    </div>
  );
}
