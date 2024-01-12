import React from 'react';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { axiosInstance } from '../../../services/axios.service';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

const ChangePassword = ({ dataUser, onChangePassword }) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCheckOldPassword = async () => {
    const result = await axiosInstance.get(`/users/${dataUser.userId}`);
    if (result.status === 200) {
      const user = result.data;
      if (user.password === oldPassword) {
        setOldPassword('');
        setShowChangePassword(true);
      } else {
        setOldPassword('');
        toast.error('Incorrect password !');
      }
    } else {
      setOldPassword('');
      toast.error('User not found !');
    }
  };

  const checkConfirmPassword = () => {
    let isCheck = false;
    if (!isEmpty(newPassword) || !isEmpty(confirmPassword)) {
      if (newPassword === confirmPassword) {
        isCheck = true;
      } else {
        toast.error('Passwords are not the same');
      }
    } else {
      toast.error('Fields cannot be left blank');
    }
    return isCheck;
  };

  const handleChangePassword = () => {
    if (checkConfirmPassword()) {
      const payload = {
        userId: dataUser.userId,
        password: newPassword,
      };
      setShowChangePassword(false);
      setNewPassword('');
      setConfirmPassword('');
      onChangePassword(payload);
    }
  };

  return (
    <>
      <div>
        <h3>Change password</h3>
        <hr />
      </div>
      <div>
        {showChangePassword ? (
          <Form className={'form-change-password m-auto'}>
            <Form.Group className="mb-3">
              <Form.Label>New password:</Form.Label>
              <Form.Control
                type="password"
                placeholder={'your new password'}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm password:</Form.Label>
              <Form.Control
                type="password"
                placeholder={'confirm password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <div
              className={'d-flex align-content-center justify-content-center'}
            >
              <Button variant="primary" onClick={handleChangePassword}>
                Submit
              </Button>
            </div>
          </Form>
        ) : (
          <Form className={'form-change-password m-auto'}>
            <Form.Group className="mb-3">
              <Form.Label>Old password:</Form.Label>
              <Form.Control
                type="password"
                placeholder={'your old password'}
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
              />
            </Form.Group>

            <div className={'d-flex justify-content-center'}>
              <Button variant="primary" onClick={handleCheckOldPassword}>
                Submit
              </Button>
            </div>
          </Form>
        )}
      </div>
    </>
  );
};

export default ChangePassword;
