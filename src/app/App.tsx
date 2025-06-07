import { BrowserRouter } from 'react-router-dom';
import { ReactQueryProvider } from './providers/ReactQueryProvider';
import { AppRouter } from '@/app/providers/router/AppRouter.tsx';
import { Header } from '@/app/layout/Header.tsx';
import { TaskFormModal } from '@/features/task-form/ui/TaskFormModal.tsx';

export const App = () => (
    <ReactQueryProvider>
        <BrowserRouter>
            <Header />
            <AppRouter />
            <TaskFormModal />
        </BrowserRouter>
    </ReactQueryProvider>
);
