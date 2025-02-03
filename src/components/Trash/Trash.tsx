import { useState } from 'react';

import { LuTrash } from 'react-icons/lu';
import styles from './trash.module.css';

interface TrashProps {
    onDeleteNote: (id: number) => void;
}

const Trash = ({ onDeleteNote }: TrashProps) => {
    const [isDropZoneActive, setIsDropZoneActive] = useState(false);

    const droppableAreaClassName = isDropZoneActive
        ? `${styles.droppableArea} ${styles.active}`
        : styles.droppableArea;

    return (
        <div
            className={droppableAreaClassName}
            onDragOver={(e) => {
                e.preventDefault();
                setIsDropZoneActive(true);
            }}
            onDragEnter={(e) => {
                e.preventDefault();
                setIsDropZoneActive(true);
            }}
            onDragLeave={() => setIsDropZoneActive(false)}
            onDrop={(e) => {
                const noteId = e.dataTransfer.getData('noteId');
                if (noteId) {
                    onDeleteNote(+noteId);
                    e.preventDefault();
                }
                setIsDropZoneActive(false);
            }}
        >
            <LuTrash size={40} />
        </div>
    );
};

export default Trash;
