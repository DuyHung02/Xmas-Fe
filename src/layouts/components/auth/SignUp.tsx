import {Button, Form, Row, Col} from "react-bootstrap";
import {useState} from "react";
import {isEmpty} from "lodash";
import {toast} from "react-toastify";

const SignUp = ({ onRegister }) => {
    const [inputRegister, setInputRegister] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
    })

    const checkValid = () => {
        let isCheck = false
        if (
            !isEmpty(inputRegister.username) ||
            !isEmpty(inputRegister.password) ||
            !isEmpty(inputRegister.confirmPassword) ||
            !isEmpty(inputRegister.firstName) ||
            !isEmpty(inputRegister.lastName)
        ) {
            isCheck = checkPassword()
        } else {
            toast.error('Fields cannot be left blank');
        }
        return isCheck;
    }

    const checkPassword = () => {
        let isCheck = false;
        if (inputRegister.password === inputRegister.confirmPassword) {
            isCheck = true;
        } else {
            toast.error('Passwords are not the same');
        }
        return isCheck;
    }

    const handleSubmit = () => {
        if (checkValid()) {
            const payload = {
                username: inputRegister.username,
                password: inputRegister.password,
                firstName: inputRegister.firstName,
                lastName: inputRegister.lastName,
            }
            onRegister(payload);
        }
    }

    return (
        <>
            <div className="text-center mb-11">
                <h1 className="text-dark fw-bolder mb-3">Sign Up</h1>
            </div>
            <Form.Group className="mb-3">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    onChange={e => setInputRegister({
                        ...inputRegister,
                        username: e.target.value
                    })}
                    placeholder={'your username'}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    onChange={e => setInputRegister({
                        ...inputRegister,
                        password: e.target.value
                    })}
                    placeholder={'your password'}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Confirm password:</Form.Label>
                <Form.Control
                    type="password"
                    onChange={e => setInputRegister({
                        ...inputRegister,
                        confirmPassword: e.target.value
                    })}
                    placeholder={'confirm password'}
                />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>First name: </Form.Label>
                        <Form.Control
                            onChange={e => setInputRegister({
                                ...inputRegister,
                                firstName: e.target.value
                            })}
                            placeholder={'your first name'}
                        />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Last name:</Form.Label>
                        <Form.Control
                            onChange={e => setInputRegister({
                                ...inputRegister,
                                lastName: e.target.value
                            })}
                            placeholder={'your last name'}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <div className={'text-center'}>
                <Button className="mt-3 w-100" variant="danger" onClick={handleSubmit}>Submit</Button>
            </div>
        </>
    )
}

export default SignUp;