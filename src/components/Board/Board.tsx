import { forwardRef } from 'react';

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
        return (
            <div
                className={styles.board}
                ref={ref}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
            >
                {notes.map((note) => (
                    <NoteComponent
                        {...note}
                        key={note.id}
                        onMoveNote={onMoveNote}
                        onTextChange={onUpdateNote}
                    />
                ))}
            </div>
        );
    }
);

export default Board;
