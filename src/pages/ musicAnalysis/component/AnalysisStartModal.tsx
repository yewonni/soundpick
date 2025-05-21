import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

interface AnalysisStartModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function AnalysisStartModal({
  isOpen,
  onClose,
}: AnalysisStartModalProps) {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-1 items-center">
        <h2>음악 취향 분석을 시작하시겠습니까?</h2>
        <div className="flex gap-2 mt-3">
          <Button default onClick={onClose}>
            아니오
          </Button>
          <Button onClick={() => navigate("music-analysis")}>예</Button>
        </div>
      </div>
    </Modal>
  );
}
