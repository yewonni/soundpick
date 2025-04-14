import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

interface AnalysisExitModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function AnalysisExitModal({
  isOpen,
  onClose,
}: AnalysisExitModalProps) {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-1 items-center">
        <p className="font-bold">현재 진행 중인 취향 분석이 취소됩니다.</p>
        <p className="text-[#333] text-sm mb-2">
          진행 중인 분석 데이터는 모두 손실됩니다.
        </p>
        <p>홈으로 이동하여 분석을 종료하시겠습니까?</p>
        <div className="flex gap-2 mt-3">
          <Button default onClick={() => navigate("/")}>
            이동하기
          </Button>
          <Button onClick={onClose}>계속 분석</Button>
        </div>
      </div>
    </Modal>
  );
}
