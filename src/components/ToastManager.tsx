import { Toast } from "@shopify/polaris";

interface ToastItem {
  id: string;
  message: string;
  status: "success" | "error" | "info";
}

interface Props {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

export default function ToastManager({ toasts, onRemove }: Props) {
  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          content={toast.message}
          error={toast.status === "error"}
          onDismiss={() => onRemove(toast.id)}
        />
      ))}
    </>
  );
}
