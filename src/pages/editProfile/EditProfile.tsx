import prevIcon from "../../images/chevron-left.svg";
import FinishButton from "../../components/FinishButton";
import { useNavigate } from "react-router-dom";
import sample from "../../images/sample.png";
import Button from "../../components/Button";
export default function EditProfile() {
  const navigate = useNavigate();
  return (
    <>
      <header className="p-4 bg-bg-sub flex justify-between md:justify-center md:relative md:px-[20%] items-center">
        <img
          src={prevIcon}
          alt="이전으로 가기"
          className="cursor-pointer md:absolute md:left-[20%]"
          onClick={() => navigate(-1)}
        />
        <h1 className="font-bold text-lg">프로필 수정</h1>
        <div className="md:hidden">
          <FinishButton onClick={() => navigate(-1)} />
        </div>
      </header>
      <main className="w-full min-h-screen bg-[#f5f6ff] p-4 md:px-[20%]">
        <div className="flex justify-center flex-col items-center mt-4">
          <img
            src={sample}
            alt=""
            className="w-[90px] h-[90px] rounded-[100px] md:w-[130px] md:h-[130px]"
          />
          <p className="font-bold text-sm mt-2 text-primary md:text-base">
            profile
          </p>
        </div>
        <div className="flex gap-3 items-center mb-2 mt-7  text-sm  md:text-base">
          <label
            htmlFor="nickName"
            className="font-bold text-primary  w-[50px] "
          >
            닉네임
          </label>
          <input
            id="nickName"
            name="nickName"
            type="text"
            placeholder="본인의 닉네임"
            className="focus:outline-none w-full border-b border-b-gray-200 p-2 rounded-md"
          />
        </div>
        <div className="flex gap-3 items-center  text-sm  md:text-base">
          <label
            htmlFor="profileInfo"
            className="font-bold text-primary  w-[50px]  "
          >
            소개글
          </label>
          <input
            id="profileInfo"
            name="profileInfo"
            placeholder="본인을 소개해주세요"
            type="text"
            className="focus:outline-none w-full border-b border-b-gray-200 p-2 rounded-md"
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button>저장하기</Button>
        </div>
      </main>
    </>
  );
}
