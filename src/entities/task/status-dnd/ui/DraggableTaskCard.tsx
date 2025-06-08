import { useDraggable } from '@dnd-kit/core';
import styles from './DraggableTaskCard.module.scss';

export const DraggableTaskCard = ({ task }: { task: any }) => {
    const {
        setNodeRef, listeners, attributes, transform,
    } = useDraggable({
        id: task.id,
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={styles.task}
            style={{
                transform: transform
                    ? `translate(${transform.x}px, ${transform.y}px)`
                    : undefined,
            }}
        >
            <strong>{task.title}</strong>
            <p>{task.description}</p>
            <p>
                <strong>Статус:</strong>
                {' '}
                {task.status}
            </p>
        </div>
    );
};
