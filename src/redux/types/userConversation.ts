import { IConversation } from './conversation';

export type IUserConversation = {
  userId?: number;
  conversationId?: number;
  conversation?: IConversation;
};
