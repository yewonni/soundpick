import { MusicCardDataProps } from "../../../types/MusicCard";
import { useNavigate } from "react-router-dom";

interface PlaylistResultProps {
  data: MusicCardDataProps[];
  isMobile: boolean;
}
export default function PlaylistResult({
  data,
  isMobile,
}: PlaylistResultProps) {
  const navigate = useNavigate();
  return (
    <>
      {!isMobile && (
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
          {data.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate("/playlist-details")}
              className="cursor-pointer flex flex-col bg-white shadow-sm hover:shadow-md transition-transform duration-300 transform hover:scale-105 rounded-lg overflow-hidden"
            >
              <img
                src={item.imageSrc}
                alt={item.title}
                className="w-full h-[180px] object-cover"
              />
              <div className="p-4">
                <h2 className="font-bold text-lg truncate">{item.title}</h2>
                <p className="text-secondary text-sm mt-1">{item.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {isMobile &&
        data.map((item, index) => (
          <article
            key={index}
            className="mb-4 cursor-pointer md:hidden px-2"
            onClick={() => navigate("/playlist-details")}
          >
            <div className="flex gap-4 items-start">
              <img
                src={item.imageSrc}
                alt={item.title}
                className="w-[100px] h-[100px] rounded-sm"
              />
              <div className="flex flex-col gap-3 pt-3">
                <h2 className="font-bold text-md text-text-base">
                  {item.title}
                </h2>
                {item.subTitle && (
                  <p className="text-secondary text-sm">{item.subTitle}</p>
                )}
              </div>
            </div>
          </article>
        ))}
    </>
  );
}
