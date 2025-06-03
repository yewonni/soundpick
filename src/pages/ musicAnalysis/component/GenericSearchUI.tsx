import backIcon from "../../../images/chevron-left.svg";
import catImg from "../../../images/music-cat-full.png";
import plus from "../../../images/plus-icon.svg";
import check from "../../../images/check-on.svg";
import SearchBar from "../../../components/SearchBar";

type Item = {
  imageSrc: string;
  title: string;
  subTitle?: string;
  seq?: string;
};

type Props = {
  title: string;
  items: Item[];
  selectedItems: string[];
  keyword: string;
  onKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onToggleSelect: (item: Item) => void;

  onBack: () => void;
  error?: string;
  isSearched: boolean;
  loading: boolean;
  maxCount?: number;
  currentCount?: number;
  canSelectMore?: boolean;
  itemType?: string;
};

export default function GenericSearchUI({
  title,
  items,
  selectedItems,
  keyword,
  onKeywordChange,
  onSearch,
  onToggleSelect,
  onBack,
  error,
  isSearched,
  loading,
  maxCount = 20,
  currentCount = 0,
  canSelectMore = true,
  itemType = "항목",
}: Props) {
  // 아이템 클릭 핸들러 수정
  const handleItemClick = (item: Item) => {
    const isSelected = selectedItems.includes(item.seq ?? "");

    // 선택 해제하는 경우는 항상 허용
    if (isSelected) {
      onToggleSelect(item);
      return;
    }

    onToggleSelect(item);
  };

  return (
    <>
      <header className="bg-bg-sub px-4 py-5 md:px-[20%] md:py-6 flex justify-between items-center">
        <div className="flex items-center gap-3 md:gap-8">
          <img
            src={backIcon}
            alt="이전으로 돌아가기"
            className="cursor-pointer md:w-6"
            onClick={onBack}
          />
          <p className="text-lg md:text-2xl font-bold">{title} 선택</p>
        </div>
        <div className="flex flex-col items-center">
          <span
            className={`text-sm px-3 py-1 rounded-full ${
              currentCount >= maxCount
                ? "bg-red-100 text-red-600"
                : "bg-bg-peach text-primary"
            }`}
          >
            {currentCount} / {maxCount}
            {itemType === "트랙" ? "곡" : "명"} 선택됨
          </span>
          {!canSelectMore && (
            <p className="text-text-base text-xs mt-1">최대 선택 개수 도달!</p>
          )}
        </div>
      </header>

      <main className="w-full min-h-screen md:flex md:px-[20%] md:py-6">
        <section className="w-full">
          <div className="p-4 md:p-0 flex justify-center w-full md:mb-10">
            <SearchBar
              onSubmit={onSearch}
              value={keyword}
              onChange={onKeywordChange}
              placeholder={`나만의 ${title}를 검색해보세요!`}
            />
          </div>

          <div className="space-y-2 md:mt-5 md:border md:border-bg-peach rounded-md md:p-3">
            {!loading && !error && (
              <>
                {!isSearched ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4 text-center text-text-base">
                    <img
                      src={catImg}
                      alt="음악 고양이"
                      className="w-[120px] md:w-[180px]"
                    />
                    <p className="text-base md:text-lg">
                      찾고 싶은 {title}
                      {itemType === "아티스트" ? "를" : "을"} 검색해보세요!
                    </p>

                    <p className="text-sm text-gray-100">
                      아티스트명이나 곡 제목을 영문으로 입력해보세요
                    </p>
                  </div>
                ) : items.length === 0 ? (
                  <p className="text-center text-gray-100 py-10">
                    검색 결과가 없습니다.
                  </p>
                ) : (
                  items.map((item) => (
                    <article
                      key={item.title}
                      onClick={() => handleItemClick(item)}
                      className="flex items-center justify-between px-4 py-2 md:py-5 rounded cursor-pointer"
                    >
                      <div className="flex gap-4 items-center">
                        <img
                          src={item.imageSrc || catImg}
                          alt={item.title || `${title} 이미지 없음`}
                          className="w-[50px] h-[50px] md:w-[100px] md:h-[100px] rounded-sm object-cover bg-gray-100"
                        />
                        <div className="flex flex-col gap-2 max-w-[180px] md:max-w-none">
                          <h2 className="font-bold text-sm md:text-base text-text-base truncate">
                            {item.title || `알 수 없음`}
                          </h2>
                          {item.subTitle && (
                            <p className="text-sm text-gray-200 truncate">
                              {Array.isArray(item.subTitle)
                                ? item.subTitle.join(", ")
                                : item.subTitle}
                            </p>
                          )}
                        </div>
                      </div>
                      <button>
                        <img
                          src={
                            selectedItems.includes(item.seq ?? "")
                              ? check
                              : plus
                          }
                          alt="추가하기"
                        />
                      </button>
                    </article>
                  ))
                )}
              </>
            )}
            {error && (
              <p className="text-gray-100 pt-3 md:px-[20%] px-4 text-center">
                {error}
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
