import { render, screen } from '@testing-library/react';
import { BoardColumn } from './BoardColumn';

jest.mock('@/entities/task/status-dnd/ui/DraggableTaskCard.tsx', () => ({
    DraggableTaskCard: ({ task }: any) => <div>{task.title}</div>,
}));

jest.mock('@dnd-kit/core', () => ({
    ...jest.requireActual('@dnd-kit/core'),
    useDroppable: () => ({ setNodeRef: jest.fn() }),
}));

describe('BoardColumn', () => {
    const mockTasks = [
        { id: '1', title: 'Task One' },
        { id: '2', title: 'Task Two' },
    ];

    it('renders correct column header for Backlog', () => {
        render(<BoardColumn id="Backlog" tasks={mockTasks} />);
        expect(screen.getByText('Backlog')).toBeInTheDocument();
    });

    it('renders correct column header for InProgress', () => {
        render(<BoardColumn id="InProgress" tasks={mockTasks} />);
        expect(screen.getByText('In Progress')).toBeInTheDocument();
    });

    it('renders correct column header for Done', () => {
        render(<BoardColumn id="Done" tasks={mockTasks} />);
        expect(screen.getByText('Done')).toBeInTheDocument();
    });

    it('renders DraggableTaskCard for each task', () => {
        render(<BoardColumn id="Backlog" tasks={mockTasks} />);
        expect(screen.getByText('Task One')).toBeInTheDocument();
        expect(screen.getByText('Task Two')).toBeInTheDocument();
    });
});
