require('dotenv').config();            
const chalk = require('chalk');
const { showMenu, pause } = require('./helpers/menu');
const {
  createTask,
  listTasks,
  completeTask,
  deleteTask
} = require('./controllers/taskscontrollers'); 
const { connectMongo, closeMongo } = require('./utils/mongo');

const main = async () => {
  console.log(chalk.blue.bold('¡Bienvenido al Gestor de Tareas de Don Edgar!'));

  try {
    await connectMongo(process.env.MONGO_URI, process.env.DB_NAME);

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
  } catch (err) {
    console.error(chalk.red('Error en la aplicación:'), err);
  } finally {
    await closeMongo();
  }
};

main();
