import { FaPlus, FaMinus } from 'react-icons/fa6';

import styles from './zoom.module.css';

interface ZoomProps {
    scale: number;
    onUpscale: () => void;
    onDownscale: () => void;
}

const Zoom = ({ scale, onUpscale, onDownscale }: ZoomProps) => {
    return (
        <div className={styles.actions}>
            <button type='button' className={styles.button} onClick={onUpscale}>
                <FaPlus size={20} />
            </button>
            <span>{`${scale * 100}%`}</span>
            <button
                type='button'
                className={styles.button}
                onClick={onDownscale}
            >
                <FaMinus size={20} />
            </button>
        </div>
    );
};

export default Zoom;
