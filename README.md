# flux-common-store

[![Dependency Status](https://david-dm.org/nkbt/flux-common-store.svg)](https://david-dm.org/nkbt/flux-common-store)
[![devDependency Status](https://david-dm.org/nkbt/flux-common-store/dev-status.svg)](https://david-dm.org/nkbt/flux-common-store#info=devDependencies)

Flux Common Store

## Installation
```bash
npm install --save-dev flux-common-store
```

## Usage


#### ./stores/TodoStore.js
```js
import FluxCommonStore from 'flux-common-store';
import Dispatcher from '../Dispatcher';
import Constants from '../Constants';


let todos = {};


const create = text => {
  const id = Date.now();
  todos[id] = {id: id, complete: false, text: text};
};


const destroy = id => delete todos[id];


const TodoStore = Object.assign({}, FluxCommonStore, {
  getAll() {
    return todos;
  }
});


TodoStore.dispatcherIndex = Dispatcher.register(({actionType, payload}) => {
  switch (actionType) {
    case Constants.TODO_CREATE:
      const text = payload.text.trim();
      if (text !== '') {
        create(text);
        TodoStore.emitChange();
      }
      break;

    case Constants.TODO_DESTROY:
      destroy(payload.id);
      TodoStore.emitChange();
      break;

    default:
    // Empty
  }

  return true;
});


export default TodoStore;
```

#### ./components/TodoApp.js
```js
import TodoStore from '../stores/TodoStore';


const TodoApp = React.createClass({
  getInitialState() {
    return {todos: TodoStore.getAll()};
  },

  componentDidMount() {
    // Subscribe to TodoStore changes which returns `unsubscribe` function
    this.unsubscribe = TodoStore.addChangeListener(this.onChange);
  },

  componentWillUnmount() {
    this.unsubscribe();
  },

  onChange() {
    this.setState({todos: TodoStore.getAll()});
  },

  render() {
    return (
      <ul>
        {this.state.todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
      </ul>
    );
  }
});


export default TodoApp;
```

## License

MIT
