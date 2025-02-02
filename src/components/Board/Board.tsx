import { useRef, useState, useEffect } from 'react';

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
            clientWidth - 140,
            clientHeight - 140
        );
        const newNote: Note = {
            id: notes.length + 1,
            text: '',
            leftCornerCoords: leftCornerCoords,
        };
        setNotes((prevNotes) => [...prevNotes, newNote]);
    };

    const moveNoteHandler = (noteId: number, leftCornerCoords: Coords) => {
        setNotes((oldNotes) => {
            const newNotes = [...oldNotes];
            const note = newNotes.find(({ id }) => noteId === id);
            if (note) {
                note.leftCornerCoords = leftCornerCoords;
            }
            return newNotes;
        });
    };

    const updateNoteHandler = (noteId: number, text: string) => {
        setNotes((oldNotes) => {
            const newNotes = [...oldNotes];
            const note = newNotes.find(({ id }) => noteId === id);
            if (note) {
                note.text = text;
            }
            return newNotes;
        });
    };

    const deleteNoteHandler = (noteId: number) => {
        setNotes((oldNotes) => oldNotes.filter(({ id }) => noteId !== id));
    };

    return (
        <div
            className={styles.board}
            ref={boardRef}
            onDragOver={(e) => e.preventDefault()}
        >
            <div
                className={styles.bin}
                onDrop={(e) => {
                    const noteId = +e.dataTransfer.getData('noteId');
                    deleteNoteHandler(noteId);
                }}
            >
                B
            </div>
            <button
                type='button'
                className={styles.addButton}
                onClick={addNoteHandler}
            >
                +
            </button>
            {notes.map((note) => (
                <NoteComponent
                    {...note}
                    key={note.id}
                    onMoveNote={moveNoteHandler}
                    onTextChange={updateNoteHandler}
                />
            ))}
        </div>
    );
};

export default Board;
