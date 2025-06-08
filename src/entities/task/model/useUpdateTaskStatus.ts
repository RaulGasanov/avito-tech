import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/axiosInstance';

export const useUpdateTaskStatus = (boardId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ taskId, status }: { taskId: number; status: string }) => axiosInstance.put(`/tasks/updateStatus/${taskId}`, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks-on-board', boardId] });
        },
    });
};
