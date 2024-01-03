import './ConversationMessage.css';
import Image from "react-bootstrap/Image";
import React, {useState} from "react";
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

type IConversationMessageComponent = {
    dataConversation: IConversation,
    userId: number,
    onSendMessage: (dataCreateMessage: CreateMessageDto) => void,
}

const ConversationMessage: React.FC<IConversationMessageComponent> = ({
                                                                          dataConversation,
                                                                          userId,
                                                                          onSendMessage,
                                                                      }) => {
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        const dataCreateMessage = {
            senderId: userId,
            content: message,
            conversationId: dataConversation.id,
        }
        onSendMessage(dataCreateMessage);
        setMessage("")
    }

    const templateReceiver = (dataMessage: IMessage) => {
        const dataUserInfo = dataMessage.sender.profile
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
        const dataUserInfo = dataMessage.sender.profile
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

                    {dataConversation?.messages && dataConversation?.messages.map(message => (
                        message.sender.id === userId ? templateSender(message) : templateReceiver(message)
                    ))}

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