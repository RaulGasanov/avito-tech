import { render, screen } from '@testing-library/react';
import { DraggableTaskCard } from './DraggableTaskCard';

jest.mock('@dnd-kit/core', () => ({
    useDraggable: () => ({
        setNodeRef: jest.fn(),
        listeners: { onPointerDown: jest.fn() },
        attributes: { role: 'button' },
        transform: { x: 10, y: 20 },
    }),
}));

describe('DraggableTaskCard', () => {
    it('отображает заголовок, описание и статус задачи', () => {
        const task = {
            id: 1,
            title: 'Задача 1',
            description: 'Описание задачи',
            status: 'Backlog',
        };

        render(<DraggableTaskCard task={task} />);

        expect(screen.getByText('Задача 1')).toBeInTheDocument();
        expect(screen.getByText('Описание задачи')).toBeInTheDocument();
        expect(screen.getByText('Backlog')).toBeInTheDocument();
    });

    it('применяет transform при перетаскивании', () => {
        const task = {
            id: 1,
            title: 'Задача 1',
            description: '',
            status: 'Backlog',
        };

        const { container } = render(<DraggableTaskCard task={task} />);
        const card = container.firstChild as HTMLDivElement;

        expect(card.style.transform).toBe('translate(10px, 20px)');
    });
});
