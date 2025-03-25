import { FaPlus, FaMinus } from 'react-icons/fa6';

import styles from './zoom.module.css';

interface ZoomProps {
    scale: number;
    onUpscale: () => void;
    onDownscale: () => void;
    onReset: () => void;
}

const Zoom = ({ scale, onUpscale, onDownscale, onReset }: ZoomProps) => {
    return (
        <div className={styles.actions}>
            <button className={styles.button} type='button' onClick={onUpscale}>
                <FaPlus size={20} />
            </button>
            <button className={styles.button} type='button' onClick={onReset}>
                {`${scale}%`}
            </button>
            <button
                className={styles.button}
                type='button'
                onClick={onDownscale}
            >
                <FaMinus size={20} />
            </button>
        </div>
    );
};

export default Zoom;
