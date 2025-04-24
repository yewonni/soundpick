import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import SearchBar from "../../components/SearchBar";
import sample from "../../images/sample.png";
import { MusicCardDataProps } from "../../types/MusicCard";

const topSearchList: MusicCardDataProps[] = [
  { imageSrc: sample, title: "Blinding Lights", subTitle: "The Weekend" },
  { imageSrc: sample, title: "pov", subTitle: "Ariana Grande" },
  { imageSrc: sample, title: "Bad Guy", subTitle: "Billie Eilish" },
  { imageSrc: sample, title: "Perfect", subTitle: "Ed Sheeran" },
  { imageSrc: sample, title: "22", subTitle: "Taylor Swift" },
  {
    imageSrc: sample,
    title: "I don’t think that I like her",
    subTitle: "Charlie Puth",
  },
];

export default function Search() {
  const navigate = useNavigate();

  return (
    <>
      <header className="flex justify-center items-center px-4 py-2 h-[70px]  ">
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
      <main className="w-full min-h-screen p-4 pt-5">
        {topSearchList.map((item, index) => (
          <article
            key={index}
            className="flex justify-between items-center mb-4"
          >
            <div className="flex gap-4 items-center">
              <img
                src={item.imageSrc}
                alt={item.title}
                className="w-[60px] h-[60px] rounded-sm"
              />
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-sm text-text-base">
                  {item.title}
                </h2>
                {item.subTitle && (
                  <p className="text-text-base text-xs">{item.subTitle}</p>
                )}
              </div>
            </div>
          </article>
        ))}
      </main>
    </>
  );
}
