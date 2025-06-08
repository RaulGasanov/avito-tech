import styles from './TasksOnBoard.module.scss';
import { useTasksOnBoard } from '@/entities/task/model/getTasksOnBoard.ts';

type Props = {
   boardId: number;
};

export const TasksOnBoard = ({ boardId }: Props) => {
    const { data, isLoading, isError } = useTasksOnBoard(boardId);

    if (isLoading) return <div>Загрузка задач...</div>;
    if (isError || !data) return <div>Ошибка загрузки задач</div>;

    return (
        <div className={styles.TasksOnBoard}>
            {data.map((task) => (
                <div key={task.id} className={styles.task}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>
                        <strong>Статус:</strong>
                        {' '}
                        {task.status}
                    </p>
                    <p>
                        <strong>Исполнитель:</strong>
                        {' '}
                        {task.assignee?.fullName}
                    </p>
                </div>
            ))}
        </div>
    );
};
