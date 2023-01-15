import React from 'react';
import { List } from 'antd';
import { Item } from '../TodoListEdit';
import ItemComp from './Item';
import Header from './Header';

interface ColumnInterface {
    value: string;
    label: string;
    columnItems: Item[];
    onDeleteItem(id: string): void;
    onEditItem(id: string): void;
    onEditColumn(id: string): void;
    onDeleteColumn(id: string): void;
}

const Column = ({
    value,
    label,
    columnItems,
    onDeleteItem,
    onEditItem,
    onEditColumn,
    onDeleteColumn,
}: ColumnInterface) => {
    return (
        <List
            className="todo-list-edit-column"
            key={value}
            header={
                <Header
                    label={label}
                    onEditColumn={() => onEditColumn(value)}
                    onDeleteColumn={() => onDeleteColumn(value)}
                />
            }
            dataSource={columnItems}
            renderItem={({ label: itemLabel, id }) => (
                <ItemComp
                    label={itemLabel}
                    id={id}
                    onDeleteItem={() => onDeleteItem(id)}
                    onEditItem={() => onEditItem(id)}
                />
            )}
        />
    );
};

export default Column;
