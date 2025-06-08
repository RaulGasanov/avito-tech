import { render, screen } from '@testing-library/react';
import { TasksOnBoard } from './TasksOnBoard';

jest.mock('@/entities/task/model/getTasksOnBoard.ts', () => ({
    useTasksOnBoard: jest.fn(),
}));

const mockUseTasksOnBoard = require('@/entities/task/model/getTasksOnBoard.ts').useTasksOnBoard;

describe('TasksOnBoard', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('показывает сообщение о загрузке', () => {
        mockUseTasksOnBoard.mockReturnValue({ isLoading: true, isError: false, data: null });

        render(<TasksOnBoard boardId={1} />);

        expect(screen.getByText(/Загрузка задач/i)).toBeInTheDocument();
    });

    it('показывает сообщение об ошибке', () => {
        mockUseTasksOnBoard.mockReturnValue({ isLoading: false, isError: true, data: null });

        render(<TasksOnBoard boardId={1} />);

        expect(screen.getByText(/Ошибка загрузки задач/i)).toBeInTheDocument();
    });

    it('рендерит список задач', () => {
        mockUseTasksOnBoard.mockReturnValue({
            isLoading: false,
            isError: false,
            data: [
                {
                    id: 1,
                    title: 'Задача 1',
                    description: 'Описание 1',
                    status: 'Backlog',
                    assignee: { fullName: 'Иван Иванов' },
                },
                {
                    id: 2,
                    title: 'Задача 2',
                    description: 'Описание 2',
                    status: 'Done',
                    assignee: null,
                },
            ],
        });

        render(<TasksOnBoard boardId={1} />);

        expect(screen.getByText('Задача 1')).toBeInTheDocument();
        expect(screen.getByText('Описание 1')).toBeInTheDocument();
        expect(screen.getByText(/Backlog/)).toBeInTheDocument();
        expect(screen.getByText(/Иван Иванов/)).toBeInTheDocument();

        expect(screen.getByText('Задача 2')).toBeInTheDocument();
        expect(screen.getByText('Описание 2')).toBeInTheDocument();
        expect(screen.getByText(/Done/)).toBeInTheDocument();
    });
});
