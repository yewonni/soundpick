import axiosInstance from "../axiosInstance";
import { JoinRequestType } from "../../types/JoinFormData";

export const signUp = (data: JoinRequestType) => {
  return axiosInstance.post("/api/members/sign-up", data);
};
