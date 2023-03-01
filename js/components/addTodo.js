import Alert from "./alert.js";
import Model from "../model.js";
// import View from "../view.js";

export default class AddTodo {
  constructor() {
    this.btn = document.getElementById('add');
    this.title = document.getElementById('title');
    this.description = document.getElementById('description');
    this.id = null;

    this.alert = new Alert();
    this.model = new Model();
  }

  prepareUpdate(id, title, description) {
    this.id = id;
    this.title.value = title;
    this.description.value = description;
    console.log(`Old: id:${id}, Title:${title}, Des:${description}`)
    this.btn.textContent = 'UPDATE'
  }

  onClick(callback) {
    this.btn.onclick = () => {
      if (this.title.value === '' || this.description.value === '') {
        this.alert.show('Title and description are required')
      }
      else if (this.btn.textContent === 'UPDATE') {
        callback(this.id, this.title.value, this.description.value);
        this.btn.textContent = 'Add'
        this.title.value = '';
        this.description.value = '';
      }
      else {
        this.alert.hide();
        callback(undefined, this.title.value, this.description.value);
        this.title.focus();
        this.title.value = '';
        this.description.value = '';
      }
    }
  }
}

