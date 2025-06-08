import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { openForm } from '@/features/task-form/model/taskFormSlice.ts';

export const Header = () => {
    const dispatch = useDispatch();

    return (
        <header
            style={{
                padding: 16,
                background: '#f3f4f6',
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <div>
                <Link to="/tasks" style={{ marginRight: 12 }}>
                    Все задачи
                </Link>
                <Link to="/boards">Проекты</Link>
            </div>
            <button
                type="button"
                onClick={() => dispatch(openForm({ mode: 'create', fromPage: 'IssuesPage' }))}
                style={{
                    padding: 8,
                    background: '#3b82f6',
                    color: '#fff',
                    borderRadius: 6,
                }}
            >
                Создать задачу
            </button>
        </header>
    );
};
