import { useState, DragEvent, ChangeEvent } from 'react';

import { Coords } from '../../interfaces';
import styles from './note.module.css';

interface NoteProps {
    id: number;
    text: string;
    leftCornerCoords: Coords;
    onMoveNote: (id: number, coords: Coords) => void;
}

const Note = ({ id, text, leftCornerCoords, onMoveNote }: NoteProps) => {
    const [textValue, setTextValue] = useState(text);

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
        setTextValue(e.target.value);
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
                value={textValue}
                onChange={onTextChangeHandler}
            />
        </div>
    );
};

export default Note;
