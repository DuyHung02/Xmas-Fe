import {createSlice} from "@reduxjs/toolkit";
import {IMessage} from "../types/message";
import {IUserConversation} from "../types/userConversation";

type IInitialState = {
    conversations: IUserConversation[];
    isLoading: boolean;
    isError: boolean;
    message: string;
}

const initialState: IInitialState = {
    conversations: [],
    isLoading: false,
    isError: false,
    message: ''
}

const requestPending = (state: IInitialState) => {
    state.isLoading = true;
    state.isError = false;
    state.message = '';
};

const requestError = (
    state: IInitialState,
    action: { type: string; payload: { message: string } },
) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload.message;
};

const fetchConversationPending = requestPending;
const fetchConversationError = requestError;
const sendMessagePending = requestPending;
const sendMessageError = requestError;

const fetchConversationSuccess = (
    state: IInitialState,
    action: {
        type: string,
        payload: IUserConversation[]
    }
) => {
    state.conversations = action.payload;
    state.isLoading = false
}

const sendMessageSuccess = (
    state: IInitialState,
    action: {
        type: string,
        payload: IMessage,
    }
) => {
    console.log('state: ',JSON.parse(JSON.stringify(state)))

    const conversation = state.conversations.find(c => c.conversationId === action.payload.conversationId)
    console.log(conversation)
    if (conversation) {
        conversation.conversation?.messages?.push(action.payload)
    }
}

const messageSlice = createSlice({
    name: 'messages',
    initialState: initialState,
    reducers: {
        fetchConversationPending,
        fetchConversationError,
        fetchConversationSuccess,
        sendMessagePending,
        sendMessageError,
        sendMessageSuccess
    }
});

export default messageSlice.reducer;

export const messageAction = messageSlice.actions;