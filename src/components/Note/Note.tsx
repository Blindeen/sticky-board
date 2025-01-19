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

    const onDragStartHandler = (e: DragEvent<HTMLDivElement>) => {
        e.dataTransfer.effectAllowed = 'move';
    };

    const onDragEndHandler = (e: DragEvent<HTMLDivElement>) => {
        const newLeftCornerCoords = { x: e.clientX, y: e.clientY };
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
