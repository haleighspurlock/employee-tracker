const mysql = require('mysql');
const inquirer = require('inquirer');
const tableMaker = require('console.table');
var figlet = require('figlet');
// found a cool npm package to add some good juju to my project :)  
figlet('Employee Tracker!', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

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
// add 'remove employee' back to list at some point
const start = () => {
  inquirer
    .prompt({
      name: 'mainPage',
      type: 'list',
      message: 'Would you like to to do?',
      choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Add Department', 'Add Role', 'Remove Employee', 'Remove Department', 'Remove Role','Update Employee Role', 'Exit Application'],
    })
    .then((answer) => {
      // based on their answer, switch statement
      switch(answer.mainPage) {
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
        case 'Remove Department':
            removeDepartment();
            break;
        case 'Remove Role':
            removeRole();
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
    console.table(res)
    start();
  });
};

// pulls up list of all departments
const viewAllDepartments = () => {
  connection.query('SELECT * FROM department', (err,res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};
// pulls up list of all roles
const viewAllRoles = () => {
  connection.query('SELECT * FROM role', (err,res) => {
    if (err) throw err;
    console.table(res);
    start();
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
  ])
  .then((answer) => {
    connection.query(
      'INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)',
      [answer.firstname, answer.lastname, answer.roleID],
      (err) => {
        if (err) throw err;
        start();
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
        start();
      }
    );
  });
};

// add role
const addRole = () => {
  inquirer
  .prompt([
    {
      name: 'title',
      type: 'input',
      message: 'What is the role title?',
    },
    {
      name: 'salary',
      type: 'input',
      message: 'What is the role salary?',
    },
    {
      name: 'depID',
      type: 'input',
      message: 'What is the roles department ID?',
    }, 
  ])
  .then((answer) => {
    connection.query(
      'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
      [answer.title, answer.salary, answer.depID],
      (err) => {
        if (err) throw err;
        start();
      }
    );
  });
};

// remove employee
const removeEmployee = () => {
  connection.query(
    'SELECT * FROM employee', (err, employees) => {
      inquirer
      .prompt({
        name: 'deleteEmployee',
        type: 'list',
        message: 'Which employee do you need to delete?',
        choices: employees.map((emp)=> `${emp.first_name} ${emp.last_name} ${emp.id}`),
      })
      .then((answer)=> {
        let employeeGone = answer.deleteEmployee.split(' ')[1]
        connection.query(
          `DELETE employee FROM employee WHERE last_name = '${employeeGone}'`,
          (err) => {
            if (err) throw err;
            start();
          });
      });
    });
};

// remove department
const removeDepartment = () => {
  connection.query(
    'SELECT * FROM department', (err, department) => {
      inquirer
      .prompt({
        name: 'deleteDepartment',
        type: 'list',
        message: 'Which department do you need to delete?',
        choices: department.map((dep)=> `${dep.name}`),
      })
      .then((answer)=> {
        let departmentGone = answer.deleteDepartment
        console.log(departmentGone)
        connection.query(
          `DELETE FROM department WHERE name = '${departmentGone}'`,
          (err) => {
            if (err) throw err;
            start();
          }
        );
      })
    }
  )
};

// remove role
const removeRole = () => {
  connection.query(
    'SELECT * FROM role', (err, role) => {
      inquirer
      .prompt({
        name: 'deleteRole',
        type: 'list',
        message: 'Which role do you need to delete?',
        choices: role.map((delRole)=> `${delRole.title}`),
      })
      .then((answer)=> {
        let roleGone = answer.deleteRole
        connection.query(
          `DELETE FROM role WHERE title = '${roleGone}'`,
          (err) => {
            if (err) throw err;
            start();
          }
        );
      })
    }
  )
};

// update employee roles
const updateRole = () => {
connection.query(
  'SELECT * FROM employee', (err, employees) => {
    inquirer
    .prompt({
      name: 'updateRole',
      type: 'list',
      message: 'Which employee do you need to update?',
      choices: employees.map((emp)=> `${emp.first_name} ${emp.last_name} ${emp.id}`),
    })
    .then((answer)=> {
      let empId = answer.updateRole.split(' ')[2]
      inquirer
      .prompt({
        name: 'selectRole',
        type: 'list',
        message: 'What is the employees new role?',
        choices: ['Front-End Engineer', 'Back-End Engineer', 'Full-Stack Engineer', 'Financial Planner', 'Accountant', 'Budget Analyst', 'Legal Analyst', 'Case Manager', 'Administrative Assistant', 'Sales Support Staff', 'Account Manager', 'Lead Development Specialist'],
      })
      .then((answer)=> {
        let role = answer.selectRole
        connection.query(
          `SELECT id, title FROM role WHERE title = '${role}'`, (err, roles) => {
            let roleid = roles[0].id
            connection.query(
              `UPDATE employee SET role_id = ${roleid} WHERE id = ${empId}`,
              (err) => {
                if (err) throw err;
                start();
              }
            )
          }
        )
      })
    })
  }
)};

//exits the application
const exitApp = () => {
  connection.end();
  process.exit();
};