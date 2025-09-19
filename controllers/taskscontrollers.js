const inquirer = require('inquirer');
const chalk = require('chalk');
const _ = require('lodash');
const Task = require('../models/task');
const { readTasksFromFile, saveTasksToFile } = require('../utils/filehandler');
const { 
  validateNotEmpty, 
  confirmAction 
} = require('../helpers/validators');

const createTask = async () => {
  console.log(chalk.yellow.bold('\nCrear Nueva Tarea\n'));
  
  const { description } = await inquirer.prompt([
    {
      type: 'input',
      name: 'description',
      message: 'Descripción de la tarea:',
      validate: validateNotEmpty
    }
  ]);
  
  const tasks = await readTasksFromFile();
  const newTask = new Task(description);
  
  tasks.push(newTask);
  const saved = await saveTasksToFile(tasks);
  
  if (saved) {
    console.log(chalk.green('✓ Tarea creada con éxito'));
  } else {
    console.log(chalk.red('✗ Error al guardar la tarea'));
  }
};

const listTasks = async (filter = 'all') => {
  const tasks = await readTasksFromFile();
  
  if (_.isEmpty(tasks)) {
    console.log(chalk.yellow('No hay tareas para mostrar.'));
    return;
  }
  
  let filteredTasks = tasks;
  let title = 'TODAS LAS TAREAS';
  
  if (filter === 'completed') {
    filteredTasks = _.filter(tasks, { completed: true });
    title = 'TAREAS COMPLETADAS';
  } else if (filter === 'pending') {
    filteredTasks = _.filter(tasks, { completed: false });
    title = 'TAREAS PENDIENTES';
  }
  
  // Order by creation date (newest first)
  const orderedTasks = _.orderBy(filteredTasks, ['createdAt'], ['desc']);
  
  console.log(chalk.blue.bold(`\n${title}\n`));
  
  orderedTasks.forEach((task, index) => {
    const status = task.completed 
      ? chalk.green('✓ Completada') 
      : chalk.red('✗ Pendiente');
    
    console.log(
      `${chalk.blue(index + 1 + '.')} ${task.description} :: ${status} :: ${new Date(task.createdAt).toLocaleDateString()}`
    );
  });
  
  console.log('\n');
};

const completeTask = async () => {
  const tasks = await readTasksFromFile();
  const pendingTasks = _.filter(tasks, { completed: false });
  
  if (_.isEmpty(pendingTasks)) {
    console.log(chalk.yellow('No hay tareas pendientes para completar.'));
    return;
  }
  
  const choices = pendingTasks.map((task, index) => ({
    name: `${index + 1}. ${task.description}`,
    value: task.id
  }));
  
  const { taskId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'taskId',
      message: 'Selecciona la tarea a completar:',
      choices
    }
  ]);
  
  const taskIndex = _.findIndex(tasks, { id: taskId });
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = true;
    tasks[taskIndex].completedAt = new Date();
    
    const saved = await saveTasksToFile(tasks);
    if (saved) {
      console.log(chalk.green('✓ Tarea marcada como completada'));
    } else {
      console.log(chalk.red('✗ Error al actualizar la tarea'));
    }
  }
};

const deleteTask = async () => {
  const tasks = await readTasksFromFile();
  
  if (_.isEmpty(tasks)) {
    console.log(chalk.yellow('No hay tareas para eliminar.'));
    return;
  }
  
  const choices = tasks.map((task, index) => ({
    name: `${index + 1}. ${task.description} [${task.completed ? 'Completada' : 'Pendiente'}]`,
    value: task.id
  }));
  
  const { taskId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'taskId',
      message: 'Selecciona la tarea a eliminar:',
      choices
    }
  ]);
  
  const confirm = await confirmAction('¿Estás seguro de que quieres eliminar esta tarea?');
  if (!confirm) {
    console.log(chalk.yellow('Eliminación cancelada.'));
    return;
  }
  
  // Remove duplicates by ID just in case
  const uniqueTasks = _.uniqBy(tasks, 'id');
  const filteredTasks = _.filter(uniqueTasks, task => task.id !== taskId);
  
  const saved = await saveTasksToFile(filteredTasks);
  if (saved) {
    console.log(chalk.green('✓ Tarea eliminada con éxito'));
  } else {
    console.log(chalk.red('✗ Error al eliminar la tarea'));
  }
};

module.exports = {
  createTask,
  listTasks,
  completeTask,
  deleteTask
};