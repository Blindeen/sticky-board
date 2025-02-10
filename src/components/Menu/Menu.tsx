import { useState } from 'react';

import { LuPlus } from 'react-icons/lu';
import { AiOutlineClear } from 'react-icons/ai';
import { Trash } from '../Trash';
import { Modal } from '../Modal';

import styles from './menu.module.css';

interface MenuProps {
    onAddNote: () => void;
    onDeleteNote: (id: number) => void;
    onDeleteNotes: () => void;
}

const Menu = ({ onAddNote, onDeleteNote, onDeleteNotes }: MenuProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className={styles.menu}>
                <div className={styles.buttonList}>
                    <LuPlus
                        className={styles.plusIcon}
                        size={40}
                        onClick={onAddNote}
                    />
                    <AiOutlineClear
                        className={styles.clearIcon}
                        size={40}
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>
                <Trash onDeleteNote={onDeleteNote} />
            </div>
            <Modal
                setIsOpen={setIsModalOpen}
                onOk={onDeleteNotes}
                isOpen={isModalOpen}
            />
        </>
    );
};

export default Menu;
