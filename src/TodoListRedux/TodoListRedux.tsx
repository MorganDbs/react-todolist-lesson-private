import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AddColumn from './AddColumn/AddColumn';
import AddItem from './AddItem';
import ColumnComp from './Column';
import ColumnModal from './ColumnModal';
import ItemModal from './ItemModal';
import { onDragEnd, State } from './Slices/columnsSlice';
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

const TodoListEdit = () => {
    const dispatch = useDispatch();
    const columns = useSelector((state: State) => state.columnsStore.columns);

    const handleOnDragEnd = (result: DropResult) => {
        dispatch(onDragEnd(result));
    };

    return (
        <div className="todo-list-redux">
            <AddColumn />
            <AddItem />

            <div className="todo-list-redux-columns">
                <DragDropContext onDragEnd={handleOnDragEnd}>
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
                                    />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </div>

            <ItemModal />

            <ColumnModal />
        </div>
    );
};

export default TodoListEdit;
