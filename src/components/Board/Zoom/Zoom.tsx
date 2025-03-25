import { FaPlus, FaMinus } from 'react-icons/fa6';

import styles from './zoom.module.css';

const Zoom = () => {
    return (
        <div className={styles.actions}>
            <button
                type='button'
                className={styles.button}
                onClick={() => console.log('Scaled up!')}
            >
                <FaPlus size={20} />
            </button>
            <span>100%</span>
            <button
                type='button'
                className={styles.button}
                onClick={() => console.log('Scaled down!')}
            >
                <FaMinus size={20} />
            </button>
        </div>
    );
};

export default Zoom;
