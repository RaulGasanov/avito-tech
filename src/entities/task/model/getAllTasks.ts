import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/axiosInstance';
import type { Task } from '@/entities/task/types/types.ts';

export const useAllTasks = () => useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
        const controller = new AbortController();

        const promise = axiosInstance.get('/tasks', {
            signal: controller.signal,
        });

        (promise as any).cancel = () => controller.abort();

        const { data } = await promise;
        return data.data;
    },
});
