import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { closeForm } from '../model/taskFormSlice';
import styles from './TaskFormModal.module.scss';
import { useTaskForm } from '../model/useTaskForm';
import type { RootState } from '@/app/store/config/rootReducer.ts';
import type { TaskFormData } from '@/features/task-form/types/types.ts';

Modal.setAppElement('#root');

export const TaskFormModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        isOpen, mode, initialData, fromPage,
    } = useSelector((state: RootState) => state.taskForm);
    const [formData, setFormData] = useState<TaskFormData>({
        title: '',
        description: '',
        boardId: 0,
        priority: 'Low',
        status: 'NEW',
        assigneeId: 0,
    });

    const mutation = useTaskForm(mode);
    const isFromBoard = fromPage === 'board';

    useEffect(() => {
        if (initialData) setFormData(initialData);
    }, [initialData]);

    const handleChange = (field: keyof TaskFormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { value } = e.target;
        const numberFields: (keyof TaskFormData)[] = ['boardId', 'assigneeId'];

        setFormData({
            ...formData,
            [field]: numberFields.includes(field) ? Number(value) : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData, {
            onSuccess: () => dispatch(closeForm()),
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => dispatch(closeForm())}
            className={styles.modal}
            overlayClassName="overlay"
        >
            <form onSubmit={handleSubmit}>
                <h2>{mode === 'create' ? 'Создание задачи' : 'Редактирование задачи'}</h2>

                <label>
                    Название задачи
                    <input
                        className={styles.input}
                        value={formData.title}
                        onChange={handleChange('title')}
                        required
                    />
                </label>

                <label>
                    Описание задачи
                    <textarea
                        className={styles.textarea}
                        value={formData.description}
                        onChange={handleChange('description')}
                    />
                </label>

                <label>
                    Проект
                    <select
                        className={styles.select}
                        value={formData.boardId}
                        onChange={handleChange('boardId')}
                        disabled={isFromBoard}
                    >
                        <option value={0}>Выберите проект</option>
                        <option value={1}>Проект 1</option>
                        <option value={2}>Проект 2</option>
                    </select>
                </label>

                <label>
                    Приоритет
                    <select
                        className={styles.select}
                        value={formData.priority}
                        onChange={handleChange('priority')}
                    >
                        <option value="Low">Низкий</option>
                        <option value="Medium">Средний</option>
                        <option value="High">Высокий</option>
                    </select>
                </label>

                <label>
                    Статус
                    <select
                        className={styles.select}
                        value={formData.status}
                        onChange={handleChange('status')}
                    >
                        <option value="NEW">Новая</option>
                        <option value="IN_PROGRESS">В работе</option>
                        <option value="DONE">Готова</option>
                    </select>
                </label>

                <label>
                    Исполнитель (ID)
                    <select
                        className={styles.select}
                        value={formData.assigneeId}
                        onChange={handleChange('assigneeId')}
                    >
                        <option value={0}>Не выбран</option>
                        <option value={1}>Пользователь 1</option>
                        <option value={2}>Пользователь 2</option>
                    </select>
                </label>

                {fromPage === 'issues' && (
                    <button
                        type="button"
                        onClick={() => navigate(`/boards/${formData.boardId}`)}
                        className={styles.button}
                    >
                        Перейти на доску
                    </button>
                )}

                <button type="submit" className={styles.button}>
                    {mode === 'create' ? 'Создать' : 'Обновить'}
                </button>
            </form>
        </Modal>
    );
};
