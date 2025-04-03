import closeBtn from "../../../images/close-btn.svg";

interface PlaylistModalProps {
  onClose: () => void;
}

export default function PlaylistModal({ onClose }: PlaylistModalProps) {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        className="w-[260px] bg-white rounded-lg shadow-lg p-5 flex flex-col gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-primary">
            내 플레이리스트에 추가
          </h2>
          <button onClick={onClose}>
            <img src={closeBtn} alt="닫기" className="w-5 h-5 cursor-pointer" />
          </button>
        </div>

        <div className="flex flex-col gap-2 text-xs text-gray-700">
          <p className="px-3 py-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200">
            드라이브 필수 곡
          </p>
          <p className="px-3 py-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200">
            운동할 때 듣는 노동요
          </p>
          <p className="px-3 py-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200">
            코딩하면서 들으면 시간 순삭 플리
          </p>
        </div>
      </div>
    </div>
  );
}
