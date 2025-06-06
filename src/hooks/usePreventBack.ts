import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UsePreventBackOptions {
  redirectPath?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const usePreventBack = ({
  redirectPath = "/",
  message = "현재 페이지를 떠나시겠습니까?\n진행 중인 작업이 저장되지 않을 수 있습니다.",
  onConfirm,
  onCancel,
}: UsePreventBackOptions = {}) => {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    // 뒤로가기 방지를 위한 히스토리 조작
    const preventBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      setShowConfirmModal(true);
      preventBack(); // 일단 현재 페이지에 머물게 함
    };

    // 페이지 로드시 히스토리 조작
    preventBack();

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // 페이지를 떠날 때 확인 (새로고침, 탭 닫기 등)
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = message;
      return event.returnValue;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [message]);

  const handleConfirm = () => {
    setShowConfirmModal(false);
    onConfirm?.();
    navigate(redirectPath, { replace: true });
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
    onCancel?.();
  };

  return {
    showConfirmModal,
    handleConfirm,
    handleCancel,
    message,
  };
};
