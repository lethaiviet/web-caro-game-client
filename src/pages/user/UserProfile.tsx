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
import { useState, SyntheticEvent } from "react";
import { useAppSelector } from "@/app/hook";
import { selectUsers } from "./usersSlice";
import { getAvatarTemplate } from "@/utils/utils";
import { CameraFill } from "react-bootstrap-icons";

interface DetailProfileCardProps {
  onClick: () => void;
}

const DetailProfileCard = ({ onClick }: DetailProfileCardProps) => {
  const { currentUser } = useAppSelector(selectUsers);

  return (
    <Card>
      <Card.Body>
        <Col>
          <Row className="border-bottom mb-3 pb-2">
            <Col md={3}>
              <h6>Email</h6>
            </Col>
            <Col md={9}>
              <div className="text-secondary">{currentUser.email}</div>
            </Col>
          </Row>

          <Row className="border-bottom mb-3 pb-2">
            <Col md={3}>
              <h6>Name</h6>
            </Col>
            <Col md={9}>
              <div className="text-secondary">{currentUser.name}</div>
            </Col>
          </Row>

          <Row className="border-bottom mb-3 pb-2">
            <Col md={3}>
              <h6>Bio</h6>
            </Col>
            <Col md={9}>
              <div className="text-secondary">{currentUser.bio}</div>
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
  const { currentUser } = useAppSelector(selectUsers);

  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);

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
                  value={currentUser.email}
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
interface Photo {
  url: string;
  file: File | null;
}

export const UserProfile = () => {
  const { currentUser } = useAppSelector(selectUsers);
  const [avatar, setAvatar] = useState<Photo>({
    url: currentUser.avatar,
    file: null,
  });
  const [show, setShow] = useState<CardType>("Card");

  const handleFileChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file = target.files && target.files[0];
    const url = file ? URL.createObjectURL(file) : "";
    setAvatar({ url, file });
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Stack className="align-items-center">
                <Image
                  src={
                    currentUser.avatar === ""
                      ? getAvatarTemplate(currentUser.name, 250)
                      : avatar.url
                  }
                  alt="user-avatar"
                  fluid
                  roundedCircle
                  width="250"
                ></Image>
                <div className="mt-3">
                  <label>
                    <CameraFill size={20} />
                    <input
                      id="upload-avatar"
                      type="file"
                      style={{ width: "10px" }}
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleFileChange}
                    />
                  </label>
                  {avatar.file && <Button>Save</Button>}
                </div>

                <h4>User Name</h4>
                <h5>Level: {Math.floor(currentUser.exp / 100)}</h5>
              </Stack>

              <ProgressBar
                variant="success"
                now={currentUser.exp % 100}
                min={10}
                label={`${currentUser.exp % 100}%`}
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
