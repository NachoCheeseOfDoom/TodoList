import Alert from "./alert.js";
import Model from "../model.js";
// import View from "../view.js";

export default class AddTodo {
  constructor() {
    this.btn = document.getElementById('add');
    this.title = document.getElementById('title');
    this.description = document.getElementById('description');
    this.edit = document.getElementById('edit');

    this.alert = new Alert();
    this.model = new Model();
    // this.view = new View();
  }

  onClick(callback) {
    this.btn.onclick = () => {
      if (this.title.value === '' || this.description.value === '') {
        this.alert.show('Title and description are required')
      }
      else if (this.btn.textContent === 'UPDATE') {
        console.log('Title: ' + this.title.value)
        console.log('Description: ' + this.description.value)
        console.log('=================================')
        this.btn.textContent = 'Add'
      }
      else {
        this.alert.hide();
        callback(this.title.value, this.description.value);

        console.log('No editado')
        this.title.focus();
        this.title.value = '';
        this.description.value = '';
      }
    }
  }

  // onClick() {
  //   this.edit.onclick = () => {
  //     console.log('hello agains')
  //     // if (this.title.value === '' || this.description.value === '') {
  //     //   this.alert.show('Title and description are required')
  //     // }
  //   }
  // }
}