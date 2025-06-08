import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { openForm } from '@/features/task-form/model/taskFormSlice.ts';
import styles from './Header.module.scss';

export const Header = () => {
    const dispatch = useDispatch();

    return (
        <header className={styles.Header}>
            <div className={styles.navLinks}>
                <Link to="/tasks">Все задачи</Link>
                <Link to="/boards">Проекты</Link>
            </div>
            <button
                type="button"
                onClick={() => dispatch(openForm({ mode: 'create', fromPage: 'IssuesPage' }))}
                className={styles.createButton}
            >
                Создать задачу
            </button>
        </header>
    );
};
