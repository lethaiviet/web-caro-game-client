import {
    Navbar,
    Container,
    Nav,
    NavDropdown,
    Image,
    Badge,
} from "react-bootstrap";
import { Outlet, Link, useNavigate, useMatch } from "react-router-dom";
import iconGame from "@assets/mini-icon-game.png";
import { CHAT, LOGIN, ROOT, USER_PROFILE, PAGES_NAME_MAP, LOBBY } from "@/navigation/const"
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { selectUsers } from "@/pages/user/usersSlice";
import { useEffect } from "react";
import { getCurrentUser } from "@/pages/user/usersThunk";
import { getAvatarTemplate } from "@/utils/utils"
import { ChatDotsFill, GearWide, PersonCircle, BoxArrowRight } from "react-bootstrap-icons"
import { logout } from "@/pages/auth/authThunk";
import { unwrapResult } from "@reduxjs/toolkit";
import { actionChat, selectChat } from "@/pages/chat/chatSlice";
import { actionGame } from "@/pages/game/gameSlice";


function DropdownToggleTitle() {
    const { currentUser } = useAppSelector(selectUsers);
    return (
        <>
            <Image
                style={{ width: "2.3rem" }}
                src={currentUser.avatar === "" ? getAvatarTemplate(currentUser.name, 50) : currentUser.avatar}
                alt={currentUser.name}
                fluid
                roundedCircle
            />
            <span className="ms-2">{currentUser.name}</span>
        </>
    );
}

function MessageIcon() {
    const navigate = useNavigate();
    const { totalNotification } = useAppSelector(selectChat);

    return (
        <>
            <div className="d-inline-flex position-relative me-2" onClick={() => navigate(CHAT)}>
                <ChatDotsFill size={18} color="blue" />
                {
                    totalNotification > 0 && (
                        <Badge
                            className="position-absolute top-0 start-100 translate-middle p-1 rounded-circle"
                            pill
                            bg="danger"
                            style={{ lineHeight: 0.7 }}
                        >
                            {totalNotification > 9 ? "9+" : totalNotification}<span className="visually-hidden">unread messages</span>
                        </Badge>)
                }

            </div>
        </>
    );
}

function NavBarCollapse() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout()).then(unwrapResult)
            .then(() => dispatch(actionChat.requestDisconnectSocket()))
            .then(() => dispatch(actionGame.requestDisconnectSocket()))
            .then(() => navigate(LOGIN))
            .catch(err => console.log(err))
    }

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
                            <GearWide className="me-2" size={18} />
                            Setting
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={USER_PROFILE}>
                            <PersonCircle className="me-2" size={18} />
                            Profile
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogout}>
                            <BoxArrowRight className="me-2" size={18} />
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
    const matchLobby = useMatch(LOBBY);
    const { currentUser } = useAppSelector(selectUsers);
    const dispatch = useAppDispatch();
    const atUserProfile = location.pathname === USER_PROFILE;

    useEffect(() => {
        if (currentUser._id === "") {
            dispatch(getCurrentUser())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

                    <Navbar.Brand>
                        {matchLobby ? `${PAGES_NAME_MAP[matchLobby.pattern.path]}/${matchLobby.params.roomId}` : PAGES_NAME_MAP[location.pathname]}
                    </Navbar.Brand>

                    {atUserProfile || <NavBarCollapse />}

                </Container>

            </Navbar>

            <Outlet />
        </>
    );
}

export default Header;
