import { useState } from 'react';

import styles from './note.module.css';

interface NoteProps {
    text: string;
    leftCorner: {
        x: number;
        y: number;
    };
}

const Note = ({ text, leftCorner }: NoteProps) => {
    const [textValue, setTextValue] = useState(text);
    const [coordinates, setCoordinates] = useState(leftCorner);

    return (
        <div
            className={styles.note}
            style={{ top: coordinates.y, left: coordinates.x }}
        >
            <textarea
                className={styles.noteTextInput}
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
            />
        </div>
    );
};

export default Note;
