import { DragEvent } from 'react';

import { Note } from '../Note';
import { Coords } from '../../model/coords.model';
import { useStore } from '../../store';
import styles from './board.module.css';

const Board = () => {
    const notes = useStore((state) => state.notes);
    const moveNote = useStore((state) => state.moveNote);

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
            moveNote(+noteId, newLeftCornerCoords);
        }
    };

    return (
        <div
            className={styles.board}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDrop={onDropHandler}
        >
            {notes.map((note) => (
                <Note {...note} key={note.id} />
            ))}
        </div>
    );
};

export default Board;
