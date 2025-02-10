import { useRef, useEffect, KeyboardEvent } from 'react';

import styles from './modal.module.css';

interface ModalProps {
    setIsOpen: (value: boolean) => void;
    onOk: () => void;
    isOpen: boolean;
}

const Modal = ({ setIsOpen, onOk, isOpen }: ModalProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isOpen]);

    const onClose = () => setIsOpen(false);

    const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    const onDelete = () => {
        onOk();
        onClose();
    };

    return (
        <dialog className={styles.dialog} ref={dialogRef} onKeyDown={onKeyDown}>
            <div className={styles.content}>
                <header>
                    <h2 className={styles.h2}>Delete tasks</h2>
                </header>
                <main>Are you sure, you want to clear the board?</main>
                <footer className={styles.footer}>
                    <button
                        className={styles.button}
                        type='button'
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className={`${styles.button} ${styles.deleteButton}`}
                        type='button'
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </footer>
            </div>
        </dialog>
    );
};

export default Modal;
