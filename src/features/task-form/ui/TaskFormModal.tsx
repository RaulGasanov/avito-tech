import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { closeForm } from '../model/taskFormSlice';
import styles from './TaskFormModal.module.scss';
import { useTaskForm } from '../model/useTaskForm';
import type { RootState } from '@/app/store/config/rootReducer';
import type { TaskFormData } from '@/features/task-form/types/types';
import { denormalizeStatus } from '@/widgets/tasks-table/lib/denormalizeStatus.ts';

const modalRoot = document.getElementById('root')!;

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

    const mutation = useTaskForm(mode, initialData?.id);
    const isFromBoard = fromPage === 'board';

    useEffect(() => {
        if (mode === 'edit' && initialData) {
            setFormData(initialData);
        }

        if (mode === 'create') {
            setFormData({
                title: '',
                description: '',
                boardId: 1,
                priority: 'Low',
                status: 'NEW',
                assigneeId: 1,
            });
        }
    }, [mode, initialData]);

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

        const payload = {
            ...formData,
            status: denormalizeStatus(formData.status),
            BoardID: formData.boardId,
        };

        delete (payload as any).boardId;

        mutation.mutate(payload, {
            onSuccess: () => dispatch(closeForm()),
        });
    };

    if (!isOpen) return null;

    return createPortal(
        <div className={styles.TaskFormModal} onClick={() => dispatch(closeForm())}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <h2>{mode === 'create' ? 'Создание задачи' : 'Редактирование задачи'}</h2>

                    <label htmlFor="title">Название задачи</label>
                    <input
                        id="title"
                        name="title"
                        required
                        className={styles.input}
                        value={formData.title}
                        onChange={handleChange('title')}
                    />

                    <label htmlFor="description">Описание задачи</label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        className={styles.textarea}
                        value={formData.description}
                        onChange={handleChange('description')}
                    />

                    <label htmlFor="boardId">Проект</label>
                    <select
                        id="boardId"
                        name="boardId"
                        required
                        className={styles.select}
                        value={Number.isNaN(formData.boardId) ? '' : formData.boardId}
                        onChange={handleChange('boardId')}
                        disabled={isFromBoard}
                    >
                        <option value="" disabled>Выберите проект</option>
                        <option value={1}>Проект 1</option>
                        <option value={2}>Проект 2</option>
                    </select>

                    <label htmlFor="priority">Приоритет</label>
                    <select
                        id="priority"
                        name="priority"
                        required
                        className={styles.select}
                        value={formData.priority}
                        onChange={handleChange('priority')}
                    >
                        <option value="" disabled>Выберите приоритет</option>
                        <option value="Low">Низкий</option>
                        <option value="Medium">Средний</option>
                        <option value="High">Высокий</option>
                    </select>

                    <label htmlFor="status">Статус</label>
                    <select
                        id="status"
                        name="status"
                        required
                        className={styles.select}
                        value={formData.status}
                        onChange={handleChange('status')}
                    >
                        <option value="" disabled>Выберите статус</option>
                        <option value="NEW">Новая</option>
                        <option value="IN_PROGRESS">В работе</option>
                        <option value="DONE">Готова</option>
                    </select>

                    <label htmlFor="assigneeId">Исполнитель</label>
                    <select
                        id="assigneeId"
                        name="assigneeId"
                        required
                        className={styles.select}
                        value={Number.isNaN(formData.assigneeId) ? '' : formData.assigneeId}
                        onChange={handleChange('assigneeId')}
                    >
                        <option value="" disabled>Выберите исполнителя</option>
                        <option value={1}>Пользователь 1</option>
                        <option value={2}>Пользователь 2</option>
                    </select>

                    {fromPage === 'IssuesPage' && (
                        <button
                            type="button"
                            onClick={() => {
                                dispatch(closeForm());
                                navigate(`/boards/${formData.boardId}`);
                            }}
                            className={styles.button}
                        >
                            Перейти на доску
                        </button>
                    )}

                    <button type="submit" className={styles.button}>
                        {mode === 'create' ? 'Создать' : 'Обновить'}
                    </button>
                </form>
            </div>
        </div>,
        modalRoot,
    );
};
