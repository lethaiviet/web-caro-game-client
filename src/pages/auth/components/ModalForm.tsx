import { useAppDispatch } from "@hookRedux";
import { SyntheticEvent } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AuthData, signup } from "../authThunk";

type ModalProps = {
  title?: string;
  show?: boolean;
  buttonName?: string;
  onClose?: () => void;
  onSubmit?: (e: SyntheticEvent) => void;
};

function getDataFormAsAuthData(e: SyntheticEvent): AuthData {
  const formData = new FormData(e.target as HTMLFormElement);
  const formDataObj = Object.fromEntries(formData.entries());
  return formDataObj as unknown as AuthData;
}

const ModalTemp = ({
  title,
  show,
  buttonName,
  onClose,
  onSubmit,
}: ModalProps) => {
  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="loginForm.input.email">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginForm.input.password">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" required />
            </Form.Group>
            <Button type="submit">{buttonName}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

const ModalLoginForm = ({ show, onClose }: ModalProps) => {
  const dispatch = useAppDispatch();

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const authData: AuthData = getDataFormAsAuthData(e);
    dispatch(signup(authData));
  }
  return (
    <ModalTemp
      title="Login"
      buttonName="Login"
      show={show}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

const ModalRegisterForm = ({ show, onClose }: ModalProps) => {
  const dispatch = useAppDispatch();

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const authData: AuthData = getDataFormAsAuthData(e);
    dispatch(signup(authData));
  }
  return (
    <ModalTemp
      title="Register"
      buttonName="Register"
      show={show}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export { ModalLoginForm, ModalRegisterForm };
