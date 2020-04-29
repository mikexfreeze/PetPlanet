import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IImage } from 'app/shared/model/image.model';
import { ITag } from 'app/shared/model/tag.model';

export interface IPost {
  id?: number;
  title?: string;
  content?: string;
  created?: Moment;
  author?: IUser;
  image?: IImage;
  tags?: ITag[];
}

export const defaultValue: Readonly<IPost> = {};
