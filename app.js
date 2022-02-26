// const { mostrarMenu, pausa } = require("./helpers/mensajes");
require("colors");

const { guardarDB, leerBD } = require("./helpers/guardarArchivo");
const {
  inquireMenu,
  pause,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer");
const Task = require("./models/task");
const Tasks = require("./models/tasks");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tasks();
  const listadoBD = leerBD();

  if (listadoBD) {
    tareas.cargarTareasFromArray(listadoBD);
  }

  do {
    //Imprimir menú
    opt = await inquireMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Description:");
        tareas.createTask(desc);
        break;

      case "2":
        tareas.listadoCompleto();
        break;

      case "3":
        tareas.listarTareasCompletadas(true);
        break;

      case "4":
        tareas.listarTareasCompletadas(false);
        break;

      case "5":
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toogleCompletadas(ids);
        break;

      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar("Are you sure you want to delete it?");

          if (ok) {
            tareas.borrarTarea(id);
            console.log();
            console.log("=========================".cyan);
            console.log("Task deleted successfully!".green);
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);

    await pause();
    // await pausa(); -- Este es el método extraído de helpers/mensajes.js --
  } while (opt !== "0");
  //   pausa(); -- Este es el método extraído de helpers/mensajes.js --
};

main();
