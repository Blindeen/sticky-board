import { DragEvent, ChangeEvent } from 'react';

import { Coords } from '../../model/coords.model';
import { NoteData } from '../../model/note-data.model';
import styles from './note.module.css';

interface NoteProps {
    id: number;
    title: string;
    description: string;
    leftCornerCoords: Coords;
    onContentChange: (id: number, data: NoteData) => void;
}

const Note = ({
    id,
    title,
    description,
    leftCornerCoords,
    onContentChange,
}: NoteProps) => {
    const onDragStartHandler = (e: DragEvent<HTMLDivElement>) => {
        const { x, y } = leftCornerCoords;
        const mouseOffset = { x: e.clientX - x, y: e.clientY - y };
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('noteId', id.toString());
        e.dataTransfer.setData('mouseOffset', JSON.stringify(mouseOffset));
    };

    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onContentChange(id, {
            title: e.target.value,
            description: description,
        });
    };

    const onDescriptionChangeHandler = (
        e: ChangeEvent<HTMLTextAreaElement>
    ) => {
        onContentChange(id, { title: title, description: e.target.value });
    };

    const { x, y } = leftCornerCoords;

    return (
        <div
            className={styles.note}
            style={{ top: y, left: x }}
            onDragStart={onDragStartHandler}
            draggable
        >
            <input
                className={styles.titleInput}
                placeholder='Title'
                value={title}
                onChange={onTitleChangeHandler}
            />
            <hr />
            <textarea
                className={styles.descriptionTextArea}
                placeholder='Description'
                value={description}
                onChange={onDescriptionChangeHandler}
            />
        </div>
    );
};

export default Note;
