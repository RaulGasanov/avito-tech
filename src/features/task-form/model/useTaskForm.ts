import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/axiosInstance';
import type { TaskFormData, TaskFormMode } from '@/features/task-form/types/types.ts';

export const useTaskForm = (mode: TaskFormMode) => {
    const queryClient = useQueryClient();

    const mutationFn = async (data: TaskFormData) => {
        if (mode === 'create') {
            return axiosInstance.post('/tasks/create', data);
        }
        return axiosInstance.put(`/tasks/update/${data.id}`, data);
    };

    return useMutation({
        mutationFn,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            queryClient.invalidateQueries({ queryKey: ['tasks-on-board', variables.boardId] });
        },
    });
};
