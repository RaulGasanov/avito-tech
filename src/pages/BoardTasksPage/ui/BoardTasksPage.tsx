import { useParams } from 'react-router-dom';
import { StatusDndBoard } from '@/features/status-dnd-board/ui/StatusDndBoard/StatusDndBoard.tsx';

const BoardTasksPage = () => {
    const { id } = useParams<{ id: string }>();
    const boardId = Number(id);

    if (Number.isNaN(boardId)) return <div>Неверный ID доски</div>;

    return (
        <div>
            <h1>
                Задачи доски #
                {boardId}
            </h1>
            <StatusDndBoard boardId={boardId} />
        </div>
    );
};

export default BoardTasksPage;
