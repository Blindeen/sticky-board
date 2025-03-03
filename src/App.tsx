import { Menu } from './components/Menu';
import { Board } from './components/Board';
import styles from './app.module.css';

const App = () => {
    return (
        <div className={styles.interface}>
            <Menu />
            <Board />
        </div>
    );
};

export default App;
