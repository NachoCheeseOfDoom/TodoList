import AddTodo from "./components/addTodo.js";

export default class View {
  constructor() {
    this.title = document.getElementById('title');
    this.description = document.getElementById('description');

    this.model = null;
    this.table = document.getElementById('table');

    this.addTodoForm = new AddTodo();

    this.addTodoForm.onClick((title, description) => this.addTodo(title, description));
  }

  setModel(model) {
    this.model = model;
  }

  render() {
    const todos = this.model.getTodos();
    todos.forEach((todo) => this.createRow(todo));
  }

  addTodo(title, description) {
    const todo = this.model.addTodo(title, description);
    this.createRow(todo);
  }

  createRow(todo) {
    const row = this.table.insertRow();
    row.setAttribute('id', todo.id);
    row.innerHTML = `
      <td>${todo.title}</td>
      <td>${todo.description}</td>
      <td class="text-center"></td>
      <td class="text-right"></td>
    `;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.onclick = () => this.toggleCompleted(todo.id);
    row.children[2].appendChild(checkbox);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
    removeBtn.innerHTML = ` <i class="fa fa-trash"></i>`;
    removeBtn.onclick = () => this.removeTodo(todo.id);
    row.children[3].appendChild(removeBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'btn-warning', 'mb-1', 'ml-1');
    editBtn.innerHTML = ` <i class="fa fa-edit"></i>`;
    editBtn.onclick = () => this.editTodo(todo.id);
    row.children[3].appendChild(editBtn);

    const updateBtn = document.createElement('button');
    updateBtn.classList.add('btn', 'btn-success', 'mb-1', 'ml-1');
    updateBtn.innerHTML = ` <i class="fa fa-check"></i>`;
    updateBtn.onclick = () => this.updateTodo(todo.id);
    row.children[3].appendChild(updateBtn);
  }




  toggleCompleted(id) {
    this.model.toggleCompleted(id);
  }

  removeTodo(id) {
    this.model.removeTodo(id);
    document.getElementById(id).remove();
  }

  editTodo(id) {
    this.title.value = 'hola';
  }

  updateTodo(id) {
    this.model.updateTodo(id);
    document.getElementById(id).update();
  }
} 