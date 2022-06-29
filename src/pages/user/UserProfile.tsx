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
import { useState, SyntheticEvent } from "react";
interface DetailProfileCardProps {
  onClick: () => void;
}

const DetailProfileCard = ({ onClick }: DetailProfileCardProps) => {
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
        <Button onClick={onClick}>Edit</Button>
      </Card.Body>
    </Card>
  );
};

interface EditableDetailProfileCardProps {
  setShow: (value: React.SetStateAction<CardType>) => void;
}

const EditableDetailProfileCard = ({
  setShow,
}: EditableDetailProfileCardProps) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setShow("Card");
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </Col>
            </Row>
          </Col>
          <Button type="submit">Save</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

type CardType = "EditableCard" | "Card";

export const UserProfile = () => {
  const [show, setShow] = useState<CardType>("Card");

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
          {show === "Card" ? (
            <DetailProfileCard onClick={() => setShow("EditableCard")} />
          ) : (
            <EditableDetailProfileCard setShow={setShow} />
          )}
        </Col>
      </Row>
    </Container>
  );
};
