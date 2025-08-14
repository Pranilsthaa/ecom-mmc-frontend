import { useClickOutside } from "@/hooks/ui/useClickOutside";
import { useGlobalModalStore } from "@/stores/useGlobalModalStore";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = () => {
  const { isOpen, closeModal, content } = useGlobalModalStore();
  const modalRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useClickOutside(modalRef, () => closeModal(), isOpen);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, translateY: 50 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, translateY: 50 }}
            transition={{ duration: 0.2, ease: "easeIn" }}
            ref={modalRef}
            className="bg-[var(--color-background)] rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.3),0_0_12px_rgba(100,150,255,0.2)] relative max-w-md w-full max-h-[80vh] overflow-hidden"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[var(--color-secondary)] hover:text-[var(--color-foreground)] bg-[var(--color-muted)] hover:bg-[var(--color-border)] rounded-full transition-all duration-200 z-10"
            >
              ✕
            </button>
            {/* we can add modal content here */}
            {content}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
