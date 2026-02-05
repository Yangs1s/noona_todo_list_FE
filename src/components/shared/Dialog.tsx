import { createPortal } from "react-dom";

export default function Dialog({ children }: { children: React.ReactNode }) {
  const portalElement = document.getElementById("modal-root");

  if (!portalElement) {
    return null;
  }
  return createPortal(
    <>
      <div className="fixed inset-0 bg-black opacity-10 left-0 top-0 w-full h-full flex justify-center items-center z-50" />
      <div className="fixed inset-0 flex justify-center items-center z-50">
        {children}
      </div>
    </>,
    portalElement
  );
}
