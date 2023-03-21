import { Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEditItem, State, updateItem } from '../Slices/columnsSlice';

const ItemModal = () => {
    const dispatch = useDispatch();
    const item = useSelector((state: State) => state.columnsStore.itemModal);
    const [newItemName, setNewItemName] = useState<string>();

    useEffect(() => {
        setNewItemName(item?.label);
    }, [item]);

    const handleOnSave = () => {
        if (newItemName && item) {
            dispatch(
                updateItem({
                    ...item,
                    label: newItemName,
                })
            );
        }
        handleOnCloseItem();
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemName(e.target.value);
    };

    const handleOnCloseItem = () => {
        dispatch(setEditItem(undefined));
    };

    return (
        <Modal
            title="Item edition"
            open={item !== undefined}
            onOk={handleOnSave}
            okText="Save"
            onCancel={handleOnCloseItem}
            className="todo-list-redux-item-modal"
        >
            <Input value={newItemName} onChange={handleOnChange} />
        </Modal>
    );
};

export default ItemModal;
