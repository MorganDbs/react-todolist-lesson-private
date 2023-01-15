import React, { useState } from 'react';
import './TodoListBasic.css';

interface ListItem {
    id: string;
    label: string;
}

const TodoListBasic = () => {
    const [todo, setTodo] = useState<ListItem[]>([]);
    const [inProgress, setInProgress] = useState<ListItem[]>([]);
    const [done, setDone] = useState<ListItem[]>([]);
    const [newItemName, setNewItemName] = useState<string>('');
    const [newItemCategory, setNewItemCategory] = useState<string>('todo');

    const randomId = () => (Math.random() + 1).toString(36).substring(7);

    const handleOnNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemName(e.target.value);
    };

    const handleOnCategoryChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setNewItemCategory(e.target.value);
    };

    const handleOnClick = () => {
        const newItem = {
            id: randomId(),
            label: newItemName,
        };

        switch (newItemCategory) {
            case 'todo':
                setTodo([...todo, newItem]);
                break;
            case 'inProgress':
                setInProgress([...inProgress, newItem]);
                break;
            case 'done':
                setDone([...done, newItem]);
                break;
        }

        setNewItemName('');
        setNewItemCategory('todo');
    };

    return (
        <div className="todo-list-basic">
            <div className="todo-list-basic-add">
                <input onChange={handleOnNameChange} value={newItemName} />
                <select
                    onChange={handleOnCategoryChange}
                    value={newItemCategory}
                >
                    <option value="todo">To do</option>
                    <option value="inProgress">In progress</option>
                    <option value="done">Done</option>
                </select>
                <button disabled={!newItemName.length} onClick={handleOnClick}>
                    Add to list
                </button>
            </div>

            <div className="todo-list-basic-columns">
                <div>
                    <span>To do</span>
                    <ul>
                        {todo.map(({ id, label }) => (
                            <li key={id}>{label}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <span>In progress</span>
                    <ul>
                        {inProgress.map(({ id, label }) => (
                            <li key={id}>{label}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <span>Done</span>
                    <ul>
                        {done.map(({ id, label }) => (
                            <li key={id}>{label}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TodoListBasic;
