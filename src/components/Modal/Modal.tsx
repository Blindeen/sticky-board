import styles from './modal.module.css';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

const Modal = ({ isOpen, setIsOpen }: ModalProps) => {
    const onClose = () => setIsOpen(false);

    return (
        <dialog className={styles.dialog} open={isOpen}>
            <header>
                <h2>Delete the task</h2>
            </header>
            <p>Are you sure, you want to delete the task?</p>
            <footer className={styles.footer}>
                <button type='button' onClick={onClose}>
                    Cancel
                </button>
                <button type='button' onClick={onClose}>
                    Delete
                </button>
            </footer>
        </dialog>
    );
};

export default Modal;
