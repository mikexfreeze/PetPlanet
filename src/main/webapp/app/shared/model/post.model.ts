import { Moment } from 'moment';
import { IImage } from 'app/shared/model/image.model';
import { IUser } from 'app/shared/model/user.model';
import { ITag } from 'app/shared/model/tag.model';

export interface IPost {
  id?: number;
  title?: string;
  content?: string;
  created?: Moment;
  images?: IImage[];
  author?: IUser;
  tags?: ITag[];
}

export const defaultValue: Readonly<IPost> = {};
