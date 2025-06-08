import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusDndBoard } from './StatusDndBoard';

jest.mock('@/entities/task/model/getTasksOnBoard', () => ({
    useTasksOnBoard: jest.fn(),
}));

jest.mock('@/entities/task', () => ({
    useUpdateTaskStatus: jest.fn(),
}));

const mockedTasksHook = require('@/entities/task/model/getTasksOnBoard').useTasksOnBoard;
const mockedUpdateStatus = require('@/entities/task').useUpdateTaskStatus;

const createTestClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

describe('StatusDndBoard', () => {
    it('показывает индикатор загрузки', () => {
        mockedTasksHook.mockReturnValue({ data: [], isLoading: true });
        mockedUpdateStatus.mockReturnValue({ mutate: jest.fn() });

        render(
            <QueryClientProvider client={createTestClient()}>
                <StatusDndBoard boardId={1} />
            </QueryClientProvider>,
        );

        expect(screen.getByText(/Загрузка задач/i)).toBeInTheDocument();
    });

    it('рендерит 3 колонки с задачами', () => {
        mockedTasksHook.mockReturnValue({
            data: [
                { id: 1, status: 'Backlog', title: 'Задача 1' },
                { id: 2, status: 'InProgress', title: 'Задача 2' },
            ],
            isLoading: false,
        });
        mockedUpdateStatus.mockReturnValue({ mutate: jest.fn() });

        render(
            <QueryClientProvider client={createTestClient()}>
                <StatusDndBoard boardId={1} />
            </QueryClientProvider>,
        );

        expect(screen.getAllByText('Backlog').length).toBeGreaterThan(0);
        expect(screen.getByText('InProgress')).toBeInTheDocument();
        expect(screen.getByText('Done')).toBeInTheDocument();
        expect(screen.getByText('Задача 1')).toBeInTheDocument();
        expect(screen.getByText('Задача 2')).toBeInTheDocument();
    });
});
