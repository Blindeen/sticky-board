import { DragEvent, useState, useRef, MouseEvent } from 'react';

import { Note } from './Note';
import { Zoom } from './Zoom';
import { useStore } from '../../store';
import { Coords } from '../../model/coords.model';
import { MouseButtons } from './mouse-buttons.enum';
import styles from './board.module.css';

const Board = () => {
    const [scale, setScale] = useState(100);
    const [isGrabbed, setIsGrabbed] = useState(false);
    const translateRef = useRef({ x: 0, y: 0 });

    const notes = useStore((state) => state.notes);
    const moveNote = useStore((state) => state.moveNote);

    const onUpscaleHandler = () => {
        setScale((prevScale) => prevScale + 10);
    };

    const onDownscaleHandler = () => {
        setScale((prevScale) => {
            const newScale = prevScale - 10;
            return newScale >= 10 ? newScale : prevScale;
        });
    };

    const onResetScaleHandler = () => {
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

    const onMouseDownHandler = (e: MouseEvent<HTMLDivElement>) => {
        if (e.button === MouseButtons.Wheel) {
            setIsGrabbed(true);
        }
    };

    const onMouseUpHandler = (e: MouseEvent<HTMLDivElement>) => {
        if (e.button === MouseButtons.Wheel) {
            setIsGrabbed(false);
        }
    };

    const onMouseMoveHandler = (e: MouseEvent<HTMLDivElement>) => {
        if (isGrabbed) {
            translateRef.current.x += e.movementX;
            translateRef.current.y += e.movementY;
            e.currentTarget.style.translate = `${translateRef.current.x}px ${translateRef.current.y}px`;
        }
    };

    return (
        <div className={styles.boardWrapper}>
            <div
                className={styles.board}
                style={{
                    scale: `${scale}%`,
                    cursor: isGrabbed ? 'grabbing' : 'default',
                }}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onDrop={onDropHandler}
                onMouseDown={onMouseDownHandler}
                onMouseUp={onMouseUpHandler}
                onMouseMove={onMouseMoveHandler}
            >
                {notes.map((note) => (
                    <Note {...note} key={note.id} />
                ))}
            </div>
            <Zoom
                scale={scale}
                onUpscale={onUpscaleHandler}
                onDownscale={onDownscaleHandler}
                onReset={onResetScaleHandler}
            />
        </div>
    );
};

export default Board;
