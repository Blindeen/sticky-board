import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Note } from './model/note.model';
import { NoteData } from './model/note-data.model';
import { Coords } from './model/coords.model';

interface State {
    notes: Note[];
}

interface Actions {
    addNote: () => void;
    updateNote: (id: number, data: NoteData) => void;
    moveNote: (id: number, coords: Coords) => void;
    deleteNote: (id: number) => void;
    deleteNotes: () => void;
}

const useStore = create<State & Actions>()(
    persist(
        (set) => ({
            notes: [],
            addNote: () => {
                const newNote: Note = {
                    id: Date.now(),
                    title: '',
                    description: '',
                    leftCornerCoords: { x: 5, y: 5 },
                };
                set((state) => ({ notes: [...state.notes, newNote] }));
            },
            updateNote: (id, data) => {
                set((state) => {
                    const newNotes = [...state.notes];
                    const note = newNotes.find((note) => note.id === id);
                    if (note) {
                        note.title = data.title;
                        note.description = data.description;
                    }
                    return { notes: newNotes };
                });
            },
            moveNote: (id, coords) => {
                set((state) => {
                    const newNotes = [...state.notes];
                    const note = newNotes.find((note) => note.id === id);
                    if (note) {
                        note.leftCornerCoords = coords;
                    }
                    return { notes: newNotes };
                });
            },
            deleteNote: (id) => {
                set((state) => {
                    const newNotes = state.notes.filter(
                        (note) => note.id !== id
                    );
                    return { notes: newNotes };
                });
            },
            deleteNotes: () => {
                set(() => ({ notes: [] }));
            },
        }),
        {
            name: 'notes-storage',
        }
    )
);

export { useStore };
