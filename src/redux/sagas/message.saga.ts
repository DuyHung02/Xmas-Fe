import {call, put, takeLatest} from "redux-saga/effects";
import {messageAction} from "../slices/message.slice";
import {toast} from "react-toastify";
import {get} from "lodash";
import {axiosInstance} from "../../services/axios.service";
import {CreateMessageDto} from "../types/dtos/createMessage";

const fetchConversation = async (payload) => {
    return axiosInstance.post('/message/conversations', {userId: payload})
}

const sendMessage = async (payload: CreateMessageDto) => {
    return axiosInstance.post('/message/send', payload)
}

const handleFetchConversations = function* (action) {
    try {
        yield put({
            type: messageAction.fetchConversationPending.type,
        })
        const response = yield call(() => fetchConversation(action.payload));
        const conversations = response.data.data;
        yield put({
            type: messageAction.fetchConversationSuccess.type,
            payload: conversations
        })
    } catch (e) {
        yield put({
            type: messageAction.fetchConversationError.type,
            payload: {message: get(e, 'message')},
        })
        toast.error(get(e, 'message'));
    }
}

const handleSendMessage = function* (action) {
    try {
        yield put({
            type: messageAction.sendMessagePending.type,
        })
        const response = yield call(() => sendMessage(action.payload));
        const message = response.data.data;
        yield put({
            type: messageAction.sendMessageSuccess.type,
            payload: message,
        })
    } catch (e) {
        yield put({
            type: messageAction.sendMessageError.type,
            payload: {message: get(e, 'message')},
        })
    }
}

const messageSaga = function* () {
    yield takeLatest(
        `${messageAction.fetchConversationPending}_saga`,
        handleFetchConversations,
    );
    yield takeLatest(
        `${messageAction.sendMessagePending}_saga`,
        handleSendMessage,
    )
}

export default messageSaga;