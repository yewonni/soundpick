import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface TasteAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function TasteAnalysisModal({
  isOpen,
  onClose,
}: TasteAnalysisModalProps) {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-1 items-center">
        <p className="font-bold">지금, 음악 취향을 분석해보세요!</p>
        <p className="text-[#333] text-sm mb-2 text-center">
          분석을 완료하면 나만의 음악 추천을 받을 수 있어요.
        </p>
        <p className="text-primary font-bold">바로 시작해볼까요?</p>
        <div className="flex gap-2 mt-3">
          <Button default onClick={onClose}>
            괜찮아요
          </Button>
          <Button onClick={() => navigate("/music-analysis")}>시작하기</Button>
        </div>
      </div>
    </Modal>
  );
}
