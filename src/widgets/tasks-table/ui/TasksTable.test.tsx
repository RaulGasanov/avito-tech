import {
    render, screen, fireEvent, within,
} from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { TasksTable } from './TasksTable';
import { useAllTasks } from '@/entities/task/model/getAllTasks';

jest.mock('@/entities/task/model/getAllTasks');
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));

const mockUseAllTasks = useAllTasks as jest.Mock;
const mockDispatch = jest.fn();

beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('TasksTable', () => {
    it('показывает индикатор загрузки', () => {
        mockUseAllTasks.mockReturnValue({ isLoading: true, data: [] });

        render(<TasksTable />);

        expect(screen.getByText(/Загрузка/i)).toBeInTheDocument();
    });

    it('отображает задачи и вызывает dispatch при клике', () => {
        mockUseAllTasks.mockReturnValue({
            isLoading: false,
            data: [
                {
                    id: 1,
                    title: 'Тестовая задача',
                    description: 'Описание',
                    boardId: 1,
                    boardName: 'Проект 1',
                    status: 'NEW',
                    priority: 'LOW',
                    assignee: { id: 5, fullName: 'Иванов И.И.' },
                },
            ],
        });

        render(<TasksTable />);

        const taskItem = screen.getByText('Тестовая задача').closest('li');
        expect(taskItem).toBeInTheDocument();

        // Проверка содержимого задачи
        expect(within(taskItem!).getByText(/NEW/)).toBeInTheDocument();
        expect(within(taskItem!).getByText(/Проект 1/)).toBeInTheDocument();

        // Проверка клика
        fireEvent.click(taskItem!);

        expect(mockDispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: 'taskForm/openForm',
                payload: expect.objectContaining({
                    mode: 'edit',
                    initialData: expect.objectContaining({
                        title: 'Тестовая задача',
                        assigneeId: 5,
                    }),
                }),
            }),
        );
    });

    it('фильтрует задачи по названию', () => {
        mockUseAllTasks.mockReturnValue({
            isLoading: false,
            data: [
                {
                    id: 1, title: 'Первая', description: '', status: 'NEW', boardId: 1, boardName: '', assignee: null,
                },
                {
                    id: 2, title: 'Вторая', description: '', status: 'DONE', boardId: 1, boardName: '', assignee: null,
                },
            ],
        });

        render(<TasksTable />);
        fireEvent.change(screen.getByPlaceholderText(/поиск/i), { target: { value: 'втор' } });

        expect(screen.getByText('Вторая')).toBeInTheDocument();
        expect(screen.queryByText('Первая')).toBeNull();
    });
});
