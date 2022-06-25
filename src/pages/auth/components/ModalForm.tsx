import { ROOT } from "@/navigation/const";
import { useAppDispatch, useAppSelector } from "@hookRedux";
import { unwrapResult } from "@reduxjs/toolkit";
import { SyntheticEvent } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { selectAuth } from "../authSlice";
import { AuthData, login, signup } from "../authThunk";

type ModalProps = {
  title?: string;
  show?: boolean;
  buttonName?: string;
  onClose?: () => void;
  onSubmit?: (e: SyntheticEvent) => void;
  errorMessage?: string | null;
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
  errorMessage,
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
            <Form.Group className="mb-2" controlId="loginForm.input.password">
              <Form.Text>{errorMessage}</Form.Text>
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
  const navigate = useNavigate();
  const { message } = useAppSelector(selectAuth);

  function handleSignUp(e: SyntheticEvent) {
    e.preventDefault();
    const authData: AuthData = getDataFormAsAuthData(e);
    dispatch(login(authData))
      .then(unwrapResult)
      .then(() => navigate(ROOT));
  }

  return (
    <ModalTemp
      title="Login"
      buttonName="Login"
      show={show}
      onClose={onClose}
      onSubmit={handleSignUp}
      errorMessage={message}
    />
  );
};

const ModalRegisterForm = ({ show, onClose }: ModalProps) => {
  const dispatch = useAppDispatch();
  const { message } = useAppSelector(selectAuth);

  function handleLogin(e: SyntheticEvent) {
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
      onSubmit={handleLogin}
      errorMessage={message}
    />
  );
};

export { ModalLoginForm, ModalRegisterForm };
