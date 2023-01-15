import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import AddColumn from './AddColumn/AddColumn';
import AddItem from './AddItem';
import ColumnComp from './Column';
import Header from './Column/Header';
import ColumnModal from './ColumnModal';
import ItemModal from './ItemModal';
import './TodoListRedux.css';

export interface Column {
    value: string;
    label: string;
    items: Item[];
}

export interface Item {
    id: string;
    label: string;
}

const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
});

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

const TodoListEdit = () => {
    const [columns, setColumns] = useState<Column[]>([]);
    const [itemModal, setItemModal] = useState<Item>();
    const [columnModal, setColumnModal] = useState<Column>();

    const randomId = () => (Math.random() + 1).toString(36).substring(7);

    const handleOnClickNewColumn = (newColumnName: string) => {
        const newColumn = {
            value: randomId(),
            label: newColumnName,
            items: [],
        };

        setColumns([...columns, newColumn]);
    };

    const handleOnClickNewItem = (newItemName: string, columnIndex: number) => {
        const newItem = {
            id: randomId(),
            label: newItemName,
        };

        const newColumns = [...columns];
        newColumns[columnIndex].items.push(newItem);
        setColumns(newColumns);
    };

    const handleOnDeleteItem = (itemIndex: number, columnIndex: number) => {
        const newColumns = [...columns];
        newColumns[columnIndex].items.splice(itemIndex, 1);
        setColumns(newColumns);
    };

    const handleOnDeleteColumn = (idToRemove: string) => {
        setColumns(columns.filter(({ value }) => value !== idToRemove));
    };

    const handleOnEditItem = (idItem: string) => {
        // const item = items.find(({ id }) => id === idItem);
        // if (item) {
        //     setItemModal(item);
        // }
    };

    const handleOnEditColumn = (idColumn: string) => {
        const column = columns.find(({ value }) => value === idColumn);

        if (column) {
            setColumnModal(column);
        }
    };

    const handleOnCloseItem = () => {
        setItemModal(undefined);
    };

    const handleOnCloseColumn = () => {
        setColumnModal(undefined);
    };

    const handleOnSaveItem = (newItem: Item) => {
        // setItems(
        //     items.map((item) => (item.id === newItem.id ? newItem : item))
        // );
        // handleOnCloseItem();
    };

    const handleOnSaveColumn = (newColumn: Column) => {
        setColumns(
            columns.map((column) =>
                column.value === newColumn.value ? newColumn : column
            )
        );
        handleOnCloseColumn();
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }

        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        console.log({ sInd, dInd });

        if (sInd === dInd) {
            const items: Item[] = reorder(
                columns[sInd].items,
                source.index,
                destination.index
            );
            const newState = [...columns];
            newState[sInd].items = items;
            setColumns(newState);
        } else {
            const result = move(
                columns[sInd].items,
                columns[dInd].items,
                source,
                destination
            );

            const newState = [...columns];
            newState[sInd].items = result[sInd];
            newState[dInd].items = result[dInd];
            setColumns(newState);
        }
    };

    return (
        <div className="todo-list-redux">
            <AddColumn onClickNewColumn={handleOnClickNewColumn} />
            <AddItem onClickNewItem={handleOnClickNewItem} columns={columns} />

            <div className="todo-list-redux-columns">
                <DragDropContext onDragEnd={onDragEnd}>
                    {columns.map(({ value, label, items }, index) => (
                        <Droppable key={index} droppableId={`${index}`}>
                            {(provided, snapshot) => (
                                <div
                                    className="todo-list-redux-column"
                                    ref={provided.innerRef}
                                    style={getListStyle(
                                        snapshot.isDraggingOver
                                    )}
                                    {...provided.droppableProps}
                                >
                                    <ColumnComp
                                        value={value}
                                        label={label}
                                        index={index}
                                        columnItems={items}
                                        onDeleteItem={handleOnDeleteItem}
                                        onEditItem={handleOnEditItem}
                                        onEditColumn={handleOnEditColumn}
                                        onDeleteColumn={handleOnDeleteColumn}
                                    />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </div>

            <ItemModal
                item={itemModal}
                onCloseItem={handleOnCloseItem}
                onSaveItem={handleOnSaveItem}
                columns={columns}
            />

            <ColumnModal
                column={columnModal}
                onCloseColumn={handleOnCloseColumn}
                onSaveColumn={handleOnSaveColumn}
            />
        </div>
    );
};

export default TodoListEdit;
