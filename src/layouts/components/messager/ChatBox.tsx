import {useState} from "react";
import './ChatBox.css'
import {Button} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { IoClose } from "react-icons/io5";


const ChatBox = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const handleChatToggle = () => {
        setIsChatOpen(!isChatOpen);
    };

    const messageSender = () => {
        return (
            <div className="chat-your-message">
                <p>Hi</p>
            </div>
        )
    }

    const messageReceiver = () => {
        return (
            <div className="chat-message">
                <img
                    src="https://i.pinimg.com/564x/51/75/97/51759708b252dce39f4cbd85e026a49d.jpg"
                    alt={'user-avatar'}
                    className={'rounded-circle chat-image'}
                />
                <p>Oh, hello there!</p>
            </div>
        )
    }

    return (
        <div className={`chat-bubble ${isChatOpen ? 'open' : ''}`}>
      <span className="bubble-icon">
        <img
            src={'https://i.pinimg.com/564x/2a/c3/33/2ac33301b5621af3815cfd59ca353564.jpg'}
            alt={'box-avatar'}
            className={'rounded-circle'}
            width={50}
            height={50}
            onClick={handleChatToggle}
        />
      </span>
            {isChatOpen && (
                <div className={`chat-window ${isChatOpen ? 'd-flex' : 'd-none'}`}>
                    {/* Nội dung của cửa sổ chat */}
                    <div className={'header-box'}>
                        <img
                            src={'https://i.pinimg.com/564x/2a/c3/33/2ac33301b5621af3815cfd59ca353564.jpg'}
                            alt={'head-avatar'}
                            className={'rounded-circle'}
                            width={35}
                            height={35}
                        />
                        <p>Old Quanh and Friends</p>
                        <IoClose style={{marginLeft: 'auto'}}
                                 onClick={handleChatToggle}
                        />
                    </div>

                    <div className="chat-content">
                        {messageSender()}
                        {messageReceiver()}
                    </div>

                    <div className="input-box">
                        {/*<input type={'text'} className="form-control input-message"/>*/}
                        <Form>
                            <Form.Group>
                                <Form.Label>
                                    <Form.Control type={'text'}
                                                  placeholder={'enter text...'}
                                    />
                                </Form.Label>
                            </Form.Group>
                        </Form>
                        <Button variant={'danger'}>Send</Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatBox;