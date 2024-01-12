import { IConversation } from '../conversation';
import { IUser } from '../user';

export type CreateConversationDto = {
  selectedFriends: IUser[];
  conversation: IConversation;
};
