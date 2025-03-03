import { DragEvent } from 'react';

import { Note } from '../../model/note.model';
import { Coords } from '../../model/coords.model';
import { Note as NoteComponent } from '../Note';
import { NoteData } from '../../model/note-data.model';
import styles from './board.module.css';

interface BoardProps {
    notes: Note[];
    onMoveNote: (id: number, leftCornerCoords: Coords) => void;
    onUpdateNote: (id: number, data: NoteData) => void;
}

const Board = ({ notes, onMoveNote, onUpdateNote }: BoardProps) => {
    const onDropHandler = (e: DragEvent<HTMLDivElement>) => {
        const noteId = e.dataTransfer.getData('noteId');
        if (noteId) {
            const mouseOffset: Coords = JSON.parse(
                e.dataTransfer.getData('mouseOffset')
            );
            const newLeftCornerCoords = {
                x: e.clientX - mouseOffset.x,
                y: e.clientY - mouseOffset.y,
            };
            onMoveNote(+noteId, newLeftCornerCoords);
        }
    };

    return (
        <div
            className={styles.board}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDrop={onDropHandler}
        >
            {notes.map((note) => (
                <NoteComponent
                    {...note}
                    key={note.id}
                    onContentChange={onUpdateNote}
                />
            ))}
        </div>
    );
};

export default Board;
