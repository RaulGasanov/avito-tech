import { render, screen, fireEvent } from '@testing-library/react';
import { BoardsList } from './BoardsList';

jest.mock('@/entities/boards/model/api.ts', () => ({
    useBoards: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

const mockUseBoards = require('@/entities/boards/model/api.ts').useBoards;

describe('BoardsList', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('показывает "Загрузка..." при isLoading', () => {
        mockUseBoards.mockReturnValue({ isLoading: true, isError: false, data: null });

        render(<BoardsList />);

        expect(screen.getByText('Загрузка...')).toBeInTheDocument();
    });

    it('показывает сообщение об ошибке при isError', () => {
        mockUseBoards.mockReturnValue({ isLoading: false, isError: true, data: null });

        render(<BoardsList />);

        expect(screen.getByText('Ошибка загрузки досок')).toBeInTheDocument();
    });

    it('рендерит список досок', () => {
        mockUseBoards.mockReturnValue({
            isLoading: false,
            isError: false,
            data: [
                { id: 1, name: 'Доска A', taskCount: 5 },
                { id: 2, name: 'Доска B', taskCount: 10 },
            ],
        });

        render(<BoardsList />);

        expect(screen.getByText(/Доска A/)).toBeInTheDocument();
        expect(screen.getByText(/5 задач/)).toBeInTheDocument();
        expect(screen.getByText(/Доска B/)).toBeInTheDocument();
        expect(screen.getByText(/10 задач/)).toBeInTheDocument();
    });

    it('навигация работает при клике на доску', () => {
        mockUseBoards.mockReturnValue({
            isLoading: false,
            isError: false,
            data: [{ id: 42, name: 'Проект X', taskCount: 3 }],
        });

        render(<BoardsList />);

        fireEvent.click(screen.getByText(/Проект X/));

        expect(mockNavigate).toHaveBeenCalledWith('/boards/42');
    });
});
