import React from 'react';
import { List } from 'antd';
import { Item } from '../TodoListRedux';
import ItemComp from './Item';
import Header from './Header';
import { Draggable } from 'react-beautiful-dnd';

interface ColumnInterface {
    value: string;
    label: string;
    index: number;
    columnItems: Item[];
    onDeleteItem(itemIndex: number, columnIndex: number): void;
    onEditItem(id: string): void;
    onEditColumn(id: string): void;
    onDeleteColumn(id: string): void;
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
});

const Column = ({
    value,
    label,
    index,
    columnItems,
    onDeleteItem,
    onEditItem,
    onEditColumn,
    onDeleteColumn,
}: ColumnInterface) => {
    return (
        <List
            key={value}
            header={
                <Header
                    label={label}
                    onEditColumn={() => onEditColumn(value)}
                    onDeleteColumn={() => onDeleteColumn(value)}
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
                                    onDeleteItem(itemIndex, index)
                                }
                                onEditItem={() => onEditItem(id)}
                            />
                        </div>
                    )}
                </Draggable>
            )}
        />
    );
};

export default Column;
