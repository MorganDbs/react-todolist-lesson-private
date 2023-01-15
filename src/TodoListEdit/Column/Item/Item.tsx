import React from 'react';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { List, Button } from 'antd';

interface ItemInterface {
    label: string;
    id: string;
    onDeleteItem(): void;
    onEditItem(): void;
}

const Item = ({ label, id, onDeleteItem, onEditItem }: ItemInterface) => {
    return (
        <List.Item className="todo-list-edit-item">
            {label}
            <div className="todo-list-edit-item-action">
                <Button
                    type="primary"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={onEditItem}
                />
                <Button
                    type="primary"
                    danger
                    size="small"
                    icon={<CloseOutlined />}
                    onClick={onDeleteItem}
                />
            </div>
        </List.Item>
    );
};

export default Item;
