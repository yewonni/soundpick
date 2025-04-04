import { MusicCardDataProps } from "../types/MusicCard";

interface MusicCardProps extends MusicCardDataProps {
  isPlaylist?: boolean;
}

export default function MusicCard({
  imageSrc,
  title,
  subTitle,
  isPlaylist = false,
}: MusicCardProps) {
  return (
    <div className="flex flex-col gap-1">
      <img
        src={imageSrc}
        alt={title}
        className="w-[123px] h-[123px] md:w-full md:h-60 object-cover mb-1 cursor-pointer md:rounded-md transition-transform duration-200 ease-in-out hover:scale-105"
      />
      <h4
        className={`font-medium pl-1 text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer ${
          isPlaylist ? "text-sm md:text-lg" : "text-lg font-bold "
        }`}
        style={{
          whiteSpace: isPlaylist ? "normal" : "nowrap",
        }}
      >
        {title}
      </h4>
      {subTitle && (
        <p className="text-sm text-secondary pl-1 text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer">
          {subTitle}
        </p>
      )}
    </div>
  );
}
