const { nanoid } = require('nanoid');

class Task {
  constructor(description) {
    this.id = nanoid();
    this.description = description;
    this.completed = false;
    this.createdAt = new Date();
  }
}

module.exports = Task;