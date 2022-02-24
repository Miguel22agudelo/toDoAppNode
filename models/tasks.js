const Task = require("./task");

class Tasks {
  _list = {};

  constructor() {
    this._list = {};
  }

  get listadoArr() {
    const listado = [];
    Object.keys(this._list).forEach((key) => {
      const tarea = this._list[key];
      listado.push(tarea);
    });

    return listado;
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._list[tarea.id] = tarea;
    });
  }

  createTask(desc = "") {
    const task = new Task(desc);
    this._list[task.id] = task;
  }
}

module.exports = Tasks;
