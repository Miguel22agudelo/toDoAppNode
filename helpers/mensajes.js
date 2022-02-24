const { resolveObjectURL } = require("buffer");

require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("=======================".america);
    console.log("Seleccione una Opción");
    console.log("=======================\n".america);

    console.log(`${"1".cyan}. Crear Tarea`);
    console.log(`${"2".cyan}. Listar Tarea`);
    console.log(`${"3".cyan}. Listar Tareas Completadas`);
    console.log(`${"4".cyan}. Listar Tareas Pendientes`);
    console.log(`${"5".cyan}. Completar Tarea`);
    console.log(`${"6".cyan}. Borrar Tarea`);
    console.log(`${"0".cyan}. Salir \n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Seleccione una opción: ", (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(
      `\nPresione ${"ENTER".green} para continuar \n`,
      (opt) => {
        readline.close();
        resolve();
      }
    );
  });
};

module.exports = {
  mostrarMenu,
  pausa,
};
