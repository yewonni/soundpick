export interface JoinFormDataType {
  nickname: string;
  userId: string;
  password: string;
  passwordConfirm: string;
  email: string;
  emailDomain: string;
  phoneNumber: string;
}

export interface JoinRequestType {
  rsaSeq: string;
  userId: string;
  password: string;
  email: string;
  nickname: string;
  phoneNumber: string;
}
