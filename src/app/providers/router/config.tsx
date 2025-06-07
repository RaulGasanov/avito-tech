import type { RouteObject } from 'react-router-dom';
import { IssuesPage } from '@/pages/IssuesPage';
import { BoardsPage } from '@/pages/BoardsPage';
import { BoardTasksPage } from '@/pages/BoardTasksPage';

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
    {
        path: '/tasks',
        element: <IssuesPage />,
    },
];
