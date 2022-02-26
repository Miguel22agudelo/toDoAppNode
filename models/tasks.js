const Task = require("./task");
require("colors");

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

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}`.green;
      const { desc, completedAt } = tarea;
      const estado = completedAt ? "Completed".green : "Pending".red;
      console.log(`${idx.green}${".".green} ${desc} :: ${estado}`);
    });
  }

  listarTareasCompletadas(completadas = true) {
    console.log();
    let contador = 0;
    this.listadoArr.forEach((tarea) => {
      const { desc, completedAt } = tarea;
      const estado = completedAt ? "Completed".green : "Pending".red;
      if (completadas) {
        if (completedAt) {
          contador += 1;
          console.log(
            `${contador.toString().green}${".".green} ${desc} :: ${
              "Completed At: ".cyan
            }${completedAt.green}`
          );
        }
      } else {
        if (!completedAt) {
          contador += 1;
          console.log(
            `${contador.toString().green}${".".green} ${desc} :: ${estado}`
          );
        }
      }
    });
  }

  borrarTarea(id = "") {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  toogleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._list[id];
      if (!tarea.completedAt) {
        tarea.completedAt = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._list[tarea.id].completedAt = null;
      }
    });
  }
}

module.exports = Tasks;
