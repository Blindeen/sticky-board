import { useState } from 'react';

import { Coords } from '../../interfaces';
import styles from './note.module.css';

interface NoteProps {
    text: string;
    leftCornerCoords: Coords;
}

const Note = ({ text, leftCornerCoords }: NoteProps) => {
    const [textValue, setTextValue] = useState(text);
    const [coordinates] = useState(leftCornerCoords);

    return (
        <div
            className={styles.note}
            style={{ top: coordinates.y, left: coordinates.x }}
        >
            <textarea
                className={styles.noteTextArea}
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
            />
        </div>
    );
};

export default Note;
