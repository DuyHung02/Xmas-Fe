import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import InputGroup from 'react-bootstrap/InputGroup';

const ProfileUser = ({ dataUser, dataProfile, onUpdate }) => {
  const [validated, setValidated] = useState(false);
  const [inputValue, setInputValue] = useState({
    inputEmail: '',
    inputFirstName: '',
    inputLastName: '',
    inputGender: '',
  });

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const payload = {
        ...dataProfile,
        email: inputValue.inputEmail,
        firstName: inputValue.inputFirstName,
        lastName: inputValue.inputLastName,
        gender: inputValue.inputGender,
      };
      onUpdate(payload);
    }
    setValidated(true);
  };

  useEffect(() => {
    if (!isEmpty(dataProfile)) {
      setInputValue({
        inputEmail: dataProfile.email,
        inputFirstName: dataProfile.firstName,
        inputLastName: dataProfile.lastName,
        inputGender: dataProfile.gender,
      });
    }
  }, [dataProfile]);

  return (
    <>
      <div>
        <h3>Profile</h3>
        <hr />
      </div>
      <Row>
        <Col md={4}>
          <Image src={dataProfile?.avatar} thumbnail />
        </Col>
        <Col md={8}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col md={9}>
                <Form.Group className="mb-3">
                  <Form.Label>Username: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    value={dataUser.username}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Your ID: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="your id"
                    value={dataUser.userId}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId={'validationFirstName'}>
                  <Form.Label>First name: </Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Enter your first name"
                    value={inputValue.inputFirstName}
                    onChange={e =>
                      setInputValue({
                        ...inputValue,
                        inputFirstName: e.target.value,
                      })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    First name can not be empty!
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId={'validationLastName'}>
                  <Form.Label>Last name: </Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Enter your last name"
                    value={inputValue.inputLastName}
                    onChange={e =>
                      setInputValue({
                        ...inputValue,
                        inputLastName: e.target.value,
                      })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Last name can not be empty!
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Gender: </Form.Label>
                  <Form.Select
                    value={dataProfile?.gender || 'none'}
                    onChange={e =>
                      setInputValue({
                        ...inputValue,
                        inputGender: e.target.value,
                      })
                    }
                  >
                    <option value="none" disabled>
                      -- None --
                    </option>
                    <option value="other">Other</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId={'validationEmail'}>
                  <Form.Label>Email: </Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text>@</InputGroup.Text>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Enter your email"
                      value={inputValue.inputEmail || ''}
                      onChange={e =>
                        setInputValue({
                          ...inputValue,
                          inputEmail: e.target.value,
                        })
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Email can not be empty!
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type={'submit'}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ProfileUser;
