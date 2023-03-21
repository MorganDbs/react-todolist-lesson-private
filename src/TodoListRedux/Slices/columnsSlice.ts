import { createSlice } from '@reduxjs/toolkit';
import { Column, Item } from '../TodoListRedux';

export interface State {
    columnsStore: {
        columns: Column[];
        columnModal: Column | undefined;
        itemModal: any | undefined;
    };
}

const randomId = () => (Math.random() + 1).toString(36).substring(7);

const reorder = (list: Item[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (
    source: any,
    destination: any,
    droppableSource: any,
    droppableDestination: any
) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: Record<string, any> = {};

    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

export const columnsSlice = createSlice({
    name: 'columns',
    initialState: {
        columns: [],
        columnModal: undefined,
        itemModal: undefined,
    },
    reducers: {
        addColumn: (
            state: { columns: Column[] },
            action: { payload: string }
        ) => {
            const newColumn = {
                value: randomId(),
                label: action.payload,
                items: [],
            };

            state.columns = [...state.columns, newColumn];
        },
        addItem: (
            state: { columns: Column[] },
            action: {
                payload: {
                    newItemName: string;
                    columnIndex: number;
                };
            }
        ) => {
            const newItem = {
                id: randomId(),
                label: action.payload.newItemName,
            };

            const newColumns = [...state.columns];
            newColumns[action.payload.columnIndex].items.push(newItem);
            state.columns = newColumns;
        },
        deleteColumn: (
            state: { columns: Column[] },
            action: { payload: number }
        ) => {
            state.columns.splice(action.payload, 1);
        },
        deleteItem: (
            state: { columns: Column[] },
            action: { payload: { itemIndex: number; columnIndex: number } }
        ) => {
            const newColumns = [...state.columns];
            newColumns[action.payload.columnIndex].items.splice(
                action.payload.itemIndex,
                1
            );
            state.columns = newColumns;
        },
        setEditColumn: (
            state: { columnModal: Column | undefined; columns: Column[] },
            action: { payload: number | undefined }
        ) => {
            state.columnModal =
                action.payload !== undefined
                    ? state.columns[action.payload]
                    : undefined;
        },
        setEditItem: (
            state: { itemModal: Item | undefined },
            action: { payload: any | undefined }
        ) => {
            state.itemModal = action.payload;
        },
        onDragEnd: (state: { columns: Column[] }, action: { payload: any }) => {
            const { source, destination } = action.payload;

            if (!destination) {
                return;
            }

            const sInd = +source.droppableId;
            const dInd = +destination.droppableId;

            if (sInd === dInd) {
                const items: Item[] = reorder(
                    state.columns[sInd].items,
                    source.index,
                    destination.index
                );
                const newState = [...state.columns];
                newState[sInd].items = items;
                state.columns = newState;
            } else {
                const result = move(
                    state.columns[sInd].items,
                    state.columns[dInd].items,
                    source,
                    destination
                );
                const newState = [...state.columns];
                newState[sInd].items = result[sInd];
                newState[dInd].items = result[dInd];
                state.columns = newState;
            }
        },
        updateColumn: (
            state: { columns: Column[] },
            action: { payload: { value: string; label: string } }
        ) => {
            const columnIndex = state.columns.findIndex(
                ({ value }) => value === action.payload.value
            );
            if (columnIndex > -1) {
                state.columns[columnIndex].label = action.payload.label;
            }
        },
        updateItem: (
            state: { columns: Column[] },
            action: { payload: any }
        ) => {
            const { columnIndex, index, label } = action.payload;
            state.columns[columnIndex].items[index].label = label;
        },
    },
});

export const {
    addItem,
    addColumn,
    deleteColumn,
    deleteItem,
    setEditColumn,
    setEditItem,
    onDragEnd,
    updateColumn,
    updateItem,
} = columnsSlice.actions;

export default columnsSlice.reducer;
