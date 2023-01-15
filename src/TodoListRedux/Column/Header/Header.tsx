import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

interface HeaderInterface {
    label: string;
    onEditColumn(): void;
    onDeleteColumn(): void;
}

const Header = ({ label, onEditColumn, onDeleteColumn }: HeaderInterface) => {
    return (
        <div className="todo-list-column-header">
            {label}

            <Button
                type="primary"
                size="small"
                icon={<EditOutlined />}
                onClick={onEditColumn}
            />

            <Button
                type="primary"
                danger
                size="small"
                icon={<CloseOutlined />}
                onClick={onDeleteColumn}
            />
        </div>
    );
};

export default Header;
