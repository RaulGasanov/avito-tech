import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/axiosInstance';
import type { Task } from '@/entities/task/types/types.ts';

export const useAllTasks = () => useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
        const { data } = await axiosInstance.get('/tasks');
        return data.data;
    },
});
