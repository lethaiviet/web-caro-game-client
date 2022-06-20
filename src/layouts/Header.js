import {
    Navbar,
    Container,
    Nav,
    NavDropdown,
    Image,
    Badge,
} from "react-bootstrap";

function DropdownToggleTitle() {
    return (
        <>
            <Image
                style={{ width: "2.3rem" }}
                src="https://via.placeholder.com/200?text=G"
                alt="..."
                fluid
                roundedCircle
            />
            <span className="ms-2">YellowCat</span>
        </>
    );
}

function IconSetting() {
    return (
        <>
            <Image
                style={{ width: "1rem" }}
                src="https://via.placeholder.com/200?text=G"
                alt="..."
                fluid
                className="me-2"
            />
        </>
    );
}

function MessageIcon() {
    return (
        <>
            <div className="d-inline-flex position-relative me-2">
                <Image
                    style={{ width: "30px", height: "30px" }}
                    src="https://via.placeholder.com/200?text=G"
                    alt="..."
                    fluid
                />
                <Badge
                    className="position-absolute top-0 start-100 translate-middle p-1 rounded-circle"
                    pill
                    bg="danger"
                >
                    9+<span className="visually-hidden">unread messages</span>
                </Badge>
            </div>
        </>
    );
}

function Header() {
    return (
        <>
            <Navbar bg="light" expand="sm" className="mb-3">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <Image
                            style={{ width: "2.3rem" }}
                            src="https://via.placeholder.com/200?text=G"
                            alt="..."
                            fluid
                        />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbar-user-profile" />
                    <Navbar.Collapse
                        id="navbar-user-profile"
                        className="justify-content-end align-items-center"
                    >
                        <MessageIcon />

                        <Nav>
                            <NavDropdown id="nav-dropdown" title={<DropdownToggleTitle />}>
                                <NavDropdown.Item href="#action/3.1">
                                    <IconSetting />
                                    Setting
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    <IconSetting />
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    <IconSetting />
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
