import { IProfile } from './profile';

export type IUser = {
  id: number;
  username?: string;
  isAdmin?: boolean;
  profile?: IProfile;
  createAt?: Date;
  updateAt?: Date;
};
