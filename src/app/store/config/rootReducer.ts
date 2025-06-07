import { combineReducers } from '@reduxjs/toolkit';
import taskFormReducer from '@/features/task-form/model/taskFormSlice';

export const rootReducer = combineReducers({
    taskForm: taskFormReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
