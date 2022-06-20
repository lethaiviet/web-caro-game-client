import { Stack, Row, Image, Col } from "react-bootstrap";

export interface ErrorScreenProps {
  image: string;
  error: {
    code: number;
    description: string;
    reason: string;
  };
}

export function ErrorScreen(props: ErrorScreenProps) {
  return (
    <Stack className="justify-content-center align-items-center min-vh-100 p-5">
      <Row>
        <Col
          style={{
            marginRight: "50px",
            marginTop: "auto",
            marginBottom: "auto",
          }}
          sm={12}
          md="auto"
        >
          <Image src={props.image} alt="Image 404" />
        </Col>

        <Col sm={12} md="auto">
          <div>
            <h1 className="fw-bold display-1 text-danger mb-4">
              {props.error.code}
            </h1>
            <h4 className="mb-3">{props.error.description}</h4>
            <p className="fw-light mb-4">{props.error.reason}</p>
            <a href="/" className="btn btn-primary">
              Go Home
            </a>
          </div>
        </Col>
      </Row>
    </Stack>
  );
}
