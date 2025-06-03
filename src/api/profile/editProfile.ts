import axiosInstance from "../axiosInstance";

export const uploadProfile = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance.post("/api/members/me/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

interface EditProfileType {
  nickname: string;
  introduction: string;
}
export const editProfile = (data: EditProfileType) => {
  return axiosInstance.put("/api/members/me", data);
};
