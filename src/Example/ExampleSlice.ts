import { createSlice } from '@reduxjs/toolkit';

interface State {
    name: string;
    items: any[];
}

export const exampleSlice = createSlice({
    name: 'example',
    initialState: {
        name: 'MOrgan',
        items: [],
    },
    reducers: {
        setName: (state: { name: string }, action: { payload: string }) => {
            state.name = action.payload;
        },
        setItems: (state: { items: any[] }, action: { payload: any[] }) => {
            state.items = action.payload;
        },
    },
});

export const { setName, setItems } = exampleSlice.actions;

export default exampleSlice.reducer;
