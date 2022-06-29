import {
    Navbar,
    Container,
    Nav,
    NavDropdown,
    Image,
    Badge,
} from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import iconGame from "@assets/mini-icon-game.png";
import { ROOT, USER_PROFILE } from "@/navigation/const"
import { useLocation } from 'react-router-dom'

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

function NavBarCollapse() {
    return (
        <>
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
                        <NavDropdown.Item as={Link} to={USER_PROFILE}>
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
        </>
    )
}

function Header() {
    const location = useLocation();
    const atUserProfile = location.pathname === USER_PROFILE;

    return (
        <>
            <Navbar bg="light" expand="sm" className="navbar-header border-bottom">

                <Container fluid className={atUserProfile ? "justify-content-start" : ""}>
                    <Navbar.Brand as={Link} to={ROOT}>
                        <Image
                            style={{ width: "2.3rem" }}
                            src={iconGame}
                            alt="..."
                            fluid
                        />
                    </Navbar.Brand>

                    {
                        atUserProfile ?
                            <Navbar.Brand as={Link} to={USER_PROFILE}>
                                User Profile
                            </Navbar.Brand> :
                            <NavBarCollapse />
                    }

                </Container>

            </Navbar>

            <Outlet />
        </>
    );
}

export default Header;
