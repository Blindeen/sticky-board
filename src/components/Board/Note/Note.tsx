import { useState, useEffect, DragEvent } from 'react';

import { Coords } from '../../../model/coords.model';
import { useStore } from '../../../store';
import { useDebounce } from '../../../hooks/useDebounce';
import { NoteData } from '../../../model/note-data.model';
import styles from './note.module.css';

interface NoteProps {
    id: number;
    title: string;
    description: string;
    leftCornerCoords: Coords;
}

const Note = ({ id, title, description, leftCornerCoords }: NoteProps) => {
    const [data, setData] = useState({ title, description });
    const debouncedData = useDebounce<NoteData>(data, 300);
    const updateNote = useStore((state) => state.updateNote);

    useEffect(() => {
        updateNote(id, debouncedData);
    }, [updateNote, id, debouncedData]);

    const onDragStartHandler = (e: DragEvent<HTMLDivElement>) => {
        const { x, y } = leftCornerCoords;
        const mouseOffset = { x: e.clientX - x, y: e.clientY - y };
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('noteId', id.toString());
        e.dataTransfer.setData('mouseOffset', JSON.stringify(mouseOffset));
    };

    return (
        <div
            className={styles.note}
            style={{ top: leftCornerCoords.y, left: leftCornerCoords.x }}
            onDragStart={onDragStartHandler}
            draggable
        >
            <input
                className={styles.titleInput}
                placeholder='Title'
                value={data.title}
                onChange={(e) =>
                    setData({ title: e.target.value, description: description })
                }
            />
            <hr />
            <textarea
                className={styles.descriptionTextArea}
                placeholder='Description'
                value={data.description}
                onChange={(e) =>
                    setData({ title: title, description: e.target.value })
                }
            />
        </div>
    );
};

export default Note;
