import { useRef, useState, useEffect, DragEvent } from 'react';

import { Note as NoteComponent } from '../Note';
import { Note } from '../../model/note.model';
import { Coords } from '../../model/coords.model';

import { drawCoords } from '../../utils/drawCoords';
import {
    setLocalStorageItem,
    getLocalStorageItem,
} from '../../utils/localStorage';

import styles from './board.module.css';

const Board = () => {
    const boardRef = useRef<HTMLDivElement>(null);
    const [notes, setNotes] = useState<Note[]>(() => {
        const notesJSON = getLocalStorageItem('notes');
        if (!notesJSON) {
            return [];
        }
        return JSON.parse(notesJSON);
    });

    useEffect(() => {
        setLocalStorageItem('notes', JSON.stringify(notes));
    }, [notes]);

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

    const moveNoteHandler = (noteId: number, leftCornerCoords: Coords) => {
        setNotes((prevNotes) => {
            const newNotes = [...prevNotes];
            const note = newNotes.find(({ id }) => noteId === id);
            if (note) {
                note.leftCornerCoords = leftCornerCoords;
            }
            return newNotes;
        });
    };

    const updateNoteHandler = (noteId: number, text: string) => {
        setNotes((prevNotes) => {
            const newNotes = [...prevNotes];
            const note = newNotes.find(({ id }) => noteId === id);
            if (note) {
                note.text = text;
            }
            return newNotes;
        });
    };

    const dragOverBoardHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div
            className={styles.board}
            ref={boardRef}
            onDragOver={dragOverBoardHandler}
        >
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
                    id={id}
                    text={text}
                    leftCornerCoords={leftCornerCoords}
                    onMoveNote={moveNoteHandler}
                    onTextChange={updateNoteHandler}
                />
            ))}
        </div>
    );
};

export default Board;
