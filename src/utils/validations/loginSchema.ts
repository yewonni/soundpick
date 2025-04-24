import { z } from "zod";

export const loginSchema = z.object({
  userId: z.string().min(1, { message: "아이디를 입력해 주세요." }),
  password: z.string().min(1, { message: "비밀번호를 입력해 주세요." }),
});
