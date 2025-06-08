import { useDispatch } from 'react-redux';
import { openForm } from '@/features/task-form/model/taskFormSlice';
import { TasksTable } from '@/widgets/tasks-table';
import styles from './IssuesPage.module.scss';

const IssuesPage = () => {
    const dispatch = useDispatch();

    return (
        <div className={styles.IssuesPage}>
            <h1>Все задачи</h1>
            <button
                type="button"
                onClick={() => dispatch(openForm({ mode: 'create', fromPage: 'IssuesPage' }))}
            >
                Создать задачу
            </button>

            <TasksTable />
        </div>
    );
};

export default IssuesPage;
