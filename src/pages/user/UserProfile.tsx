import {
  Card,
  Col,
  Container,
  Image,
  Stack,
  ProgressBar,
  Row,
  Button,
} from "react-bootstrap";
import userImag from "@/assets/icon-game.png";

export const UserProfile = () => {
  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Stack className="align-items-center">
                <Image
                  src={userImag}
                  alt="user-avatar"
                  fluid
                  roundedCircle
                  width="250"
                ></Image>
                <h4>User Name</h4>
              </Stack>
              <ProgressBar
                variant="success"
                now={0}
                min={10}
                label={`0%`}
                key={1}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Body>
              <Col>
                <Row className="border-bottom mb-3 pb-2">
                  <Col ms={3}>
                    <h6>Email</h6>
                  </Col>
                  <Col ms={9}>
                    <div className="text-secondary">yellowCat.@gmail.com</div>
                  </Col>
                </Row>

                <Row className="border-bottom mb-3 pb-2">
                  <Col ms={3}>
                    <h6>Name</h6>
                  </Col>
                  <Col ms={9}>
                    <div className="text-secondary">yellowCat</div>
                  </Col>
                </Row>

                <Row className="border-bottom mb-3 pb-2">
                  <Col ms={3}>
                    <h6>Bio</h6>
                  </Col>
                  <Col ms={9}>
                    <div className="text-secondary">
                      I'm a big cat with yellow color
                    </div>
                  </Col>
                </Row>
              </Col>
              <Button>Edit</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
