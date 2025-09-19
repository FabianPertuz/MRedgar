# MRedgarTask Manager CLI
Welcome to the Task Manager CLI project! This is an interactive console-based task management system where you can create, complete, and manage your tasks efficiently.

## 📋 Table of Contents
Description

Features

Prerequisites

Installation

Usage

Project Structure

Technologies Used

Contributing

## 📝 Description
This project is a task management system built with JavaScript and Node.js that runs in the console. Users can:

View all tasks

Create new tasks

Mark tasks as completed

Delete tasks

Filter tasks by status (all, completed, pending)

Enjoy persistent data storage between sessions

The application uses the inquirer library for user interaction and chalk for enhanced visual experience in the console.

## ✨ Features
Task Management: Create, complete, and delete tasks with ease

Advanced Filtering: View all tasks, completed tasks, or pending tasks

Data Persistence: All tasks are automatically saved to a JSON file

Input Validation: Prevent empty tasks and confirm destructive actions

Interactive Console Interface: User-friendly and visually appealing

## ✅ Prerequisites
Before getting started, make sure you have the following installed on your system:

Node.js (version 14 or higher)

npm (Node.js package manager)

## 🚀 Installation
Follow these steps to install and run the project on your local machine:

Clone or download the project files to your machine

Navigate to the project directory:

--cd task-manager
--npm install
--npm start
--node main.js

## 🎮 Usage
Follow the instructions in the console to interact with the task manager. You can choose from various menu options to manage your tasks effectively.

## 🗂️ Project Structure

task-manager/
├── main.js                 # Main entry point of the application
├── package.json            # Project configuration and dependency management
├── tasks.json             # Data file (automatically created)
├── controllers/           # Folder containing task management logic
│   └── tasksController.js  # Functions for task operations
├── helpers/               # Folder containing helper functions
│   ├── menu.js            # Functions for displaying menus
│   └── validators.js      # Input validation functions
├── models/                # Folder containing data models
│   └── Task.js            # Task class definition
└── utils/                 # Folder containing utility functions
    └── fileHandler.js     # File read/write operations


## 🛠️ Technologies Used
Node.js

Inquirer.js - Interactive command line user interfaces

Lodash - JavaScript utility library

Chalk - Terminal string styling

NanoID - Tiny, secure URL-friendly unique string ID generator