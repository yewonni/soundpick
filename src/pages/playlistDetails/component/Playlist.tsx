import sideMenu from "../../../images/side-menu.svg";
import { MusicCardDataProps } from "../../../types/MusicCard";

interface PlaylistProps {
  data: MusicCardDataProps[];
  isMobile: boolean;
  onClick: () => void;
  onClose: () => void;
}
export default function Playlist({
  data,
  isMobile,
  onClick,
  onClose,
}: PlaylistProps) {
  return (
    <>
      <section className="mt-2">
        <h2 className="sr-only">플레이리스트 목록</h2>
        {!isMobile && (
          <div className="hidden md:grid md:grid-cols-[40px_80px_1fr_1fr_40px] text-sm font-bold text-text-subtle py-3 border-b border-text-subtle mb-4">
            <div className="flex justify-center items-center"></div>
            <div className="flex items-center justify-center"></div>
            <div className="flex items-center px-2">곡</div>
            <div className="flex items-center px-2">아티스트</div>
            <div className="flex justify-center items-center">기타</div>
          </div>
        )}

        {/* 곡 리스트 */}
        {data.map((item, index) => (
          <article key={index} className="mb-4 cursor-pointer">
            {!isMobile && (
              <div className="hidden md:grid md:grid-cols-[40px_80px_1fr_1fr_40px] md:items-center py-2">
                <div className="flex justify-center items-center"></div>
                <div className="flex items-center justify-center">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-[60px] h-[60px] rounded-sm "
                  />
                </div>
                <div className="flex items-center px-2 font-bold text-text-base text-sm hover:underline">
                  {item.title}
                </div>
                <div className="flex items-center text-gray-100 px-2 text-sm">
                  {item.subTitle}
                </div>
                <div className="flex justify-center items-center">
                  <img
                    src={sideMenu}
                    alt="메뉴열기"
                    className="cursor-pointer"
                    onClick={onClick}
                  />
                </div>
              </div>
            )}

            {isMobile && (
              <div className="flex md:hidden justify-between items-center w-full  mt-3">
                <div className="flex items-center gap-5">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-[50px] h-[50px] rounded-sm"
                  />
                  <div className="flex flex-col gap-1">
                    <h2 className="font-bold text-sm text-text-base">
                      {item.title}
                    </h2>
                    {item.subTitle && (
                      <p className=" text-xs text-gray-100">{item.subTitle}</p>
                    )}
                  </div>
                </div>
                <img
                  src={sideMenu}
                  alt="메뉴열기"
                  className="cursor-pointer ml-2"
                  onClick={onClose}
                />
              </div>
            )}
          </article>
        ))}
      </section>
    </>
  );
}
