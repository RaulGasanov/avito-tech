import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/axiosInstance.ts';
import type { Board } from '@/entities/boards/types/types.ts';

export const useBoards = () => useQuery<Board[]>({
    queryKey: ['BoardsPage'],
    queryFn: async () => {
        const response = await axiosInstance.get('/boards');
        return response.data.data;
    },
});
