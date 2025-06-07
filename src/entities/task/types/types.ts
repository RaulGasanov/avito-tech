export type Task = {
   id: number;
   title: string;
   description: string;
   status: string;
   executorName: string;
   boardId?: number;
   boardName?: string;
   priority?: string;
   assignee?: {
      id: number;
      fullName: string;
      email: string;
      avatarUrl: string;
   };
};
