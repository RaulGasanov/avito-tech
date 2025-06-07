import type { RouteObject } from 'react-router-dom';
import { BoardsPage } from '@/pages/boards';
import { BoardTasksPage } from '@/pages/board-tasks';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <BoardsPage />,
    },
    {
        path: '/boards',
        element: <BoardsPage />,
    },
    {
        path: '/boards/:id',
        element: <BoardTasksPage />,
    },
];
