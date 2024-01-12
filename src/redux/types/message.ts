import { IConversation } from './conversation';
import { IUser } from './user';

export type IMessage = {
  id?: number;
  sender?: IUser;
  senderId: number;
  content: string;
  recall?: boolean;
  conversation?: IConversation;
  conversationId: number;
  create_at?: Date;
  update_at?: Date;
};
