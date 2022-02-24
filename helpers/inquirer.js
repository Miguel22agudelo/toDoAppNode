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
        name: `${"5".green}. Complete Task`,
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

module.exports = {
  inquireMenu,
  pause,
  leerInput,
};
