import { useRef, useState } from 'react';

import { Note as NoteComponent } from '../Note';
import { Note } from '../../model/note.model';
import { drawCoordinates } from '../../utils/drawCoordinates';
import styles from './board.module.css';

const Board = () => {
    const boardRef = useRef<HTMLDivElement>(null);
    const [notes, setNotes] = useState<Note[]>([]);

    const addNoteHandler = () => {
        const { clientHeight, clientWidth } = boardRef.current!;
        const leftCornerCoordinates = drawCoordinates(
            clientWidth - 114.6,
            clientHeight - 114.6
        );
        const newNote: Note = {
            id: notes.length + 1,
            text: '',
            leftCorner: leftCornerCoordinates,
        };
        setNotes((prevNotes) => [...prevNotes, newNote]);
    };

    return (
        <div className={styles.board} ref={boardRef}>
            <button
                type='button'
                className={styles.addButton}
                onClick={addNoteHandler}
            >
                +
            </button>
            <div className={styles.logo}>
                <span className={styles.logoText}>Sticky board</span>
                <span className={styles.logoNote}></span>
            </div>
            {notes.map(({ id, text, leftCorner }) => (
                <NoteComponent key={id} text={text} leftCorner={leftCorner} />
            ))}
        </div>
    );
};

export default Board;
