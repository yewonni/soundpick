import { useNavigate } from "react-router-dom";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";

interface PreferenceCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function PreferenceCheckModal({
  isOpen,
  onClose,
}: PreferenceCheckModalProps) {
  const navigate = useNavigate();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-3 justify-center items-center">
        <h2 className="font-bold text-md md:text-lg">
          취향 분석을 나중에 하실 건가요?
        </h2>
        <p className="text-sm md:text-base">지금은 건너뛰어도 괜찮아요!</p>
        <p className="text-xs text-center md:text-sm">
          <span className="text-primary text-semibold">
            "마이페이지 &gt; 나의 활동 &gt; 음악 취향 로드맵"
          </span>
          에서 언제든지 취향 분석을 진행할 수 있어요.
        </p>
        <div className="flex gap-2 mt-2">
          <Button default onClick={() => navigate("/login")}>
            건너뛰기
          </Button>
          <Button onClick={() => navigate("/music-analysis")}>분석하기</Button>
        </div>
      </div>
    </Modal>
  );
}
