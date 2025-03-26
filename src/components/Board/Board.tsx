import { DragEvent, useState, MouseEvent } from 'react';

import { Note } from './Note';
import { Zoom } from './Zoom';
import { useStore } from '../../store';
import { Coords } from '../../model/coords.model';
import { MouseButtons } from './mouse-buttons.enum';
import styles from './board.module.css';

const Board = () => {
    const [scale, setScale] = useState(100);
    const [isGrabbed, setIsGrabbed] = useState(false);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });

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
            setTranslate((prevValue) => ({
                x: prevValue.x + e.movementX,
                y: prevValue.y + e.movementY,
            }));
        }
    };

    return (
        <div className={styles.boardWrapper}>
            <div
                className={styles.board}
                style={{
                    scale: `${scale}%`,
                    translate: `${translate.x}px ${translate.y}px`,
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
                onUpscale={upscaleHandler}
                onDownscale={downscaleHandler}
                onReset={resetScaleHandler}
            />
        </div>
    );
};

export default Board;
