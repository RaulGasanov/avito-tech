import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useAllTasks } from '@/entities/task/model/getAllTasks';
import { openForm } from '@/features/task-form/model/taskFormSlice';
import { normalizeStatus } from '@/widgets/tasks-table/lib/normalizeStatus.ts';

export const TasksTable = () => {
    const { data: tasks = [], isLoading } = useAllTasks();
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [boardId, setBoardId] = useState('');
    const [assigneeId, setAssigneeId] = useState('');

    const filtered = tasks.filter((task) => task.title.toLowerCase().includes(search.toLowerCase())
       && (status ? normalizeStatus(task.status) === status : true)
       && (boardId ? task.boardId === Number(boardId) : true)
       && (assigneeId ? task.assignee?.id === Number(assigneeId) : true));

    const handleClick = (task: any) => {
        dispatch(openForm({
            mode: 'edit',
            fromPage: 'IssuesPage',
            initialData: {
                title: task.title,
                description: task.description,
                boardId: task.boardId,
                status: task.status,
                priority: task.priority,
                assigneeId: task.assignee?.id,
                id: task.id,
            },
        }));
    };

    return (
        <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <input placeholder="Поиск по названию" value={search} onChange={(e) => setSearch(e.target.value)} />
                <input placeholder="Исполнитель (ID)" value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)} />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Статус</option>
                    <option value="NEW">NEW</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="DONE">DONE</option>
                </select>
                <select value={boardId} onChange={(e) => setBoardId(e.target.value)}>
                    <option value="">Доска</option>
                    <option value="1">Проект 1</option>
                    <option value="2">Проект 2</option>
                </select>
            </div>

            {isLoading ? (
                <p>Загрузка...</p>
            ) : (
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {filtered.map((task) => (
                        <li
                            key={task.id}
                            style={{
                                border: '1px solid #ddd',
                                borderRadius: 8,
                                padding: 12,
                                cursor: 'pointer',
                            }}
                            onClick={() => handleClick(task)}
                        >
                            <strong>{task.title}</strong>
                            {' '}
                            —
                            {task.status}
                            {' '}
                            —
                            {task.boardName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
