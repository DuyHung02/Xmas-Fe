import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import {Col, Row} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Conversation from "../../layouts/components/messager/Conversation";
import './Message.css';
import {useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {messageAction} from "../../redux/slices/message.slice";
import {isEmpty} from "lodash";
import {IUserConversation} from "../../redux/types/userConversation";
import ConversationMessage from "../../layouts/components/messager/ConversationMessage";
import { BiMessageAdd } from "react-icons/bi";

const Message = ({userInfoState}) => {
    const dispatch = useDispatch();
    const [userConversation, setUserConversation] = useState<IUserConversation[]>([])
    const userConversationState = useSelector((state: any) => state.message.conversations as IUserConversation[])

    useEffect(() => {
        dispatch({
            type: `${messageAction.fetchConversationPending}_saga`,
            payload: userInfoState.userId,
        })
    }, [dispatch, userInfoState.userId])

    useEffect(() => {
        console.log('user conversation is change')
        setUserConversation(userConversationState)
    }, [userConversationState])

    return (
        <>
            <Container fluid>
                <Tab.Container id="left-tabs-example" defaultActiveKey="1">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <div className={"message-title"}>
                                    <h3>Messages</h3>
                                    <BiMessageAdd className={"message-btn-add"}/>
                                </div>
                                {!isEmpty(userConversation) && userConversation.map((c: IUserConversation, index) => (
                                    <Nav.Item key={index}>
                                        <Nav.Link eventKey={c?.conversationId}>
                                            {c?.conversation && c?.userId && <Conversation dataConversation={c?.conversation}
                                                                                           userId={c?.userId}
                                            />}
                                        </Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                {!isEmpty(userConversation) && userConversation.map((c: IUserConversation, index) => (
                                    <Tab.Pane eventKey={c?.conversationId} key={index}>
                                        {c?.conversation && c?.userId &&
                                            <ConversationMessage dataConversation={c?.conversation}
                                                                 userId={c?.userId}
                                            />}
                                    </Tab.Pane>
                                ))}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </>
    )
}

const mapStateToProps = ({auth}) => ({
    userInfoState: auth.userInfo,
});

export default connect(mapStateToProps)(Message);