import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/axiosInstance';
import type { TaskFormData } from '../types/types';

export const useTaskForm = (mode: 'create' | 'edit', taskId?: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: TaskFormData) => {
            if (mode === 'create') {
                const { data } = await axiosInstance.post('/tasks/create', formData);
                return data;
            }

            if (!taskId) throw new Error('Task ID is required for editing');
            const { data } = await axiosInstance.put(`/tasks/update/${taskId}`, formData);
            return data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            queryClient.invalidateQueries({ queryKey: ['tasks-on-board', variables.boardId] });
        },
    });
};
