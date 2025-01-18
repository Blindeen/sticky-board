import { useState } from 'react';

import styles from './note.module.css';

interface NoteProps {
    text: string;
    position: {
        x: number;
        y: number;
    };
}

const Note = ({ text, position }: NoteProps) => {
    const [textValue, setTextValue] = useState(text);
    const [coordinates, setCoordinates] = useState(position);

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
