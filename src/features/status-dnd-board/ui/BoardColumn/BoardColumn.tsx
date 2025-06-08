import { useDroppable } from '@dnd-kit/core';
import styles from './BoardColumn.module.scss';
import { DraggableTaskCard } from '@/entities/task/status-dnd/ui/DraggableTaskCard.tsx';

export const BoardColumn = ({ id, tasks }: { id: string; tasks: any[] }) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div ref={setNodeRef} className={styles.column}>
            <div className={styles.columnHeader}>
                {id === 'Backlog' && 'Backlog'}
                {id === 'InProgress' && 'In Progress'}
                {id === 'Done' && 'Done'}
            </div>
            <div className={styles.taskList}>
                {tasks.map((task) => (
                    <DraggableTaskCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
};
