import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

interface LikePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function LikePlaylistModal({
  isOpen,
  onClose,
}: LikePlaylistModalProps) {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-1 items-center">
        <p className="font-bold">플레이리스트 저장 완료!</p>
        <p className="text-[#333] text-xs md:text-sm mb-2">
          마이페이지에서 찾아 들을 수 있어요 🎧
        </p>
        <div className="flex gap-2 mt-3">
          <Button default onClick={onClose}>
            닫기
          </Button>
          <Button onClick={() => navigate("/mypage")}>이동하기</Button>
        </div>
      </div>
    </Modal>
  );
}
