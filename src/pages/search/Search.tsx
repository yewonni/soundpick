import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import SearchBar from "../../components/SearchBar";
import { useSearchInput } from "../../context/SearchContext";
export default function Search() {
  const navigate = useNavigate();
  const { inputValue, setInputValue } = useSearchInput();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (!inputValue.trim()) return;
    navigate(`/search-result?q=${encodeURIComponent(inputValue)}`);
  };
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
      <div className="p-4 flex justify-center">
        <SearchBar
          onSubmit={handleSearch}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="음악, 플레이리스트명으로 검색하기"
        />
      </div>
      <main className="min-h-[300px] flex justify-center items-center">
        <article>
          <p className="text-primary text-sm animate-pulse">
            지금 듣고 싶은 음악을 검색해보세요!
          </p>
        </article>
      </main>
    </>
  );
}
