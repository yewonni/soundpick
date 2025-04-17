import axiosInstance from "./axiosInstance";

export interface PublicKeyResponse {
  code: number;
  message: string;
  data: PublicKeyData;
}

export interface PublicKeyData {
  publicKey: string;
  seq: string;
  createTime: string;
  expireTime: string;
  expired: boolean;
}

export const fetchPublicKey = () => {
  return axiosInstance.get<PublicKeyResponse>("/api/security/public-key");
};
