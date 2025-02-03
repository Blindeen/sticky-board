import { LuPlus } from 'react-icons/lu';
import { AiOutlineClear } from 'react-icons/ai';
import { Trash } from '../Trash';

import styles from './menu.module.css';

interface MenuProps {
    onAddNote: () => void;
    onDeleteNote: (id: number) => void;
    onDeleteNotes: () => void;
}

const Menu = ({ onAddNote, onDeleteNote, onDeleteNotes }: MenuProps) => {
    return (
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
                    onClick={onDeleteNotes}
                />
            </div>
            <Trash onDeleteNote={onDeleteNote} />
        </div>
    );
};

export default Menu;
