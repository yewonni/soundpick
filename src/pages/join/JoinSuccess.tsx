import { useNavigate } from "react-router-dom";

export default function JoinSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white">
        <main className="flex flex-col justify-center items-center h-screen gap-4 md:gap-8 ">
          <h1 className="text-[24px] font-bold md:text-[30px] text-[#333]">
            가입을 축하드립니다!
          </h1>
          <p className="font-semibold md:text-xl text-[#333]">
            로그인하고, 나만의 음악 추천을 받아보세요 🌈
          </p>
          <div className="text-sm mt-5 md:text-lg  ">
            <button
              className="border border-purple-500 rounded-[20px] text-purple-500 font-semibold p-2 px-8  hover:font-bold hover:bg-purple-100 active:bg-text-subtle"
              onClick={() => navigate("/login")}
            >
              로그인하러 가기!
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
