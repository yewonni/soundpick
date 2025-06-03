import { z } from "zod";

export const profileEditSchema = z.object({
  nickname: z
    .string()
    .min(2, { message: "닉네임은 2자 이상이어야 합니다." })
    .max(7, { message: "닉네임은 7자 이하이어야 합니다." }),
  introduction: z
    .string()
    .max(20, { message: "소개글은 20자 이하이어야 합니다." }),
});
