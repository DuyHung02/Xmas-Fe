import React, {useState} from 'react';
import {connect} from 'react-redux';
import {login, register} from "../../redux/actions/auth.action";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './Login.css'
import SignUp from "../../layouts/components/auth/SignUp";
import SignIn from "../../layouts/components/auth/SignIn";

const Login = ({ loginAction, registerAction }) => {
    const [key, setKey] = useState('login');

    return (
        <div className="container background-login">
            <div className={'background-form-login'}>
                <div className={'p-3 m-2'}>
                    <Tabs
                        activeKey={key}
                        transition={false}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="login" title="Sign In">
                            <SignIn onLogin={loginAction} />
                        </Tab>

                        <Tab eventKey="register" title="Sign Up">
                            <SignUp onRegister={registerAction}/>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({auth}) => ({
    isLoading: auth.isLoading,
    message: auth.message,
});

const mapDispatchToProps = (dispatch) => ({
    loginAction: (payload) => dispatch(login(payload)),
    registerAction: (payload) => dispatch(register(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
