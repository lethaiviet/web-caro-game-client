import {
  Navbar,
  Container,
  Offcanvas,
  Nav,
  NavDropdown,
  Image,
} from "react-bootstrap";

function DropdownToggleTitle() {
  return (
    <>
      <a href="/">
        <Image
          style={{ width: "2.3rem" }}
          src="https://via.placeholder.com/200?text=G"
          alt="..."
          fluid
          roundedCircle
        />
      </a>
      <span className="ms-2">YellowCat</span>
    </>
  );
}

function MenuBar() {
  return (
    <>
      <Navbar bg="light" expand="sm" className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#">
            <a href="/">
              <Image
                style={{ width: "2.3rem" }}
                src="https://via.placeholder.com/200?text=G"
                alt="..."
                fluid
              />
            </a>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar" className="justify-content-end">
            <Nav>
              <NavDropdown id="nav-dropdown" title={<DropdownToggleTitle />}>
                <NavDropdown.Item href="#action/3.1">Setting</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MenuBar;
