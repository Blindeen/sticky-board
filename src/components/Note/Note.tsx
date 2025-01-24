import { DragEvent, ChangeEvent } from 'react';

import { Coords } from '../../model/coords.model';
import styles from './note.module.css';

interface NoteProps {
    id: number;
    text: string;
    leftCornerCoords: Coords;
    onMoveNote: (id: number, coords: Coords) => void;
    onTextChange: (id: number, text: string) => void;
}

const Note = ({
    id,
    text,
    leftCornerCoords,
    onMoveNote,
    onTextChange,
}: NoteProps) => {
    const noteMouseOffset: Coords = { x: 0, y: 0 };

    const onDragStartHandler = (e: DragEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { x, y } = leftCornerCoords;
        noteMouseOffset.x = clientX - x;
        noteMouseOffset.y = clientY - y;
        e.dataTransfer.effectAllowed = 'move';
    };

    const onDragEndHandler = (e: DragEvent<HTMLDivElement>) => {
        const { x, y } = noteMouseOffset;
        const newLeftCornerCoords = { x: e.clientX - x, y: e.clientY - y };
        onMoveNote(id, newLeftCornerCoords);
    };

    const onTextChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onTextChange(id, e.target.value);
    };

    const { x, y } = leftCornerCoords;

    return (
        <div
            className={styles.note}
            style={{ top: y, left: x }}
            onDragStart={onDragStartHandler}
            onDragEnd={onDragEndHandler}
            draggable
        >
            <textarea
                className={styles.noteTextArea}
                value={text}
                onChange={onTextChangeHandler}
            />
        </div>
    );
};

export default Note;
