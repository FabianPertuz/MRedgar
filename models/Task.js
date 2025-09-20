
function Task(description) {
  return {
    description,
    completed: false,
    createdAt: new Date()
  };
}

module.exports = Task;
