import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {isEmpty} from "lodash";
import {logout} from "../../../redux/actions/auth.action";
import {connect} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import Image from 'react-bootstrap/Image';
import './Header.css'

const Header = ({userInfoState, profileState, logoutAction}) => {
    const navigate = useNavigate()

    const handleProfileClick = () => {
        navigate('/profile')
    }

    const handleCartClick = () => {
        navigate('/cart')
    }

    return (
        <Navbar
            expand="sm"
            className="bg-body-tertiary nav-custom"
            // fixed="top"
            data-bs-theme="light"
            bg="light"
        >
            <Container fluid>
                <Navbar.Brand>
                    <Link to={'/'} className={'nav-link'}>Dashboard</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <Nav.Link onClick={() => navigate('/message')}>Message</Nav.Link>
                        <Nav.Link href="#action2">Link</Nav.Link>
                    </Nav>

                    {!isEmpty(userInfoState) ?
                        <Nav>
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title={
                                    <>
                                        <Image src={profileState.avatar}
                                               thumbnail
                                               roundedCircle
                                               width={50}
                                               className={'object-fit-cover p-1'}
                                        />
                                        {profileState.firstName}
                                    </>
                                }
                            >
                                <NavDropdown.Item onClick={handleProfileClick}>
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={handleCartClick}>
                                    Cart
                                </NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item onClick={logoutAction}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        :
                        ''
                    }
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-danger">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
const mapStateToProps = ({ auth, profile }) => ({
    userInfoState: auth.userInfo,
    profileState: profile.profile,
});

const mapDispatchToProps = (dispatch) => ({
    logoutAction: (payload) => dispatch(logout(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);