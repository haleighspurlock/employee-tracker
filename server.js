const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: '',
  database: 'employeeDB',
});

// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
const start = () => {
  inquirer
    .prompt({
      name: 'mainPage',
      type: 'list',
      message: 'Would you like to to do?',
      choices: ['View All Employees', 'View All Department', 'View All Roles', 'Add Employee', 'Add Department', 'Add Role', 'Remove Employee', 'Update Employee Role', 'Exit Application'],
    })
    .then((answer) => {
      // based on their answer, switch statement
      switch(answer.choice) {
        case 'View All Employees':
            viewAllEmployees();
            break;
        case 'View All Departments':
            viewAllDepartments();
            break;
        case 'View All Roles':
            viewAllRoles();
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'Add Department':
            addDepartment();
            break;
        case 'Add Role':
            addRole();
            break;
        case 'Remove Employee':
            removeEmployee();
            break;
        case 'Update Employee Role':
            updateRole();
            break;
        case 'Exit Application':
            exitApp();
            break;
        }
    })
};
// pulls up list of all employees
const viewAllEmployees = () => {
  connection.query('SELECT * FROM employee', (err,res) => {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
};
// pulls up list of all departments
const viewAllDepartments = () => {
  connection.query('SELECT * FROM department', (err,res) => {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
};
// pulls up list of all roles
const viewAllRoles = () => {
  connection.query('SELECT * FROM role', (err,res) => {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
};

// add employee
const addEmployee = () => {
  inquirer
  .prompt([
    {
      name: 'firstname',
      type: 'input',
      message: 'What is the employees first name?',
    },
    {
      name: 'lastname',
      type: 'input',
      message: 'What is the employees last name?',
    },
    {
      name: 'roleID',
      type: 'input',
      message: 'What is the employees role ID number?',
    },
    {
      name: 'managerID',
      type: 'input',
      message: 'What is the manager ID number?',
    },
  ])
  .then((answer) => {
    connection.query(
      'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
      [answer.firstname, answer.lastname, answer.roleID, answer.managerID],
      (err) => {
        if (err) throw err;
        startPrompt();
      }
    );

  });
};

// add department
const addDepartment = () => {
  inquirer
  .prompt([
    {
      name: 'department',
      type: 'input',
      message: 'What is the name of the new department?',
    }, 
  ])
  .then((answer) => {
    connection.query(
      'INSERT INTO department (name) VALUES (?)',
      [answer.department],
      (err) => {
        if (err) throw err;
        startPrompt();
      }
    );
  });
};

//exits the application
const exitApp = () => {
  connection.end();
  process.exit();
};