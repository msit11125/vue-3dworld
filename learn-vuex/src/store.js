import Vue from 'vue'
import Vuex from 'vuex'
import 'es6-promise/auto'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        todos: []
    },
    mutations: {
        addTodo(state, todoText) {
            state.todos.push({
                text: todoText,
                done: false
            });
        },

        removeTodo(state, todo) {
            var index = state.todos.indexOf(todo);
            if (index >= 0) {
                state.todos.splice(index, 1);
            }
        },

        updateTodo(state, todo) {
            var index = state.todos.indexOf(todo);
            if (index >= 0) {
                state.todos[index] = todo;
            }
        },

        loadJSON(state, json) {
            state.todos = JSON.parse(json);
        }
    },
    getters: {
        doneTodos(state) {
            return state.todos.filter(todo => todo.done);
        },

        allTodos(state) {
            return state.todos;
        },

        toJSON(state) {
            return JSON.stringify(state.todos);
        }
    }
});

export default store;