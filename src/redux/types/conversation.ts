import { IMessage } from './message';

export type IConversation = {
  id?: number;
  name?: string;
  avatar?: string;
  messages?: IMessage[];
  createAt?: Date;
  updateAt?: Date;
};
