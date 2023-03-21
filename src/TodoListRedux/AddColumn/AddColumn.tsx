import { Input, Button } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addColumn } from '../Slices/columnsSlice';

const AddColumn = () => {
    const [newColumnName, setColumnName] = useState<string>('');
    const dispatch = useDispatch();

    const handleOnColumnNameChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setColumnName(e.target.value);
    };

    const handleOnClickNewColumn = () => {
        dispatch(addColumn(newColumnName));
        setColumnName('');
    };

    return (
        <div className="todo-list-redux-add-column">
            <Input
                placeholder="Column name"
                onChange={handleOnColumnNameChange}
                value={newColumnName}
            />

            <Button
                disabled={!newColumnName.length}
                onClick={handleOnClickNewColumn}
            >
                Add column
            </Button>
        </div>
    );
};

export default AddColumn;
