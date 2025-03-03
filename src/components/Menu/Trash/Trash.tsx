import { useState, DragEvent } from 'react';

import { LuTrash } from 'react-icons/lu';
import { useStore } from '../../../store';
import styles from './trash.module.css';

const Trash = () => {
    const deleteNote = useStore((state) => state.deleteNote);
    const [isDropZoneActive, setIsDropZoneActive] = useState(false);

    const onDragOverEnterHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDropZoneActive(true);
    };

    const onDropHandler = (e: DragEvent<HTMLDivElement>) => {
        const noteId = e.dataTransfer.getData('noteId');
        if (noteId) {
            deleteNote(+noteId);
        }
        setIsDropZoneActive(false);
    };

    const droppableAreaClassName = isDropZoneActive
        ? `${styles.droppableArea} ${styles.active}`
        : styles.droppableArea;

    return (
        <div
            className={droppableAreaClassName}
            onDragOver={onDragOverEnterHandler}
            onDragEnter={onDragOverEnterHandler}
            onDragLeave={() => setIsDropZoneActive(false)}
            onDrop={onDropHandler}
        >
            <LuTrash size={40} />
        </div>
    );
};

export default Trash;
