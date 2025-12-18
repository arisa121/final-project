const Modal = ({ isOpen, onClose, title, children, size = "max-w-2xl" }) => {
  if (!isOpen) return null;

  return (
    <dialog open className="modal" onClick={onClose}>
      <div className={`modal-box ${size}`} onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-2xl mb-6">{title}</h3>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
