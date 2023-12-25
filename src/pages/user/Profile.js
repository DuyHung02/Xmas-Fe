import Container from 'react-bootstrap/Container';
import {Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import Tab from 'react-bootstrap/Tab';
import Nav from "react-bootstrap/Nav";
import ProfileUser from "../../layouts/components/profile-user/ProfileUser";
import {profileAction} from "../../redux/slices/profile.slice.ts";
import {useEffect, useState} from "react";
import ChangePassword from "../../layouts/components/change-password/ChangePassword";
import './Profile.css';
import {changePassword} from "../../redux/actions/auth.action";

const Profile = ({
                     userInfoState,
                     profileState,
                     updateProfile,
                     fetchProfile,
                     changePassword,
                 }) => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        fetchProfile(userInfoState.userId)
    }, [userInfoState.userId])

    useEffect(() => {
        setProfile(profileState)
    }, [profileState])

    return (
        <Container fluid>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Edit your profile</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Change your password</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <ProfileUser
                                    dataUser={userInfoState}
                                    dataProfile={profile}
                                    onUpdate={updateProfile}/>
                            </Tab.Pane>

                            <Tab.Pane eventKey="second">
                                <ChangePassword
                                    dataUser={userInfoState}
                                    onChangePassword={changePassword}
                                />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}

const mapStateToProps = ({auth, profile}) => ({
    userInfoState: auth,
    profileState: profile.profile,
});

const mapDispatchToProps = dispatch => ({
    fetchProfile: payload =>
        dispatch({
            type: `${profileAction.fetchProfilePending}_saga`,
            payload
        }),
    updateProfile: payload =>
        dispatch({
            type: `${profileAction.updateProfilePending}_saga`,
            payload,
        }),
    changePassword: payload =>
        dispatch(changePassword(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);