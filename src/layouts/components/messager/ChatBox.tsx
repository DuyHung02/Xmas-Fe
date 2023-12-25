import {useState} from "react";
import './ChatBox.css'

const ChatBox = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const handleChatToggle = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div className={`chat-bubble ${isChatOpen ? 'open' : ''}`}>
      <span className="bubble-icon">
        <img
            src={'http://localhost:3000/assets/media/avatars/no_avatar.png'}
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
                            src={'http://localhost:3000/assets/media/avatars/no_avatar.png'}
                            alt={'head-avatar'}
                            className={'rounded-circle'}
                            width={35}
                            height={35}
                        />
                        <p>Old Quanh and Friends</p>
                        <i
                            className="ki-outline ki-cross fs-1"
                            onClick={handleChatToggle}
                        />
                    </div>

                    <div className="chat-content">
                        <div className="chat-message">
                            <img
                                src="https://i.pinimg.com/564x/51/75/97/51759708b252dce39f4cbd85e026a49d.jpg"
                                alt={'user-avatar'}
                                className={'rounded-circle chat-image'}
                            />
                            <p>Oh, hello there!</p>
                        </div>
                        <div className="chat-your-message">
                            <p>Hi</p>
                        </div>
                        <div className="chat-your-message">
                            <p>Nice to meet you!</p>
                        </div>
                        <div className="chat-message">
                            <img
                                src="https://i.pinimg.com/564x/51/75/97/51759708b252dce39f4cbd85e026a49d.jpg"
                                alt={'user-avatar'}
                                className={'rounded-circle chat-image'}
                            />
                            <p>Nice to meet you too!</p>
                        </div>
                        <div className="chat-your-message">
                            <p>What your name?</p>
                        </div>
                        <div className="chat-message">
                            <img
                                src="https://i.pinimg.com/564x/51/75/97/51759708b252dce39f4cbd85e026a49d.jpg"
                                alt={'user-avatar'}
                                className={'rounded-circle chat-image'}
                            />
                            <p>I am Rikka</p>
                        </div>
                        <div className="chat-your-message">
                            <p>F*ck Rikka</p>
                        </div>
                    </div>

                    <div className="input-box">
                        <input type={'text'} className="form-control input-message"/>
                        <button className="btn btn-bg-primary btn-send">
                            <span className={'menu-icon'}>Send</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatBox;