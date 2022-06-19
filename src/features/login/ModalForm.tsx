import { SyntheticEvent } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface ILoginForm {
  username: { value: string };
  password: { value: string };
}

type ModalProps = {
  title?: string;
  show?: boolean;
  buttonName?: string;
  handleClose?: () => void;
};

const ModalTemp = ({ title, show, buttonName, handleClose }: ModalProps) => {
  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & ILoginForm;

    console.log(target.password.value, target.username.value);
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginForm.input.email">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginForm.input.password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Button type="submit">{buttonName}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

const ModalLoginForm = ({ show, handleClose }: ModalProps) => {
  return (
    <ModalTemp
      title="Login"
      buttonName="Login"
      show={show}
      handleClose={handleClose}
    />
  );
};

const ModalRegisterForm = ({ show, handleClose }: ModalProps) => {
  return (
    <ModalTemp
      title="Register"
      buttonName="Register"
      show={show}
      handleClose={handleClose}
    />
  );
};

export { ModalLoginForm, ModalRegisterForm };
