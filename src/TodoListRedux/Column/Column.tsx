import React from 'react';
import { List } from 'antd';
import { Item } from '../TodoListRedux';
import ItemComp from './Item';
import Header from './Header';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import {
    deleteColumn,
    deleteItem,
    setEditColumn,
    setEditItem,
} from '../Slices/columnsSlice';

interface ColumnInterface {
    value: string;
    label: string;
    index: number;
    columnItems: Item[];
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
});

const Column = ({ value, label, index, columnItems }: ColumnInterface) => {
    const dispatch = useDispatch();

    return (
        <List
            key={value}
            header={
                <Header
                    label={label}
                    onEditColumn={() => dispatch(setEditColumn(index))}
                    onDeleteColumn={() => dispatch(deleteColumn(index))}
                />
            }
            dataSource={columnItems}
            renderItem={({ label: itemLabel, id }, itemIndex) => (
                <Draggable key={id} draggableId={id} index={itemIndex}>
                    {(provided, snapshot) => (
                        <div
                            className="todo-list-redux-item"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}
                        >
                            <ItemComp
                                label={itemLabel}
                                id={id}
                                onDeleteItem={() =>
                                    dispatch(
                                        deleteItem({
                                            itemIndex,
                                            columnIndex: index,
                                        })
                                    )
                                }
                                onEditItem={() =>
                                    dispatch(
                                        setEditItem({
                                            label: itemLabel,
                                            index: itemIndex,
                                            columnIndex: index,
                                            columnValue: value,
                                        })
                                    )
                                }
                            />
                        </div>
                    )}
                </Draggable>
            )}
        />
    );
};

export default Column;
