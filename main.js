const inquirer = require('inquirer');
const chalk = require('chalk');
const { showMenu, pause } = require('./helpers/menu');
const { 
  createTask, 
  listTasks, 
  completeTask, 
  deleteTask 
} = require('./controllers/taskscontrollers');

const main = async () => {
  console.log(chalk.blue.bold('¡Bienvenido al Gestor de Tareas de Don Edgar!'));
  
  let opt = '';
  do {
    opt = await showMenu();
    
    switch (opt) {
      case '1':
        await createTask();
        break;
      case '2':
        await listTasks();
        break;
      case '3':
        await listTasks('completed');
        break;
      case '4':
        await listTasks('pending');
        break;
      case '5':
        await completeTask();
        break;
      case '6':
        await deleteTask();
        break;
      case '0':
        console.log(chalk.green('¡Hasta luego!'));
        break;
    }
    
    if (opt !== '0') await pause();
  } while (opt !== '0');
};

main();