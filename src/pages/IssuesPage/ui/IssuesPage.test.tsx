import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import IssuesPage from './IssuesPage';

jest.mock('@/widgets/tasks-table', () => ({
    TasksTable: () => <div data-testid="TasksTable">Mocked TasksTable</div>,
}));

const mockStore = configureStore();
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
}));

describe('IssuesPage', () => {
    it('отображает заголовок, кнопку и таблицу', () => {
        const store = mockStore({});

        render(
            <Provider store={store}>
                <IssuesPage />
            </Provider>,
        );

        expect(screen.getByText('Все задачи')).toBeInTheDocument();
        expect(screen.getByText('Создать задачу')).toBeInTheDocument();
        expect(screen.getByTestId('TasksTable')).toBeInTheDocument();
    });

    it('вызывает openForm с нужными параметрами при клике', () => {
        const store = mockStore({});

        render(
            <Provider store={store}>
                <IssuesPage />
            </Provider>,
        );

        fireEvent.click(screen.getByText('Создать задачу'));

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'taskForm/openForm',
            payload: {
                mode: 'create',
                fromPage: 'IssuesPage',
            },
        });
    });
});
