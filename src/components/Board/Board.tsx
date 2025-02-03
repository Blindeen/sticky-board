import { forwardRef, DragEvent } from 'react';

import { Note } from '../../model/note.model';
import { Coords } from '../../model/coords.model';
import { Note as NoteComponent } from '../Note';
import styles from './board.module.css';

interface BoardProps {
    notes: Note[];
    onMoveNote: (id: number, leftCornerCoords: Coords) => void;
    onUpdateNote: (id: number, text: string) => void;
}

const Board = forwardRef<HTMLDivElement, BoardProps>(
    ({ notes, onMoveNote, onUpdateNote }, ref) => {
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
                ref={ref}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onDrop={onDropHandler}
            >
                {notes.map((note) => (
                    <NoteComponent
                        {...note}
                        key={note.id}
                        onTextChange={onUpdateNote}
                    />
                ))}
            </div>
        );
    }
);

export default Board;
