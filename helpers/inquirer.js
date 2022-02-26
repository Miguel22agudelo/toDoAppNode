const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "option",
    message: "What do you want to do?",
    choices: [
      {
        value: "1",
        name: `${"1".green}. Create Task`,
      },
      {
        value: "2",
        name: `${"2".green}. List Tasks`,
      },
      {
        value: "3",
        name: `${"3".green}. List Completed Tasks`,
      },
      {
        value: "4",
        name: `${"4".green}. List Pending Tasks`,
      },
      {
        value: "5",
        name: `${"5".green}. Complete Task(s)`,
      },
      {
        value: "6",
        name: `${"6".green}. Delete Task`,
      },
      {
        value: "0",
        name: `${"0".green}. Exit`,
      },
    ],
  },
];

const inquireMenu = async () => {
  console.clear();

  console.log("=======================".america);
  console.log("Select an Option");
  console.log("=======================\n".america);

  const { option } = await inquirer.prompt(preguntas);

  return option;
};

const pause = async () => {
  const confirmInput = [
    {
      type: "input",
      name: "confirm",
      message: `Press ${"ENTER".green} to continue`,
    },
  ];

  console.log("\n");
  await inquirer.prompt(confirmInput);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Please write one character at least";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: tarea.id,
      name: `${(idx + ".").green} ${tarea.desc}`,
    };
  });

  choices.unshift({
    //Método para agregar un registro en la primera posición.
    value: "0",
    name: `${"0. ".green}Go back`,
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Which one?",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: tarea.id,
      name: `${(idx + ".").green} ${tarea.desc}`,
      checked: tarea.completedAt ? true : false,
    };
  });

  const preguntas = [
    {
      type: "checkbox",
      name: "ids",
      message: "Select them:",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(preguntas);
  return ids;
};

module.exports = {
  inquireMenu,
  pause,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
};
