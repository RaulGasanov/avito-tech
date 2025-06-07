import { useDispatch } from 'react-redux';
import { openForm } from '@/features/task-form/model/taskFormSlice';
import { TasksTable } from '@/widgets/tasks-table';

const IssuesPage = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Все задачи</h1>
            <button
                onClick={() => dispatch(openForm({ mode: 'create', fromPage: 'IssuesPage' }))}
                style={{ marginBottom: 16 }}
            >
                Создать задачу
            </button>

            <TasksTable />
        </div>
    );
};

export default IssuesPage;
