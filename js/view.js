import AddTodo from "./components/addTodo.js";
import Model from "./model.js";

export default class View {
  constructor() {
    this.btn = document.getElementById('add');
    this.title = document.getElementById('title');
    this.description = document.getElementById('description');
    this.edit = document.getElementById('edit');

    this.model = null;
    this.table = document.getElementById('table');

    this.addTodoForm = new AddTodo();
    this.model = new Model();

    this.addTodoForm.onClick((id, title, description) => this.upsertTodo(id, title, description));

  }


  setModel(model) {
    this.model = model;
  }

  render() {
    const todos = this.model.getTodos();
    todos.forEach((todo) => this.createRow(todo));
  }

  editRow(id, title, description) {
    const row = document.getElementById(id);
    row.children[0].innerText = title;
    row.children[1].innerText = description;
  }

  upsertTodo(id, title, description) {
    if (id) {
      this.model.editTodo(id, title, description);
      this.editRow(id, title, description);
    } else {
      const todo = this.model.addTodo(title, description);
      this.createRow(todo);
    }

  }

  createRow(todo) {
    const row = this.table.insertRow();
    row.setAttribute('id', todo.id);
    row.innerHTML = `
      <td>${todo.title}</td>
      <td>${todo.description}</td>
      <td class="text-center"></td>
      <td class="text-right"></td>
      <td class="text-left"></td>
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
    editBtn.onclick = () => this.editTodo(todo.id, todo.title, todo.description);
    row.children[4].appendChild(editBtn);
  }


  toggleCompleted(id) {
    this.model.toggleCompleted(id);
  }

  removeTodo(id) {
    this.model.removeTodo(id);
    document.getElementById(id).remove();
  }

  editTodo(id, title, description) {
    this.addTodoForm.prepareUpdate(id, title, description);
  }

} 