import prevIcon from "../../images/chevron-left.svg";
import { useNavigate } from "react-router-dom";
import sample from "../../images/sample.png";
import starOff from "../../images/star-off.svg";
import Button from "../../components/Button";

const mockData = [
  {
    imageUrl: sample,
    title: "쇠맛나는 k-pop 플리 모음집",
    subTitle: "굳은 총잡이",
    comment:
      "지치고 힘들 때마다 이 플리를 들으면 자신감이 생겨요! 좋은 기운 얻고 갑니다~~",
  },
  {
    imageUrl: sample,
    title: "새벽감성이 찾아올 때",
    subTitle: "요를레이후",
    comment: "잠이 안 올 때마다 듣는 저의 자장가 같은 플리예요!",
  },
];

export default function MyReview() {
  const navigate = useNavigate();
  return (
    <>
      <header className="p-4 bg-bg-sub flex justify-center items-center relative md:px-[20%]">
        <img
          src={prevIcon}
          alt="이전으로 가기"
          className="cursor-pointer absolute left-4 md:left-[20%]"
          onClick={() => navigate(-1)}
        />
        <h1 className="font-bold text-lg text-purple-900">내가 남긴 한 마디</h1>
      </header>
      <main className="w-full min-h-screen bg-[#f5f6ff] p-4 md:px-[20%]">
        <p className="font-bold text-purple-600 py-1  border-b border-b-gray-300 ">
          총 2개
        </p>
        {mockData.map((data, index) => (
          <section key={index} className="py-5 border-b border-b-gray-200">
            <h2 className="sr-only">리뷰 상세 내용</h2>
            <article className="flex gap-3">
              <img
                src={sample}
                alt=""
                className="w-[60px] h-[60px] rounded-sm"
              />
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-md">{data.title}</h3>
                <p className="text-[#333] text-sm">{data.subTitle}</p>
              </div>
            </article>
            <article>
              <div className="flex justify-between mt-1">
                <div className="flex gap-1 items-center">
                  {Array.from({ length: 5 }).map((_, index: number) => (
                    <img
                      key={index}
                      src={starOff}
                      alt="별점"
                      className="w-4 h-4"
                    />
                  ))}
                </div>
                <Button default size="sm">
                  삭제하기
                </Button>
              </div>
              <div className="bg-gray-200 w-full p-4 rounded-md mt-3 text-[#333] text-sm">
                {data.comment}
              </div>
            </article>
          </section>
        ))}
      </main>
    </>
  );
}
