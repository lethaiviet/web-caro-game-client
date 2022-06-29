import {
  Card,
  Col,
  Container,
  Image,
  Stack,
  ProgressBar,
  Row,
  Button,
  Form,
} from "react-bootstrap";
import userImag from "@/assets/icon-game.png";

const DetailProfileCard = () => {
  return (
    <Card>
      <Card.Body>
        <Col>
          <Row className="border-bottom mb-3 pb-2">
            <Col md={3}>
              <h6>Email</h6>
            </Col>
            <Col md={9}>
              <div className="text-secondary">yellowCat.@gmail.com</div>
            </Col>
          </Row>

          <Row className="border-bottom mb-3 pb-2">
            <Col md={3}>
              <h6>Name</h6>
            </Col>
            <Col md={9}>
              <div className="text-secondary">yellowCat</div>
            </Col>
          </Row>

          <Row className="border-bottom mb-3 pb-2">
            <Col md={3}>
              <h6>Bio</h6>
            </Col>
            <Col md={9}>
              <div className="text-secondary">
                I'm a big cat with yellow color
              </div>
            </Col>
          </Row>
        </Col>
        <Button>Edit</Button>
      </Card.Body>
    </Card>
  );
};

const EditableDetailProfileCard = () => {
  return (
    <Card>
      <Card.Body>
        <Form>
          <Col>
            <Row className="border-bottom mb-3 pb-2">
              <Col md={3}>
                <h6>Email</h6>
              </Col>
              <Col md={9}>
                <Form.Control
                  type="text"
                  required
                  value="yellowCat.@gmail.com"
                  disabled
                />
              </Col>
            </Row>

            <Row className="border-bottom mb-3 pb-2">
              <Col md={3}>
                <h6>Name</h6>
              </Col>
              <Col md={9}>
                <Form.Control
                  name="name"
                  type="text"
                  required
                  value="yellowCat"
                />
              </Col>
            </Row>

            <Row className="border-bottom mb-3 pb-2">
              <Col md={3}>
                <h6>Bio</h6>
              </Col>
              <Col md={9}>
                <Form.Control
                  name="bio"
                  as="textarea"
                  rows={3}
                  maxLength={200}
                  style={{ maxHeight: "200px" }}
                  //   value="I'm a big cat with yellow color"
                />
              </Col>
            </Row>
          </Col>
        </Form>
        <Button>Save</Button>
      </Card.Body>
    </Card>
  );
};

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
          <DetailProfileCard />
        </Col>
      </Row>
    </Container>
  );
};
