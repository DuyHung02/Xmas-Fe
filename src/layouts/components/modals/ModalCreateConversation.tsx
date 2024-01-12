import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import './ModalCreateConversation.css';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { IUser } from '../../../redux/types/user';
import { CreateConversationDto } from '../../../redux/types/dtos/createConversationDto';

type IModalCreateConversation = {
  show: boolean;
  handleClose: () => void;
  listFriends: IUser[];
  onCreateConversation: (dataCreateConversation: CreateConversationDto) => void;
};

const ModalCreateConversation: React.FC<IModalCreateConversation> = ({
  show,
  handleClose,
  listFriends,
  onCreateConversation,
}) => {
  const [selectedFriends, setSelectedFriends] = useState<IUser[]>([]);
  const [groupNameInput, setGroupNameInput] = useState('');
  const [showModal, setShowModal] = useState(false);

  const avatar =
    'https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg';

  useEffect(() => {
    setShowModal(show);
  }, [show]);

  const handleSelectFriend = (friend: IUser) => {
    if (selectedFriends.includes(friend)) {
      setSelectedFriends(selectedFriends.filter(f => f !== friend));
    } else {
      setSelectedFriends([...selectedFriends, friend]);
    }
  };

  const handleCreateConversation = () => {
    let groupName;
    if (isEmpty(groupNameInput)) {
      const maxNamesToShow = 2;
      const remainingFriendsCount = Math.max(
        0,
        selectedFriends.length - maxNamesToShow,
      );
      const generateName = selectedFriends
        .slice(0, maxNamesToShow)
        .map(f => f.profile?.firstName);
      if (remainingFriendsCount > 0) {
        const remainingText = ` và ${remainingFriendsCount} người khác`;
        groupName = 'Bạn, ' + generateName.join('. ') + remainingText;
      } else {
        groupName = 'Bạn, ' + generateName.join('. ');
      }
    } else {
      groupName = groupNameInput;
    }
    const dataCreateConversation = {
      selectedFriends,
      conversation: {
        name: groupName,
        avatar: avatar,
      },
    };
    onCreateConversation(dataCreateConversation);
    setSelectedFriends([]);
    setGroupNameInput('');
    setShowModal(false);
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create conversation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className={'d-flex justify-content-evenly align-items-center'}>
              <p>Group name: </p>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="name..."
                  autoFocus
                  value={groupNameInput}
                  onChange={e => setGroupNameInput(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className={'list-friends'}>
              {!isEmpty(listFriends) &&
                listFriends.map(f => (
                  <Form.Group
                    className={'friend'}
                    key={f.id}
                    onClick={() => handleSelectFriend(f)}
                  >
                    <div
                      className={
                        'd-flex align-items-center justify-content-evenly'
                      }
                    >
                      <Image
                        src={f.profile?.avatar}
                        alt={'avt'}
                        width={50}
                        height={50}
                        roundedCircle
                        className={'object-fit-cover'}
                      />
                      <p className={'friend-name'}>
                        {f.profile?.firstName} {f.profile?.lastName}
                      </p>
                    </div>
                    <Form.Check
                      type={'checkbox'}
                      id={f.id + ''}
                      checked={selectedFriends.includes(f)}
                      readOnly
                    />
                  </Form.Group>
                ))}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            disabled={selectedFriends.length < 2}
            onClick={handleCreateConversation}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateConversation;
