import Modal from "./Modal";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const navigate = useNavigate();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-1 items-center">
        {" "}
        <h2 className="font-semibold">로그인이 필요한 서비스입니다.</h2>
        <p>로그인 하시겠습니까?</p>
        <div className="flex justify-center gap-4 mt-2">
          <Button default onClick={onClose}>
            아니오
          </Button>
          <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            예
          </Button>
        </div>
      </div>
    </Modal>
  );
}
