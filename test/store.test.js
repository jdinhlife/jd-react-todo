import test from 'tape';
import { makeStore } from '../js/store';
import { newTodo, toggleTodo } from '../js/actions';
import { DISPLAY_ALL } from '../js/constants'

test('store', (nest) => {

    nest.test('...returns initial state', (t) => {
        const expectedState = { todos: [], todosFilter: DISPLAY_ALL };
        const store = makeStore();
        const actualState = store.getState();

        t.deepEqual(actualState, expectedState, 'should return an object with empty todos array');
        t.end();
    });

    nest.test('...dispatches create new todo', (t) => {
        const content = 'Todo #1';
        const expectedState = {
            todos: [
                {
                    id:        0,
                    completed: false,
                    content
                }
            ],
            todosFilter: DISPLAY_ALL
        };

        const store = makeStore();
        store.dispatch(newTodo(content));

        const actualState = store.getState();

        t.deepEqual(actualState, expectedState, 'should return state with todos array contains 1st item');
        t.end();
    });

    nest.test('...dispatches toggle todo', (t) => {
        const content1 = 'Todo #1',
            content2 = 'Todo #2',
            content3 = 'Todo #3';

        const expectedState = {
            todos: [
                {
                    id:        0,
                    completed: false,
                    content:   content1
                },
                {
                    id:        2,
                    completed: false,
                    content:   content3
                },
                {
                    id:        1,
                    completed: true,
                    content:   content2
                }
            ],
            todosFilter: DISPLAY_ALL
        };

        const store = makeStore();
        store.dispatch(newTodo(content1));
        store.dispatch(newTodo(content2));
        store.dispatch(newTodo(content3));
        store.dispatch(toggleTodo(1));

        const actualState = store.getState();

        t.deepEqual(actualState, expectedState, 'should return todos list with 2 incomplete and 1 completed');
        t.end();
    });
});
