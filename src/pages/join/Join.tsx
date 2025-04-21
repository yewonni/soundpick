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
import { joinSchema } from "../../utils/validation";
import DomainSelect from "./component/DomainSelect";
import { encryptWithRSAFromServer } from "../../utils/crypto";

export default function Join() {
  const navigate = useNavigate();
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [emailDomain, setEmailDomain] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [isUserIdChecked, setIsUserIdChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
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
    const userId = (document.getElementById("userId") as HTMLInputElement)
      ?.value;

    if (!userId) {
      alert("아이디를 입력해주세요.");
      return;
    }

    try {
      const response = await checkUserId(userId);
      if (response.data.data.duplicate) {
        alert("이미 사용 중인 아이디입니다.");
        setIsUserIdChecked(false);
      } else {
        alert("사용 가능한 아이디입니다.");
        setIsUserIdChecked(true);
      }
    } catch (err) {
      console.error("아이디 중복확인 오류", err);
      alert("아이디 중복확인 중 오류가 발생했습니다.");
    }
  };

  // 닉네임 중복확인
  const handleCheckNickname = async () => {
    const nickname = (document.getElementById("nickName") as HTMLInputElement)
      ?.value;

    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const response = await checkNickname(nickname);
      if (response.data.data.duplicate) {
        alert("이미 사용 중인 닉네임입니다.");
        setIsNicknameChecked(false);
      } else {
        alert("사용 가능한 닉네임입니다.");
        setIsNicknameChecked(true);
      }
    } catch (err) {
      console.error("닉네임 중복확인 오류", err);
      alert("닉네임 중복확인 중 오류가 발생했습니다.");
    }
  };

  const handleJoinSubmit = async (data: JoinFormDataType) => {
    if (!isTermsChecked) {
      alert("이용약관에 동의해주세요.");
      return;
    }
    if (!isUserIdChecked || !isNicknameChecked) {
      alert("중복확인을 완료해주세요.");
      return;
    }

    try {
      const fullEmail = `${data.email}@${data.emailDomain}`;

      const { encrypted: encryptedPassword, rsaSeq } =
        await encryptWithRSAFromServer(data.password);

      if (!encryptedPassword) {
        alert("비밀번호 암호화에 실패했습니다. 다시 시도해주세요.");
        return;
      }

      if (!rsaSeq) {
        alert("RSA 시퀀스 번호를 가져오는데 실패했습니다.");
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

      const response = await signUp(requestData);
      console.log("회원가입 성공", response.data);
      navigate("/join-success");
    } catch (error: any) {
      console.error("회원가입 에러:", error);

      if (error.response) {
        console.error("서버 응답:", error.response.data);
        alert(
          `회원가입 실패: ${
            error.response.data.message || "서버 오류가 발생했습니다."
          }`
        );
      } else if (error.request) {
        alert("서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.");
      } else {
        alert(
          `회원가입 실패: ${error.message || "알 수 없는 오류가 발생했습니다."}`
        );
      }
    }
  };

  return (
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
              />
              <Button type="button" onClick={handleCheckUserId}>
                중복확인
              </Button>
            </div>
            {errors.userId && (
              <p className="text-xs text-purple-600">{errors.userId.message}</p>
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
                register("passwordConfirm").onChange(e); // 기존 register 동작 유지
                checkPasswordMatch(e); // 추가 검증
              }}
            />
            {errors.passwordConfirm && (
              <p className="text-xs text-purple-600">
                {errors.passwordConfirm.message}
              </p>
            )}
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
                onChange={(e) => setValue("email", e.target.value)} // 직접 react-hook-form에 반영
              />

              <p className="text-text-base">@</p>
              <DomainSelect
                value={emailDomain}
                onChange={(value) => {
                  setEmailDomain(value); // 도메인 선택 시 상태 업데이트
                  setValue("emailDomain", value); // 폼 상태 업데이트
                }}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-purple-600">{errors.email.message}</p>
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
              disabled={!isTermsChecked || !isValid} // 버튼 비활성화 조건
            >
              가입하기
            </Button>
          </div>
        </form>
      </article>
    </main>
  );
}
