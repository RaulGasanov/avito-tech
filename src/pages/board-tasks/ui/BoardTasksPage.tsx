import { useParams } from 'react-router-dom';
import { TasksOnBoard } from '@/widgets/tasks-on-board';

export const BoardTasksPage = () => {
    const { id } = useParams<{ id: string }>();
    const boardId = Number(id);

    if (Number.isNaN(boardId)) return <div>Неверный ID доски</div>;

    return (
        <div>
            <h1>
                Задачи доски #
                {boardId}
            </h1>
            <TasksOnBoard boardId={boardId} />
        </div>
    );
};
