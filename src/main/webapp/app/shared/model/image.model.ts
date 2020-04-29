export interface IImage {
  id?: number;
  imageContentType?: string;
  image?: any;
}

export const defaultValue: Readonly<IImage> = {};
