import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/axiosInstance.ts';
import type { Task } from '../types/types.ts';

export const useTasksOnBoard = (boardId: number) => useQuery<Task[]>({
    queryKey: ['tasks-on-board', boardId],
    queryFn: async () => {
        const { data } = await axiosInstance.get(`/boards/${boardId}`);
        return data.data;
    },
    enabled: !!boardId,
});
