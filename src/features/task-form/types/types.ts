export type TaskFormMode = 'create' | 'edit';

export type TaskFormData = {
   id?: number;
   title: string;
   description: string;
   boardId: number;
   priority: string;
   status: string;
   assigneeId: number;
};
