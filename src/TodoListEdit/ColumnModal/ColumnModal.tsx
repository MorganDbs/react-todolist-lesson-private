import { Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Column } from '../TodoListEdit';

interface ColumnModalInterface {
    column: Column | undefined;
    onCloseColumn(): void;
    onSaveColumn(newColumn: Column): void;
}

const ColumnModal = ({
    column,
    onCloseColumn,
    onSaveColumn,
}: ColumnModalInterface) => {
    const [newColumnName, setNewColumnName] = useState<string>();

    useEffect(() => {
        setNewColumnName(column?.label);
    }, [column]);

    const handleOnSave = () => {
        if (newColumnName && column) {
            onSaveColumn({
                ...column,
                label: newColumnName,
            });
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewColumnName(e.target.value);
    };

    return (
        <Modal
            title="Column edition"
            open={column !== undefined}
            onOk={handleOnSave}
            okText="Save"
            onCancel={onCloseColumn}
            className="todo-list-edit-Column-modal"
        >
            <Input value={newColumnName} onChange={handleOnChange} />
        </Modal>
    );
};

export default ColumnModal;
