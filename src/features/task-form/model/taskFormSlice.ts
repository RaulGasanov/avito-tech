import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TaskFormData, TaskFormMode } from '@/features/task-form/types/types.ts';

type TaskFormState = {
   isOpen: boolean;
   mode: TaskFormMode;
   fromPage: 'board' | 'issues';
   initialData?: TaskFormData;
};

const initialState: TaskFormState = {
    isOpen: false,
    mode: 'create',
    fromPage: 'issues',
};

export const taskFormSlice = createSlice({
    name: 'taskForm',
    initialState,
    reducers: {
        openForm(state, action: PayloadAction<{ mode: TaskFormMode; fromPage: 'board' | 'issues'; initialData?: TaskFormData }>) {
            state.isOpen = true;
            state.mode = action.payload.mode;
            state.fromPage = action.payload.fromPage;
            state.initialData = action.payload.initialData;
        },
        closeForm(state) {
            state.isOpen = false;
            state.initialData = undefined;
        },
    },
});

export const { openForm, closeForm } = taskFormSlice.actions;
export default taskFormSlice.reducer;
