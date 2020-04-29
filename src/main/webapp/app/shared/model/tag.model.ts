import { IPost } from 'app/shared/model/post.model';

export interface ITag {
  id?: number;
  tag?: string;
  posts?: IPost[];
}

export const defaultValue: Readonly<ITag> = {};
