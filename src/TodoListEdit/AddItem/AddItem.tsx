import React, { useState } from 'react';
import { Button, Input, Select } from 'antd';
import { Column } from '../TodoListEdit';

interface AddItemInterface {
    onClickNewItem(newItemName: string, newItemColumn: string): void;
    columns: Column[];
}

const AddItem = ({ onClickNewItem, columns }: AddItemInterface) => {
    const [newItemName, setNewItemName] = useState<string>('');
    const [newItemColumn, setNewItemColumn] = useState<string>();

    const handleOnItemNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemName(e.target.value);
    };

    const handleOnCategoryChange = (newValue: string) => {
        setNewItemColumn(newValue);
    };

    const handleOnClickNewItem = () => {
        onClickNewItem(newItemName, newItemColumn as string);

        setNewItemName('');
        setNewItemColumn(undefined);
    };

    return (
        <div className="todo-list-edit-add-item">
            <Input
                placeholder="Item name"
                onChange={handleOnItemNameChange}
                value={newItemName}
            />

            <Select
                placeholder="Select column"
                onChange={handleOnCategoryChange}
                value={newItemColumn}
                options={columns}
            />

            <Button
                disabled={!newItemName?.length || !newItemColumn}
                onClick={handleOnClickNewItem}
            >
                Add Item
            </Button>
        </div>
    );
};

export default AddItem;
