import { useRef, useState, useEffect } from 'react';

import { Menu } from '../Menu';
import { Board } from '../Board';
import { Note } from '../../model/note.model';
import { Coords } from '../../model/coords.model';
import { drawCoords } from '../../utils/drawCoords';
import {
    setLocalStorageItem,
    getLocalStorageItem,
} from '../../utils/localStorage';
import styles from './interface.module.css';

const Interface = () => {
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
        console.log(clientHeight);
        const leftCornerCoords = drawCoords(
            window.innerWidth - clientWidth,
            clientWidth - 160,
            clientHeight - 160
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
        setNotes((oldNotes) => {
            return oldNotes.filter(({ id }) => noteId !== id);
        });
    };

    const deleteNotesHandler = () => {
        setNotes([]);
    };

    return (
        <div className={styles.interface}>
            <Menu
                onAddNote={addNoteHandler}
                onDeleteNote={deleteNoteHandler}
                onDeleteNotes={deleteNotesHandler}
            />
            <Board
                ref={boardRef}
                notes={notes}
                onMoveNote={moveNoteHandler}
                onUpdateNote={updateNoteHandler}
            />
        </div>
    );
};

export default Interface;
