import { useState } from 'react';

import { LuPlus } from 'react-icons/lu';
import { AiOutlineClear } from 'react-icons/ai';
import { Trash } from './Trash';
import { Modal } from '../Modal';
import { useStore } from '../../store';

import styles from './menu.module.css';

const Menu = () => {
    const addNote = useStore((state) => state.addNote);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className={styles.menu}>
                <div className={styles.buttonList}>
                    <LuPlus
                        className={styles.plusIcon}
                        size={40}
                        onClick={addNote}
                    />
                    <AiOutlineClear
                        className={styles.clearIcon}
                        size={40}
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>
                <Trash />
            </div>
            <Modal setIsOpen={setIsModalOpen} isOpen={isModalOpen} />
        </>
    );
};

export default Menu;
