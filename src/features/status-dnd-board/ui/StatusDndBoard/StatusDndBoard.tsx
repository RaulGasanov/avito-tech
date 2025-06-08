import { DndContext, closestCenter } from '@dnd-kit/core';
import { useTasksOnBoard } from '@/entities/task/model/getTasksOnBoard';
import { BoardColumn } from '../BoardColumn/BoardColumn.tsx';
import styles from './StatusDndBoard.module.scss';
import { useUpdateTaskStatus } from '@/entities/task';

export const StatusDndBoard = ({ boardId }: { boardId: number }) => {
    const { data: tasks = [], isLoading } = useTasksOnBoard(boardId);
    const updateStatus = useUpdateTaskStatus(boardId);

    const handleDragEnd = (event: any) => {
        const taskId = Number(event.active.id);
        const newStatus = event.over?.id;

        if (taskId && newStatus) {
            updateStatus.mutate({ taskId, status: newStatus });
        }
    };

    const statuses = ['Backlog', 'InProgress', 'Done'];

    if (isLoading) return <div>Загрузка задач...</div>;

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className={styles.StatusDndBoard}>
                {statuses.map((status) => (
                    <BoardColumn
                        key={status}
                        id={status}
                        tasks={tasks.filter((task) => task.status === status)}
                    />
                ))}
            </div>
        </DndContext>
    );
};
