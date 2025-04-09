import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import Input from "../../components/Input";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
// import BackgroundWrapper from "../../components/BackgroundWrapper";

export default function Join() {
  const navigate = useNavigate();
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  return (
    // <BackgroundWrapper>
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
        <form className="w-[295px] md:w-[400px] rounded-lg bg-white bg-opacity-20 p-[25px] md:p-[35px] flex flex-col gap-4 text-sm">
          {/* 닉네임 */}
          <div className="flex flex-col gap-1">
            <label htmlFor="nickName" className="text-text-base font-bold">
              닉네임
            </label>
            <div className="flex gap-3">
              <Input
                id="nickName"
                name="nickName"
                width="sm"
                placeholder="닉네임 입력"
              />
              <Button>중복확인</Button>
            </div>
          </div>

          {/* 아이디 */}
          <div className="flex flex-col gap-1">
            <label htmlFor="userId" className="text-text-base font-bold">
              아이디
            </label>
            <div className="flex gap-3">
              <Input
                id="userId"
                name="userId"
                width="sm"
                placeholder="아이디 입력"
              />
              <Button>중복확인</Button>
            </div>
            <p className="text-xs text-purple-600 pl-1">
              4~12자 / 영문 소문자 (숫자 조합 가능)
            </p>
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-3">
            <label htmlFor="pw" className="text-text-base font-bold">
              비밀번호
            </label>

            <Input
              id="pw"
              name="password"
              width="full"
              placeholder="비밀번호 입력"
            />
            <Input
              id="pwConfirm"
              name="passwordConfirm"
              width="full"
              placeholder="비밀번호 확인"
            />
            <p className="text-xs text-purple-600 pl-1">
              6~20자 / 영문 대소문자, 숫자, 특수문자 중 2가지 이상 조합
            </p>
          </div>

          {/* 이메일 */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-text-base font-bold">
              이메일
            </label>
            <div className="flex gap-3 items-center">
              <Input
                id="emailId"
                name="emailId"
                width="full"
                placeholder="이메일 아이디"
              />
              <p className="text-text-base">@</p>
              <Input
                id="emailDomain"
                name="emailDomain"
                width="full"
                placeholder="이메일 도메인"
              />
            </div>
          </div>

          {/* 휴대폰번호 */}
          <div className="flex flex-col gap-1">
            <label htmlFor="mobile" className="text-text-base font-bold">
              휴대폰번호
            </label>
            <Input
              id="mobile"
              name="mobile"
              width="full"
              placeholder="숫자만 입력"
            />
          </div>
        </form>

        {/* 체크박스 */}
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

        {/* 가입하기 버튼 */}
        <div className="px-3">
          <Button size="full" onClick={() => navigate("/join/success")}>
            가입하기
          </Button>
        </div>
      </article>
    </main>
    // </BackgroundWrapper>
  );
}
