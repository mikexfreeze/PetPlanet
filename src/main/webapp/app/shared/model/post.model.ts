import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { ITag } from 'app/shared/model/tag.model';
import { IImage } from 'app/shared/model/image.model';

export interface IPost {
  id?: number;
  title?: string;
  content?: string;
  created?: Moment;
  author?: IUser;
  tags?: ITag[];
  images?: IImage[];
}

export const defaultValue: Readonly<IPost> = {};
