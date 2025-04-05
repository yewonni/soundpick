import { MusicCardDataProps } from "../types/MusicCard";

interface MusicCardProps extends MusicCardDataProps {
  isPlaylist?: boolean;
  isFeatured?: boolean;
  isHovered?: boolean;
}

export default function MusicCard({
  imageSrc,
  title,
  subTitle,
  isPlaylist = false,
  isFeatured = false,
  isHovered = false,
}: MusicCardProps) {
  return (
    <div className="flex flex-col gap-1 group">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={imageSrc}
          alt={title}
          className={`w-[123px] h-[123px] md:w-full ${
            isFeatured ? "md:h-72" : "md:h-48"
          } object-cover mb-1 cursor-pointer md:rounded-lg transition-all duration-300 ease-in-out ${
            isHovered ? "md:brightness-90 md:shadow-lg" : ""
          }`}
        />
      </div>

      <h4
        className={`font-medium pl-1 text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer transition-colors duration-300 ${
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
          className={`text-sm text-stone-400 pl-1 text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer transition-colors duration-300`}
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
