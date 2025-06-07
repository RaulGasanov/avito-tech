import { useNavigate } from 'react-router-dom';
import { useBoards } from '@/entities/boards/model/api.ts';
import styles from './BoardsList.module.scss';

export const BoardsList = () => {
    const { data, isLoading, isError } = useBoards();
    const navigate = useNavigate();

    if (isLoading) return <div>Загрузка...</div>;
    if (isError || !data) return <div>Ошибка загрузки досок</div>;
    console.log(data);
    return (
        <div>
            {data.map((board) => (
                <div
                    key={board.id}
                    className={styles.board}
                    onClick={() => navigate(`/boards/${board.id}`)}
                    style={{ cursor: 'pointer' }}
                >
                    <strong>{board.name}</strong>
                    {' '}
                    —
                    {board.taskCount}
                    {' '}
                    задач
                </div>
            ))}
        </div>
    );
};
