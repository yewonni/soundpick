import { z } from "zod";

export const joinSchema = z
  .object({
    nickname: z
      .string()
      .min(2, { message: "닉네임은 2자 이상이어야 합니다." })
      .max(7, { message: "닉네임은 7자 이하이어야 합니다." }),
    userId: z
      .string()
      .min(4, { message: "아이디는 4자 이상이어야 합니다." })
      .max(12, { message: "아이디는 12자 이하이어야 합니다." })
      .regex(/^[a-z0-9]+$/, {
        message: "아이디는 영문 소문자와 숫자만 가능합니다.",
      }),
    password: z
      .string()
      .min(6, { message: "비밀번호는 6자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하이어야 합니다." })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])/, {
        message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.",
      }),
    passwordConfirm: z.string(),
    email: z.string().min(1, { message: "이메일 아이디를 입력해주세요." }),
    emailDomain: z
      .string()
      .min(1, { message: "이메일 도메인을 선택해주세요." }),
    phoneNumber: z.string().regex(/^\d{10,11}$/, {
      message: "휴대폰 번호는 10~11자리 숫자여야 합니다.",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });
