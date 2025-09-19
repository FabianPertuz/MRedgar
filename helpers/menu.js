const inquirer = require('inquirer');
const chalk = require('chalk');

const showMenu = async () => {
  console.clear();
  console.log(chalk.blue.bold('=========================='));
  console.log(chalk.blue.bold('   GESTOR DE TAREAS CLI'));
  console.log(chalk.blue.bold('==========================\n'));
  
  const options = [
    { value: '1', name: `${chalk.green('1.')} Crear tarea` },
    { value: '2', name: `${chalk.green('2.')} Listar todas las tareas` },
    { value: '3', name: `${chalk.green('3.')} Listar tareas completadas` },
    { value: '4', name: `${chalk.green('4.')} Listar tareas pendientes` },
    { value: '5', name: `${chalk.green('5.')} Completar tarea(s)` },
    { value: '6', name: `${chalk.green('6.')} Eliminar tarea` },
    { value: '0', name: `${chalk.red('0.')} Salir\n` }
  ];
  
  const { opt } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opt',
      message: '¿Qué deseas hacer?',
      choices: options
    }
  ]);
  
  return opt;
};

const pause = async () => {
  await inquirer.prompt([
    {
      type: 'input',
      name: 'enter',
      message: `Presiona ${chalk.green('ENTER')} para continuar`
    }
  ]);
};

module.exports = {
  showMenu,
  pause
};