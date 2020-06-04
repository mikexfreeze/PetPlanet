import { IPost } from 'app/shared/model/post.model';

export interface IImage {
  id?: number;
  imageContentType?: string;
  image?: any;
  post?: IPost;
}

export const defaultValue: Readonly<IImage> = {};
