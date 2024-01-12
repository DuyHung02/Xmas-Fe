import React from 'react';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import { Col, Row } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Conversation from '../../layouts/components/messager/Conversation';
import './Message.css';
import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { messageAction } from '../../redux/slices/message.slice';
import { isEmpty } from 'lodash';
import { IUserConversation } from '../../redux/types/userConversation';
import ConversationMessage from '../../layouts/components/messager/ConversationMessage';
import { BiMessageAdd } from 'react-icons/bi';
import ModalCreateConversation from '../../layouts/components/modals/ModalCreateConversation';
import { IUser } from '../../redux/types/user';
import { managerFriendAction } from '../../redux/slices/managerFriend.slice';
import { CreateConversationDto } from '../../redux/types/dtos/createConversationDto';

const Message = ({ userInfoState }) => {
  const dispatch = useDispatch();
  const [userConversation, setUserConversation] = useState<IUserConversation[]>(
    [],
  );
  const [listFriends, setListFriends] = useState<IUser[]>([]);
  const userConversationState = useSelector(
    (state: any) => state.message.conversations as IUserConversation[],
  );
  const friendsState = useSelector(
    (state: any) => state.friend.friends as IUser[],
  );
  const [showCreateConversation, setShowCreateConversation] = useState(false);

  useEffect(() => {
    dispatch({
      type: `${messageAction.fetchConversationPending}_saga`,
      payload: userInfoState.userId,
    });
    dispatch({
      type: `${managerFriendAction.fetchListFriendsPending}_saga`,
    });
  }, [dispatch, userInfoState.userId]);

  useEffect(() => {
    setUserConversation(userConversationState);
  }, [userConversationState]);

  useEffect(() => {
    setListFriends(friendsState.filter(f => f.id !== userInfoState.userId));
  }, [friendsState, userInfoState.userId]);

  const handleCreateConversation = (
    dataCreateConversation: CreateConversationDto,
  ) => {
    const myUser = friendsState.find(f => f.id === userInfoState.userId);
    if (myUser) {
      dataCreateConversation.selectedFriends.push(myUser);
    }
    dispatch({
      type: `${messageAction.createConversationPending}_saga`,
      payload: dataCreateConversation,
    });
  };

  return (
    <>
      <Container fluid>
        <Tab.Container id="left-tabs-example" defaultActiveKey="1">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <div className={'message-title'}>
                  <h3>Messages</h3>
                  <BiMessageAdd
                    className={'message-btn-add'}
                    onClick={() => setShowCreateConversation(true)}
                  />
                </div>
                <div className={'container-conversation'}>
                  {!isEmpty(userConversation) &&
                    userConversation.map((c: IUserConversation, index) => (
                      <Nav.Item key={index}>
                        <Nav.Link eventKey={c?.conversationId}>
                          {c?.conversation && c?.userId && (
                            <Conversation
                              dataConversation={c?.conversation}
                              userId={c?.userId}
                            />
                          )}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                </div>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                {!isEmpty(userConversation) &&
                  userConversation.map((c: IUserConversation, index) => (
                    <Tab.Pane eventKey={c?.conversationId} key={index}>
                      {c?.conversation && c?.userId && (
                        <ConversationMessage
                          dataConversation={c?.conversation}
                          userId={c?.userId}
                        />
                      )}
                    </Tab.Pane>
                  ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>

      <ModalCreateConversation
        show={showCreateConversation}
        handleClose={() => setShowCreateConversation(false)}
        listFriends={listFriends}
        onCreateConversation={handleCreateConversation}
      />
    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  userInfoState: auth.userInfo,
});

export default connect(mapStateToProps)(Message);
