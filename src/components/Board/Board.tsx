import { useRef, useState } from 'react';

import { Note as NoteComponent } from '../Note';
import { Note } from '../../model/note.model';
import { drawCoords } from '../../utils/drawCoords';
import styles from './board.module.css';

const Board = () => {
    const boardRef = useRef<HTMLDivElement>(null);
    const [notes, setNotes] = useState<Note[]>([]);

    const addNoteHandler = () => {
        const { clientHeight, clientWidth } = boardRef.current!;
        const leftCornerCoords = drawCoords(
            clientWidth - 114.6,
            clientHeight - 114.6
        );
        const newNote: Note = {
            id: notes.length + 1,
            text: '',
            leftCornerCoords: leftCornerCoords,
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
            {notes.map(({ id, text, leftCornerCoords }) => (
                <NoteComponent
                    key={id}
                    text={text}
                    leftCornerCoords={leftCornerCoords}
                />
            ))}
        </div>
    );
};

export default Board;
