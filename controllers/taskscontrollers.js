const inquirer = require('inquirer');
const chalk = require('chalk');
const _ = require('lodash');
const { ObjectId } = require('mongodb');

const { validateNotEmpty, confirmAction } = require('../helpers/validators');
const { getDb } = require('../utils/mongo');

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

  const db = getDb();
  const tasksColl = db.collection('tasks');

  const newTask = {
    description,
    completed: false,
    createdAt: new Date()
  };

  try {
    await tasksColl.insertOne(newTask);
    console.log(chalk.green('✓ Tarea creada con éxito'));
  } catch (err) {
    console.error(chalk.red('✗ Error al guardar la tarea:'), err);
  }
};

const listTasks = async (filter = 'all') => {
  const db = getDb();
  const tasksColl = db.collection('tasks');

  let query = {};
  let title = 'TODAS LAS TAREAS';
  if (filter === 'completed') {
    query = { completed: true };
    title = 'TAREAS COMPLETADAS';
  } else if (filter === 'pending') {
    query = { completed: false };
    title = 'TAREAS PENDIENTES';
  }

  const tasks = await tasksColl.find(query).sort({ createdAt: -1 }).toArray();

  if (_.isEmpty(tasks)) {
    console.log(chalk.yellow('No hay tareas para mostrar.'));
    return;
  }

  console.log(chalk.blue.bold(`\n${title}\n`));
  tasks.forEach((task, i) => {
    const status = task.completed
      ? chalk.green('✓ Completada')
      : chalk.red('✗ Pendiente');
    console.log(
      `${chalk.blue(i + 1 + '.')} ${task.description} :: ${status} :: ${new Date(task.createdAt).toLocaleDateString()}`
    );
  });
  console.log('');
};

const completeTask = async () => {
  const db = getDb();
  const tasksColl = db.collection('tasks');

  const pendingTasks = await tasksColl.find({ completed: false }).toArray();
  if (_.isEmpty(pendingTasks)) {
    console.log(chalk.yellow('No hay tareas pendientes para completar.'));
    return;
  }

  const { taskId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'taskId',
      message: 'Selecciona la tarea a completar:',
      choices: pendingTasks.map((t, idx) => ({
        name: `${idx + 1}. ${t.description}`,
        value: t._id.toString()
      }))
    }
  ]);

  const result = await tasksColl.updateOne(
    { _id: new ObjectId(taskId) },
    { $set: { completed: true, completedAt: new Date() } }
  );

  if (result.modifiedCount === 1) {
    console.log(chalk.green('✓ Tarea marcada como completada'));
  } else {
    console.log(chalk.red('✗ No se pudo actualizar la tarea'));
  }
};

const deleteTask = async () => {
  const db = getDb();
  const tasksColl = db.collection('tasks');

  const tasks = await tasksColl.find({}).toArray();
  if (_.isEmpty(tasks)) {
    console.log(chalk.yellow('No hay tareas para eliminar.'));
    return;
  }

  const { taskId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'taskId',
      message: 'Selecciona la tarea a eliminar:',
      choices: tasks.map((t, idx) => ({
        name: `${idx + 1}. ${t.description} [${t.completed ? 'Completada' : 'Pendiente'}]`,
        value: t._id.toString()
      }))
    }
  ]);

  const confirm = await confirmAction('¿Estás seguro de que quieres eliminar esta tarea?');
  if (!confirm) {
    console.log(chalk.yellow('Eliminación cancelada.'));
    return;
  }

  const result = await tasksColl.deleteOne({ _id: new ObjectId(taskId) });
  if (result.deletedCount === 1) {
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
