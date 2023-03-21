import React from 'react';
import { Provider } from 'react-redux';
import TodoListRedux from './TodoListRedux';
import store from './store';

const TodoListReduxWrapper = () => {
    return (
        <Provider store={store}>
            <TodoListRedux />
        </Provider>
    );
};

export default TodoListReduxWrapper;
