import { Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEditColumn, State, updateColumn } from '../Slices/columnsSlice';

const ColumnModal = () => {
    const dispatch = useDispatch();
    const column = useSelector(
        (state: State) => state.columnsStore.columnModal
    );
    const [newColumnName, setNewColumnName] = useState<string>();

    useEffect(() => {
        setNewColumnName(column?.label);
    }, [column]);

    const handleOnSave = () => {
        if (newColumnName && column) {
            dispatch(
                updateColumn({ value: column.value, label: newColumnName })
            );
        }
        handleOnCloseColumn();
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewColumnName(e.target.value);
    };

    const handleOnCloseColumn = () => {
        dispatch(setEditColumn(undefined));
    };

    return (
        <Modal
            title="Column edition"
            open={column !== undefined}
            onOk={handleOnSave}
            okText="Save"
            onCancel={handleOnCloseColumn}
            className="todo-list-redux-Column-modal"
        >
            <Input value={newColumnName} onChange={handleOnChange} />
        </Modal>
    );
};

export default ColumnModal;
