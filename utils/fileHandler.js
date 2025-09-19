const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '..', 'tasks.json');

const readTasksFromFile = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
};

const saveTasksToFile = async (tasks) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving tasks:', error);
    return false;
  }
};

module.exports = {
  readTasksFromFile,
  saveTasksToFile
};