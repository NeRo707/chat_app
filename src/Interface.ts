export interface IChat {
  createdAt: number;
  id: number | string;
  uid: string;
  text: string;
  photoURL: string;
  imageURL?: string;
}

export interface IUser{
  uid: string;
  photoURL: string;
}