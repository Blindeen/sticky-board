import { DragEvent, useState } from 'react';

import { Note } from './Note';
import { Coords } from '../../model/coords.model';
import { useStore } from '../../store';
import { Zoom } from './Zoom';
import styles from './board.module.css';

const Board = () => {
    const [scale, setScale] = useState(100);
    const notes = useStore((state) => state.notes);
    const moveNote = useStore((state) => state.moveNote);

    const upscaleHandler = () => {
        setScale((prevScale) => prevScale + 10);
    };

    const downscaleHandler = () => {
        setScale((prevScale) => {
            const newScale = prevScale - 10;
            return newScale >= 10 ? newScale : prevScale;
        });
    };

    const resetScaleHandler = () => {
        setScale(100);
    };

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
            className={styles.boardWrapper}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDrop={onDropHandler}
        >
            <div
                className={styles.board}
                style={{ transform: `scale(${scale}%)` }}
            >
                {notes.map((note) => (
                    <Note {...note} key={note.id} />
                ))}
            </div>
            <Zoom
                scale={scale}
                onUpscale={upscaleHandler}
                onDownscale={downscaleHandler}
                onReset={resetScaleHandler}
            />
        </div>
    );
};

export default Board;
