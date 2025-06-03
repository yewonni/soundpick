import { useState, useEffect } from "react";
import sideMenu from "../../../images/side-menu.svg";
import Checkbox from "../../../components/Checkbox";
import catImg from "../../../images/music-cat-full.png";
import PlaylistModal from "./PlaylistModal";

export interface DataCardProps {
  imageSrc: string;
  title: string;
  subTitle: string;
  seq?: string;
  spotifyTrackId: string;
}

interface SongResultProps {
  data: DataCardProps[];
  isMobile: boolean;
}

export default function SongResult({ data, isMobile }: SongResultProps) {
  const [myTracks, setMyTracks] = useState<string[]>([]);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

  const handlePlaylistModalOpen = () => {
    if (myTracks.length === 0) {
      alert("선택된 트랙이 없습니다.");
      return;
    }
    setIsPlaylistModalOpen(true);
  };

  const handlePlaylistModalClose = () => {
    setIsPlaylistModalOpen(false);
  };

  const handleCheckboxChange = (trackId: string, checked: boolean) => {
    if (checked) {
      setMyTracks((prev) =>
        prev.includes(trackId) ? prev : [...prev, trackId]
      );
    } else {
      setMyTracks((prev) => prev.filter((id) => id !== trackId));
    }
  };

  return (
    <>
      <div className="flex gap-2 w-full border-b-2 border-b-gray-300 pb-3">
        <button className="ml-3 border border-text-subtle px-3 p-1 text-xs text-text-subtle font-semibold rounded-sm hover:bg-[#bfcBFF26] active:bg-[#bfcBFF4D] hover:border-[#BFCBFF] active:border-[#aab8f5] transition-colors duration-200">
          듣기
        </button>
        <button
          onClick={handlePlaylistModalOpen}
          className="border border-text-subtle px-3 p-1 text-xs text-text-subtle font-semibold rounded-sm hover:bg-[#bfcBFF26] active:bg-[#bfcBFF4D] hover:border-[#BFCBFF] active:border-[#aab8f5] transition-colors duration-200"
        >
          내 플리에 담기 ({myTracks.length})
        </button>
      </div>

      {!isMobile && (
        <div className="hidden md:grid md:grid-cols-[40px_80px_1fr_1fr_40px] text-sm font-bold text-text-base py-3 border-b border-gray-300 mb-4">
          <div className="flex justify-center items-center"></div>
          <div className="flex items-center justify-center"></div>
          <div className="flex items-center px-2">곡</div>
          <div className="flex items-center px-2">아티스트</div>
          <div className="flex justify-center items-center">기타</div>
        </div>
      )}

      {data.map((item, index) => (
        <article
          key={item.spotifyTrackId || index}
          className="mb-4 cursor-pointer"
        >
          {!isMobile && (
            <div className="hidden md:grid md:grid-cols-[40px_80px_1fr_1fr_40px] md:items-center py-2">
              <div className="flex justify-center items-center">
                <Checkbox
                  type="circle"
                  checked={myTracks.includes(item.spotifyTrackId)}
                  onChange={(isChecked) => {
                    handleCheckboxChange(item.spotifyTrackId, isChecked);
                  }}
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={item.imageSrc || catImg}
                  alt={item.title}
                  className="w-[60px] h-[60px] rounded-sm"
                />
              </div>
              <div className="flex items-center px-2 font-bold text-sm hover:underline text-[#333]">
                {item.title}
              </div>
              <div className="flex items-center px-2 text-[#333] text-sm">
                {item.subTitle}
              </div>
              <div className="flex justify-center items-center">
                <img
                  src={sideMenu}
                  alt="메뉴열기"
                  className="cursor-pointer"
                  onClick={handlePlaylistModalOpen}
                />
              </div>
            </div>
          )}

          {isMobile && (
            <div className="flex md:hidden justify-between items-center w-full px-3 mt-3">
              <div className="flex items-center gap-5">
                <Checkbox
                  type="circle"
                  checked={myTracks.includes(item.spotifyTrackId)}
                  onChange={(isChecked) => {
                    console.log(
                      `모바일 체크박스 클릭 - 트랙ID: ${item.spotifyTrackId}, 체크상태: ${isChecked}`
                    );
                    handleCheckboxChange(item.spotifyTrackId, isChecked);
                  }}
                />
                <img
                  src={item.imageSrc || catImg}
                  alt={item.title}
                  className="w-[50px] h-[50px] rounded-sm"
                />
                <div className="flex flex-col gap-1">
                  <h2 className="font-bold text-sm text-text-base">
                    {item.title}
                  </h2>
                  {item.subTitle && (
                    <p className="text-gray-100 text-xs">{item.subTitle}</p>
                  )}
                </div>
              </div>
              <img
                src={sideMenu}
                alt="메뉴열기"
                className="cursor-pointer ml-2"
                onClick={handlePlaylistModalOpen}
              />
            </div>
          )}
        </article>
      ))}
      {isPlaylistModalOpen && (
        <PlaylistModal
          onClose={handlePlaylistModalClose}
          selectedTrack={myTracks}
        />
      )}
    </>
  );
}
