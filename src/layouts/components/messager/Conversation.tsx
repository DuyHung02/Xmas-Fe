import React, {useEffect, useState} from 'react';
import Image from "react-bootstrap/Image";
import './Conversation.css'
import {IConversation} from "../../../redux/types/conversation";
import {isEmpty} from "lodash";
import {IMessage} from "../../../redux/types/message";

type IConversationComponent = {
    dataConversation: IConversation;
}

const Conversation: React.FC<IConversationComponent> = ({
                                                            dataConversation,
                                                        }) => {
    const [message, setMessage] = useState<IMessage>({} as IMessage);
    const listMessage = dataConversation?.messages

    useEffect(() => {
        if (!isEmpty(listMessage) && listMessage) {
            setMessage(listMessage[listMessage.length -1])
        }
    }, [listMessage])

    return (
        <>
            <div className={"conversation-user"}>
                <Image src={dataConversation.avatar}
                       alt={"avt user"}
                       width={65}
                       height={65}
                       roundedCircle
                       className={'object-fit-cover'}
                />
                <div className={"conversation-name"}>
                    <h6>{dataConversation.name}</h6>
                    <p>{message.content}</p>
                </div>
            </div>
        </>
    )
}

export default Conversation;