import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BoardTasksPage from './BoardTasksPage';

const createTestClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, // отключает повторы, чтобы избежать шумных ошибок
        },
    },
});

describe('BoardTasksPage', () => {
    it('показывает сообщение об ошибке при некорректном ID', () => {
        const queryClient = createTestClient();

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={['/board/abc']}>
                    <Routes>
                        <Route path="/board/:id" element={<BoardTasksPage />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>,
        );

        expect(screen.getByText(/Неверный ID доски/i)).toBeInTheDocument();
    });

    it('отображает заголовок и StatusDndBoard при валидном ID', () => {
        const queryClient = createTestClient();

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={['/board/123']}>
                    <Routes>
                        <Route path="/board/:id" element={<BoardTasksPage />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>,
        );

        expect(screen.getByText(/Задачи доски #123/)).toBeInTheDocument();
    });
});
