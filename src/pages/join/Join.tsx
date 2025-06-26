import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import Input from "../../components/Input";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
import { signUp } from "../../api/join/signUp";
import { checkUserId, checkNickname } from "../../api/join/check";
import { JoinFormDataType } from "../../types/JoinFormData";
import { JoinRequestType } from "../../types/JoinFormData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { joinSchema } from "../../utils/validations/joinSchema";
import DomainSelect from "./component/DomainSelect";
import { encryptWithRSAFromServer } from "../../utils/crypto";
import { showToast } from "../../utils/toast";

export default function Join() {
  const navigate = useNavigate();
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [emailDomain, setEmailDomain] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [isUserIdChecked, setIsUserIdChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [userIdSuccessMessage, setUserIdSuccessMessage] = useState("");
  const [nicknameSuccessMessage, setNicknameSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<JoinFormDataType>({
    resolver: zodResolver(joinSchema),
    mode: "onChange",
  });

  //비밀번호 일치 여부 검사
  const checkPasswordMatch = (e: ChangeEvent<HTMLInputElement>) => {
    const passwordField = document.getElementById(
      "password"
    ) as HTMLInputElement;
    if (passwordField && passwordField.value !== e.target.value) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  // 아이디 중복 확인
  const handleCheckUserId = async () => {
    const userId = getValues("userId");

    if (!userId) {
      setError("userId", { type: "manual", message: "아이디를 입력해주세요." });
      return;
    }

    try {
      const { data } = await checkUserId(userId);
      if (data.data.duplicate) {
        setError("userId", {
          type: "manual",
          message: "이미 사용 중인 아이디입니다.",
        });
        setIsUserIdChecked(false);
      } else {
        clearErrors("userId");
        setUserIdSuccessMessage("사용 가능한 아이디입니다.");
        setIsUserIdChecked(true);
      }
    } catch {
      showToast("아이디 중복확인 중 오류가 발생했습니다.");
    }
  };

  // 닉네임 중복확인
  const handleCheckNickname = async () => {
    const nickname = (document.getElementById("nickName") as HTMLInputElement)
      ?.value;

    if (!nickname) {
      setError("nickname", {
        type: "manual",
        message: "닉네임을 입력해주세요.",
      });
      return;
    }

    try {
      const response = await checkNickname(nickname);
      if (response.data.data.duplicate) {
        setError("nickname", {
          type: "manual",
          message: "이미 사용 중인 닉네임입니다.",
        });
        setIsNicknameChecked(false);
      } else {
        clearErrors("nickname");
        setNicknameSuccessMessage("사용 가능한 닉네임입니다.");
        setIsNicknameChecked(true);
      }
    } catch (err) {
      showToast("닉네임 중복확인 중 오류가 발생했습니다.");
    }
  };

  const handleJoinSubmit = async (data: JoinFormDataType) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (!isTermsChecked) {
        showToast("이용약관에 동의해주세요.");
        setIsSubmitting(false);
        return;
      }
      if (!isUserIdChecked || !isNicknameChecked) {
        showToast("중복확인을 완료해주세요.");
        setIsSubmitting(false);
        return;
      }

      const fullEmail = `${data.email}@${data.emailDomain}`;

      const { encrypted: encryptedPassword, rsaSeq } =
        await encryptWithRSAFromServer(data.password);

      if (!encryptedPassword) {
        showToast("비밀번호 암호화에 실패했습니다. 다시 시도해주세요.");
        setIsSubmitting(false);
        return;
      }

      if (!rsaSeq) {
        showToast("RSA 시퀀스 번호를 가져오는데 실패했습니다.");
        setIsSubmitting(false);
        return;
      }

      const requestData: JoinRequestType = {
        rsaSeq,
        userId: data.userId,
        password: encryptedPassword,
        email: fullEmail,
        nickname: data.nickname,
        phoneNumber: data.phoneNumber,
      };

      await signUp(requestData);

      navigate("/join-success");
    } catch (error: any) {
      if (error.response) {
        showToast(
          `회원가입 실패: ${
            error.response.data.message || "서버 오류가 발생했습니다."
          }`
        );
      } else if (error.request) {
        showToast("서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.");
      } else {
        showToast(
          `회원가입 실패: ${error.message || "알 수 없는 오류가 발생했습니다."}`
        );
      }
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen mb-11">
        <h1>
          <img
            src={logo}
            alt="로고"
            className="w-[230px] cursor-pointer md:w-[250px]"
            onClick={() => navigate("/")}
          />
        </h1>
        <article className="mt-4">
          <h2 className="sr-only">회원가입</h2>
          <form
            onSubmit={handleSubmit(handleJoinSubmit)}
            id="joinForm"
            className="w-[295px] md:w-[400px] rounded-lg bg-white bg-opacity-20 p-[25px] md:p-[35px] flex flex-col gap-4 text-sm"
          >
            {/* 닉네임 */}
            <div className="flex flex-col gap-1">
              <label htmlFor="nickName" className="text-text-base font-bold">
                닉네임
              </label>
              <div className="flex gap-3">
                <Input
                  id="nickName"
                  placeholder="닉네임 입력"
                  width="sm"
                  {...register("nickname")}
                  onChange={(e) => {
                    register("nickname").onChange(e);
                    setNicknameSuccessMessage("");
                    setIsNicknameChecked(false);
                  }}
                />
                <Button type="button" onClick={handleCheckNickname}>
                  중복확인
                </Button>
              </div>
              {errors.nickname && (
                <p className="text-xs text-purple-600">
                  {errors.nickname.message}
                </p>
              )}
              {nicknameSuccessMessage && (
                <p className="text-xs text-purple-950">
                  {nicknameSuccessMessage}
                </p>
              )}
            </div>

            {/* 아이디 */}
            <div className="flex flex-col gap-1">
              <label htmlFor="userId" className="text-text-base font-bold">
                아이디
              </label>
              <div className="flex gap-3">
                <Input
                  id="userId"
                  placeholder="아이디 입력"
                  width="sm"
                  {...register("userId")}
                  onChange={(e) => {
                    register("userId").onChange(e);
                    setUserIdSuccessMessage("");
                    setIsUserIdChecked(false);
                  }}
                />
                <Button type="button" onClick={handleCheckUserId}>
                  중복확인
                </Button>
              </div>
              {errors.userId && (
                <p className="text-xs text-purple-600">
                  {errors.userId.message}
                </p>
              )}
              {userIdSuccessMessage && (
                <p className="text-xs text-purple-950">
                  {userIdSuccessMessage}
                </p>
              )}
            </div>

            {/* 비밀번호 */}
            <div className="flex flex-col gap-3">
              <label htmlFor="password" className="text-text-base font-bold">
                비밀번호
              </label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호 입력"
                width="full"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-purple-600">
                  {errors.password.message}
                </p>
              )}
              <Input
                id="passwordConfirm"
                type="password"
                placeholder="비밀번호 확인"
                width="full"
                {...register("passwordConfirm")}
                onChange={(e) => {
                  register("passwordConfirm").onChange(e);
                  checkPasswordMatch(e);
                }}
              />
              {passwordMismatch && (
                <p className="text-xs text-purple-600">
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
            </div>

            {/* 이메일 */}
            <div className="flex flex-col gap-1">
              <label htmlFor="emailId" className="text-text-base font-bold">
                이메일
              </label>
              <div className="flex gap-3 items-center">
                <Input
                  id="emailId"
                  placeholder="이메일 아이디"
                  width="full"
                  {...register("email")}
                />

                <p className="text-text-base">@</p>
                <DomainSelect
                  value={emailDomain}
                  onChange={(value) => {
                    setEmailDomain(value);
                    setValue("emailDomain", value);
                  }}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-purple-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* 휴대폰번호 */}
            <div className="flex flex-col gap-1">
              <label htmlFor="mobile" className="text-text-base font-bold">
                휴대폰번호
              </label>
              <Input
                id="mobile"
                placeholder="숫자만 입력"
                width="full"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <p className="text-xs text-purple-600">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* 약관 동의 */}
            <div className="flex gap-1 text-sm text-[#333] mt-4 mb-4 pl-1">
              <Checkbox
                type="circle"
                checked={isTermsChecked}
                onChange={setIsTermsChecked}
              />
              <p className="text-xs text-text-base md:text-sm">
                이용약관 및 개인정보처리방침 동의
              </p>
            </div>

            <div className="px-3">
              <Button
                size="full"
                type="submit"
                disabled={!isTermsChecked || !isValid || isSubmitting}
              >
                {isSubmitting ? "가입 중..." : "가입하기"}
              </Button>
            </div>
          </form>
        </article>
      </main>
    </>
  );
}
