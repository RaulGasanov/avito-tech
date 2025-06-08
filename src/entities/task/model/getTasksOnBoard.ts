import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/axiosInstance.ts';
import type { Task } from '../types/types.ts';

export const useTasksOnBoard = (boardId: number) => useQuery<Task[]>({
    queryKey: ['tasks-on-board', boardId],
    queryFn: async () => {
        const controller = new AbortController();

        const promise = axiosInstance.get(`/boards/${boardId}`, {
            signal: controller.signal,
        });

        (promise as any).cancel = () => controller.abort();

        const { data } = await promise;
        return data.data;
    },
    enabled: !!boardId,
});
