import { DragEvent, ChangeEvent } from 'react';

import { Coords } from '../../model/coords.model';
import styles from './note.module.css';

interface NoteProps {
    id: number;
    text: string;
    leftCornerCoords: Coords;
    onTextChange: (id: number, text: string) => void;
}

const Note = ({ id, text, leftCornerCoords, onTextChange }: NoteProps) => {
    const onDragStartHandler = (e: DragEvent<HTMLDivElement>) => {
        const { x, y } = leftCornerCoords;
        const mouseOffset = { x: e.clientX - x, y: e.clientY - y };
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('noteId', id.toString());
        e.dataTransfer.setData('mouseOffset', JSON.stringify(mouseOffset));
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
