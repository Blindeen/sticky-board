import { useRef, useState } from 'react';

import { Note } from '../../model/note.model';
import styles from './board.module.css';

const Board = () => {
    const boardRef = useRef<HTMLDivElement>(null);
    const [notes, setNotes] = useState<Note[]>([]);

    const addNote = () => {
        console.log('Note added!');
    };

    return (
        <div className={styles.board} ref={boardRef}>
            <button
                type='button'
                className={styles.addButton}
                onClick={addNote}
            >
                +
            </button>
            <div className={styles.logo}>
                <span className={styles.logoText}>Sticky Board</span>
                <span className={styles.logoNote}></span>
            </div>
        </div>
    );
};

export default Board;
