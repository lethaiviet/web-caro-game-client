import { useState } from "react";
import { Button, Stack, Image, Container, Row } from "react-bootstrap";
import { ModalLoginForm, ModalRegisterForm } from "./components/ModalForm";

type ModalType = "" | "login" | "register";

export default function LoginContainer() {
  const [show, setShow] = useState<ModalType>("");
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) =>
    setShow(e.currentTarget.value as ModalType);

  const handleClose = () => setShow("");

  return (
    <>
      <Container fluid>
        <Stack className="align-items-center justify-content-center min-vh-100">
          <Row>
            <div style={{ height: "200px" }}>
              <Image src="https://via.placeholder.com/200" alt="..." fluid />
            </div>
          </Row>

          <Row>
            <h1>Caro Game</h1>
          </Row>

          <Stack
            direction="horizontal"
            gap={2}
            className="justify-content-center"
          >
            <Button onClick={handleClick} className="btn-lg" value="login">
              Login
            </Button>
            <Button
              onClick={handleClick}
              className="btn-secondary btn-lg"
              value="register"
            >
              Register
            </Button>
          </Stack>
        </Stack>
      </Container>

      <ModalLoginForm
        show={show === "login"}
        onClose={handleClose}
      ></ModalLoginForm>
      <ModalRegisterForm
        show={show === "register"}
        onClose={handleClose}
      ></ModalRegisterForm>
    </>
  );
}
