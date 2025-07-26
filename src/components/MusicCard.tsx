import { MusicCardDataProps } from "../types/MusicCard";
import catImg from "../images/music-cat-full.png";

interface MusicCardProps extends MusicCardDataProps {
  isPlaylist?: boolean;
  isFeatured?: boolean;
  isHovered?: boolean;
  selected?: boolean;
  seq?: string;
  spotifyArtistId?: string;
  onClick?: () => void;
}

export default function MusicCard({
  imageSrc,
  title,
  subTitle,
  isPlaylist = false,
  isFeatured = false,
  isHovered = false,
  selected = false,
  seq,
  spotifyArtistId,
  onClick,
}: MusicCardProps) {
  return (
    <div
      className={`flex flex-col gap-1 group cursor-pointer`}
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = catImg;
          }}
          className={`w-[123px] h-[123px] md:w-full ${
            isFeatured ? "md:h-72" : "md:h-48"
          } object-cover mb-1 md:rounded-lg rounded-md transition-all duration-300 ease-in-out ${
            isHovered ? "md:brightness-90 md:shadow-lg" : ""
          }`}
        />
        {selected && (
          <div className="absolute top-1 right-1 bg-purple-300 text-white text-xs font-semibold px-2 py-1 rounded">
            Selected
          </div>
        )}
      </div>

      <h4
        className={`font-medium pl-1 text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer transition-colors duration-300 truncate ${
          isPlaylist
            ? "text-sm md:text-base text-stone-100"
            : `text-lg ${
                isFeatured ? "md:text-xl" : "md:text-base"
              } font-bold text-white`
        }`}
        style={{
          whiteSpace: isPlaylist ? "normal" : "nowrap",
          color: isHovered ? "#d2e9ff" : "",
        }}
      >
        {title}
      </h4>

      {subTitle && (
        <p
          className={`text-sm text-stone-400 pl-1 text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer transition-colors duration-300 truncate`}
          style={{
            color: isHovered ? "#a2bbff" : "",
          }}
        >
          {subTitle}
        </p>
      )}
    </div>
  );
}
