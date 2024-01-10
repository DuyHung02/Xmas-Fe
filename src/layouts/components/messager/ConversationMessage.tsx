import './ConversationMessage.css';
import Image from "react-bootstrap/Image";
import React, {useEffect, useState, useRef} from "react";
import Form from 'react-bootstrap/Form';
import {FaInfoCircle} from "react-icons/fa";
import {FaPhone} from "react-icons/fa6";
import {FaVideo} from "react-icons/fa";
import {IoSend} from "react-icons/io5";
import {IoMdAddCircle} from "react-icons/io";
import {IoMdPhotos} from "react-icons/io";
import {RiEmojiStickerFill} from "react-icons/ri";
import {IConversation} from "../../../redux/types/conversation";
import {IMessage} from "../../../redux/types/message";
import {CreateMessageDto} from "../../../redux/types/dtos/createMessage";
import {useSocket} from "../../../utils/context/socket.context";
import {useDispatch} from "react-redux";
import {messageAction} from "../../../redux/slices/message.slice";
import {axiosInstance} from "../../../services/axios.service";

type IConversationMessageComponent = {
    dataConversation: IConversation,
    userId: number,
}

const ConversationMessage: React.FC<IConversationMessageComponent> = ({
                                                                          dataConversation,
                                                                          userId,
                                                                      }) => {
    const socket = useSocket();
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [listMessages, setListMessages] = useState<IMessage[]>([])
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (dataConversation.messages) {
            setListMessages(dataConversation.messages)
        }
    }, [])

    useEffect(() => {
        if (listMessages?.length) {
            ref.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    }, [listMessages])

    useEffect(() => {
        socket.emit('JOIN_CONVERSATION', dataConversation.id);
        const handleNewMessage = (payload: IMessage) => {
            dispatch({
                type: messageAction.sendMessageSuccess.type,
                payload: payload,
            });
            setListMessages(prevListMessages => [...prevListMessages, payload]);
        };

        socket.on(`NEW_MESSAGE_${dataConversation.id}`, handleNewMessage);

        return () => {
            socket.off(`NEW_MESSAGE_${dataConversation.id}`);
        };
    }, [dataConversation.id, dispatch, listMessages, socket])

    const handleSendMessage = async () => {
        try {
            const dataCreateMessage = {
                senderId: userId,
                content: message,
                conversationId: dataConversation.id,
            }
            setMessage("")
            const response = await axiosInstance.post('/message/send', dataCreateMessage)
            const newMessage = response.data.data
            dispatch({
                type: messageAction.sendMessageSuccess.type,
                payload: newMessage,
            });
            setListMessages(prevListMessages => [...prevListMessages, newMessage]);
            socket.emit(`SEND_MESSAGE`, newMessage)
        } catch (e: any) {
            console.log(e.message)
        }
    }

    const templateReceiver = (dataMessage: IMessage) => {
        let dataUserInfo;
        if (dataMessage.sender) {
            dataUserInfo = dataMessage.sender.profile
        }
        return (
            <div className={"message-receiver"} key={dataMessage.id}>
                <label>{dataUserInfo.firstName}</label>
                <div className={"message-content"}>
                    <Image src={dataUserInfo.avatar}
                           alt={"avt user"}
                           width={35}
                           height={35}
                           roundedCircle
                           className={'object-fit-cover'}
                    />
                    <p>{dataMessage.content}</p>
                </div>
            </div>
        )
    }

    const templateSender = (dataMessage: IMessage) => {
        let dataUserInfo;
        if (dataMessage.sender) {
            dataUserInfo = dataMessage.sender.profile
        }
        return (
            <div className={"message-sender"} key={dataMessage.id}>
                <p>{dataMessage.content}</p>
                <Image src={dataUserInfo.avatar}
                       alt={"avt user"}
                       width={35}
                       height={35}
                       roundedCircle
                       className={'object-fit-cover'}
                />
            </div>
        )
    }

    return (
        <>
            <div className={"conversation-container"}>
                <div className={"conversation-header"}>
                    <Image src={dataConversation.avatar}
                           alt={"avt user"}
                           width={50}
                           height={50}
                           roundedCircle
                           className={'object-fit-cover'}
                    />

                    <div className={"message-user"}>
                        <div className={"message-name"}>
                            <h6>{dataConversation.name}</h6>
                        </div>
                        <div>
                            <FaPhone className={'me-3 message-option'}/>
                            <FaVideo className={'me-3 message-option'}/>
                            <FaInfoCircle className={'me-3 message-option'}/>
                        </div>
                    </div>
                </div>

                <div className={"conversation-content"}>

                    {/*{dataConversation?.messages && dataConversation?.messages.map(message => (*/}
                    {/*    message.sender?.id === userId ? templateSender(message) : templateReceiver(message)*/}
                    {/*))}*/}

                    {listMessages.map(message => (
                        message.sender?.id === userId ? templateSender(message) : templateReceiver(message)
                    ))}

                    <div ref={ref} />
                </div>

                <div className={"conversation-input"}>
                    <div>
                        <IoMdAddCircle className={'me-3 message-option'}/>
                        <IoMdPhotos className={'me-3 message-option'}/>
                        <RiEmojiStickerFill className={'me-3 message-option'}/>
                    </div>
                    <div className={"message-input"}>
                        <Form.Control type="text"
                                      placeholder="Message text"
                                      value={message}
                                      onChange={e => setMessage(e.target.value)}
                        />
                    </div>
                    <div>
                        <IoSend className={'me-3 message-option'}
                                onClick={handleSendMessage}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConversationMessage;