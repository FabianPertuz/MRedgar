const _ = require('lodash');
const chalk = require('chalk');
const inquirer = require('inquirer');

const validateNotEmpty = (input) => {
  if (_.trim(input).length === 0) {
    return chalk.red('Por favor, ingresa una descripción válida.');
  }
  return true;
};

const confirmAction = async (message = '¿Estás seguro?') => {
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message,
      default: false
    }
  ]);
  return confirm;
};

module.exports = {
  validateNotEmpty,
  confirmAction
};