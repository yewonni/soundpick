import {
  TrackStateItem,
  ArtistStateItem,
} from "../../../types/recommendationType";
import catImg from "../../../images/music-cat-full.png";
import minus from "../../../images/minus-icon.svg";

interface RecommendationItemProps {
  item: TrackStateItem | ArtistStateItem;
  isTrackStep: boolean;
  onDelete: (item: any) => void;
}

export default function RecommendationItem({
  item,
  isTrackStep,
  onDelete,
}: RecommendationItemProps) {
  return (
    <article className="flex justify-between items-center mb-4">
      <div className="flex gap-4 items-center">
        <img
          src={item.imageList?.[0]?.url || catImg}
          alt={item.name}
          className="w-[60px] h-[60px] rounded-sm md:w-[80px] md:h-[80px]"
        />
        <div className="flex flex-col gap-1 max-w-[200px] md:max-w-[500px]">
          <h2 className="font-bold text-xs md:text-sm truncate">{item.name}</h2>
          {isTrackStep && (
            <p className="text-[#333] text-xs truncate">
              {(item as TrackStateItem).trackArtists
                ?.map((a) => a.name)
                .join(", ")}
            </p>
          )}
          {!isTrackStep && <p className="text-[#333] text-xs">추천 아티스트</p>}
        </div>
      </div>
      <img
        onClick={() => onDelete(item)}
        src={minus}
        alt="제거하기"
        className="cursor-pointer"
      />
    </article>
  );
}
