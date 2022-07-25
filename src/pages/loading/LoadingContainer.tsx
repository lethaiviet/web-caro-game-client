import { Spinner } from "react-bootstrap";

export default function LoadingContainer() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 position-absolute top-0 bottom-0 start-0 end-0 bg-white">
      <Spinner animation="grow"></Spinner>
    </div>
  );
}
