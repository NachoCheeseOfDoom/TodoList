export default class Model {
  constructor() {
    this.view = null;
    this.todos = JSON.parse(localStorage.getItem('todos'));
    if (!this.todos || this.todos.length < 1) {
      this.todos = [];
      this.currentId = 0;
    } else {
      this.currentId = this.todos[this.todos.length - 1].id + 1;
    }
  }

  setView(view) {
    this.view = view;
  }

  getTodos() {
    return this.todos.map((todo) => ({ ...todo }));
  }

  findTodo(id) {
    return this.todos.findIndex((todo) => todo.id === id);
  }

  addTodo(title, description) {
    const todo = {
      id: this.currentId++,
      title,
      description,
      completed: false
    }
    console.log(todo)

    this.todos.push(todo);
    this.save();
    return { ...todo };
  }

  removeTodo(id) {
    const index = this.findTodo(id);
    this.todos.splice(index, 1);
    this.save();
  }


  // !==================================================================
  editTodo(id, title, description) {
    console.log(id, title, description)
    this.view.title.value = title;
    this.view.description.value = description;
    this.view.btn.textContent = 'UPDATE'

    // this.currentId.value = id;
    // id = this.currentId.value;
    this.currentId = 0;
    console.log(this.currentId)
    // console.log('new id: ' + id = this.currentId.value)
  }

  // updateTodo(id, title, description) {
  //   console.log(id, title, description)
  //   this.view.title.value = title;
  //   this.view.description.value = description;
  //   this.view.btn.textContent = 'UPDATE'
  // }
  // !==================================================================


  toggleCompleted(id) {
    const index = this.findTodo(id);
    const todo = this.todos[index];
    todo.completed = !todo.completed;
    this.save();
  }

  save() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  update() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}