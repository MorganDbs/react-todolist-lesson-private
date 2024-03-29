import React, { useState } from 'react';
import { Button, Input, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, State } from '../Slices/columnsSlice';

const AddItem = () => {
    const dispatch = useDispatch();
    const columns = useSelector((state: State) => state.columnsStore.columns);
    const [newItemName, setNewItemName] = useState<string>('');
    const [newItemColumn, setNewItemColumn] = useState<string>();

    const handleOnItemNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemName(e.target.value);
    };

    const handleOnCategoryChange = (newValue: string) => {
        setNewItemColumn(newValue);
    };

    const handleOnClickNewItem = () => {
        const columnIndex = columns.findIndex(
            ({ value }) => value === newItemColumn
        );

        if (columnIndex !== -1) {
            dispatch(addItem({ newItemName, columnIndex }));

            setNewItemName('');
            setNewItemColumn(undefined);
        }
    };

    return (
        <div className="todo-list-redux-add-item">
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
