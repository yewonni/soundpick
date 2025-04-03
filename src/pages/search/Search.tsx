import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import SearchBar from "../../components/SearchBar";
import sample from "../../images/sample.png";

type topSearchListItem = {
  imageUrl: string;
  title: string;
  subTitle?: string;
};

const topSearchList: topSearchListItem[] = [
  { imageUrl: sample, title: "Blinding Lights", subTitle: "The Weekend" },
  { imageUrl: sample, title: "pov", subTitle: "Ariana Grande" },
  { imageUrl: sample, title: "Bad Guy", subTitle: "Billie Eilish" },
  { imageUrl: sample, title: "Perfect", subTitle: "Ed Sheeran" },
  { imageUrl: sample, title: "22", subTitle: "Taylor Swift" },
  {
    imageUrl: sample,
    title: "I don’t think that I like her",
    subTitle: "Charlie Puth",
  },
];

export default function Search() {
  const navigate = useNavigate();

  return (
    <>
      <header className="flex justify-center items-center px-4 py-2 h-[70px]  bg-bg-sub">
        <h1>
          <img
            src={logo}
            alt="로고"
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />
        </h1>
      </header>
      <div className="p-4">
        <SearchBar placeholder="아티스트, 음악, 플레이리스트 검색하기" />
      </div>
      <main className="bg-white w-full min-h-screen p-4 pt-5">
        {topSearchList.map((item, index) => (
          <article
            key={index}
            className="flex justify-between items-center mb-4"
          >
            <div className="flex gap-4 items-center">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-[60px] h-[60px] rounded-sm"
              />
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-sm">{item.title}</h2>
                {item.subTitle && (
                  <p className="text-secondary text-xs">{item.subTitle}</p>
                )}
              </div>
            </div>
          </article>
        ))}
      </main>
    </>
  );
}
