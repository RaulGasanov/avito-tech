import { useDispatch } from 'react-redux';
import { openForm } from '@/features/task-form/model/taskFormSlice';

export const Header = () => {
    const dispatch = useDispatch();

    return (
        <header style={{
            padding: 16, background: '#f3f4f6', display: 'flex', justifyContent: 'space-between',
        }}
        >
            <div>
                <a href="/boards" style={{ marginRight: 12 }}>Проекты</a>
                <a href="/issues">Все задачи</a>
            </div>
            <button
                onClick={() => dispatch(openForm({ mode: 'create', fromPage: 'issues' }))}
                style={{
                    padding: 8, background: '#3b82f6', color: '#fff', borderRadius: 6,
                }}
            >
                Создать задачу
            </button>
        </header>
    );
};
