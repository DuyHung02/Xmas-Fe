import {Button, Form} from "react-bootstrap";
import {useState} from "react";

const SignIn = ({ onLogin }) => {
    const [inputLogin, setInputLogin] = useState({
        username: '',
        password: '',
    });

    const handleLogin = () => {
        const payload = {
            username: inputLogin.username,
            password: inputLogin.password,
        }
        onLogin(payload);
    };

    return (
        <>
            <div className="text-center mb-11">
                <h1 className="text-dark fw-bolder mb-3">Sign In</h1>
            </div>

            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    onChange={e => setInputLogin({
                        ...inputLogin,
                        username: e.target.value
                    })}
                    placeholder={'enter your username'}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    onChange={e => setInputLogin({
                        ...inputLogin,
                        password: e.target.value
                    })}
                    placeholder={'enter your password'}
                />
            </Form.Group>
            <div>haru - 123456</div>
            <div className={'text-center'}>
                <Button className="mt-3 w-100" variant="danger" onClick={handleLogin}>Sign In</Button>
            </div>
        </>
    )
}

export default SignIn;