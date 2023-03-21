import { configureStore } from '@reduxjs/toolkit';
import columnsReducer from './Slices/columnsSlice';

export default configureStore({
    reducer: {
        columnsStore: columnsReducer,
    },
});
