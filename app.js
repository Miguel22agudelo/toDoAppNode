// const { mostrarMenu, pausa } = require("./helpers/mensajes");
require("colors");

const { guardarDB, leerBD } = require("./helpers/guardarArchivo");
const { inquireMenu, pause, leerInput } = require("./helpers/inquirer");
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
        console.log(tareas.listadoArr);
        break;
    }

    guardarDB(tareas.listadoArr);

    await pause();
    // await pausa(); -- Este es el método extraído de helpers/mensajes.js --
  } while (opt !== "0");
  //   pausa(); -- Este es el método extraído de helpers/mensajes.js --
};

main();
