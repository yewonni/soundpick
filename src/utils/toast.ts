import { toast, ToastOptions } from "react-toastify";

const activeToastIds = new Set<string>();

export const showToast = (
  message: string,
  type: "error" | "success" = "error",
  options?: ToastOptions
) => {
  if (activeToastIds.has(message)) return;

  activeToastIds.add(message);

  const defaultOptions: ToastOptions = {
    onClose: () => {
      activeToastIds.delete(message);
    },
    ...options,
  };

  if (type === "error") {
    toast.error(message, defaultOptions);
  } else {
    toast.success(message, defaultOptions);
  }
};
