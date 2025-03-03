import { useState, useEffect } from 'react';

import { Menu } from '../Menu';
import { Board } from '../Board';
import { Note } from '../../model/note.model';
import { Coords } from '../../model/coords.model';
import {
    setLocalStorageItem,
    getLocalStorageItem,
} from '../../utils/localStorage';
import { NoteData } from '../../model/note-data.model';
import styles from './interface.module.css';

const Interface = () => {
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
        const newNote: Note = {
            id: Date.now(),
            title: '',
            description: '',
            leftCornerCoords: { x: 5, y: 5 },
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

    const updateNoteHandler = (noteId: number, data: NoteData) => {
        setNotes((oldNotes) => {
            const newNotes = [...oldNotes];
            const note = newNotes.find(({ id }) => noteId === id);
            if (note) {
                note.title = data.title;
                note.description = data.description;
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
                notes={notes}
                onMoveNote={moveNoteHandler}
                onUpdateNote={updateNoteHandler}
            />
        </div>
    );
};

export default Interface;
