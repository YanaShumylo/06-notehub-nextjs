import { useEffect } from "react";
import ReactDOM from "react-dom";
import css from "./Modal.module.css";

interface ModalProps{
  onClose: () => void;
  children: React.ReactNode;
  }

export default function NoteModal({onClose, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    document.body.style.overflow = "hidden";

     window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
    return ReactDOM.createPortal(
      <div
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
        onClick={handleBackdropClick}
      >
        <div className={css.modal}>
            {children}
        </div>
      </div>,
      document.body
    );
  }