const inquirer = require("inquirer");
const connection = require("./mysql-connection/connection");
const cTable = require("console.table");
const logo = require("asciiart-logo");
const config = require("./package.json");

function startUp() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add Employees",
        "Add Departments",
        "Add Roles",
        "Update Employee Role",
        "exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View All Employees":
          empAllSearch();
          break;
        case "View All Departments":
          deptSearch();
          break;
        case "View All Roles":
          roleSearch();
          break;
        case "Add Employees":
          addEmp();
          break;
        case "Add Departments":
          addDept();
          break;
        case "Add Roles":
          addRole();
          break;
        case "Update Employee Role":
          updateEmpRole();
          break;
        case "exit":
          connection.end();
          break;
      }
    });
}

function empAllSearch() {
  connection.query(
    "SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.role_id LEFT JOIN department on role.department_id = department.department_id LEFT JOIN employee manager on manager.manager_id = employee.manager_id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startUp();
    }
  );
}

function deptSearch() {
  connection.query("SELECT * from department", function (err, res) {
    if (err) throw err;
    console.table(res);
    startUp();
  });
}

function roleSearch() {
  connection.query("SELECT * from role", function (err, res) {
    if (err) throw err;
    console.table(res);
    startUp();
  });
}

function updateEmpManager(empID, roleID) {
  console.log(empID, roleID);
  connection.query("UPDATE employee SET role_id = ? WHERE employee_id = ?", [roleID, empID]);
}

function addEmp() {
  let questions = [
    {
      type: "input",
      message: "What's the employee's first name?",
      name: "first_name",
    },
    {
      type: "input",
      message: "What's the employee's last name?",
      name: "last_name",
    },
    {
      type: "input",
      message: "What's the employee's title (role_id)?",
      name: "titleID",
    },
    {
      type: "input",
      message: "Who's the employee's manager (employee_id)?",
      name: "managerID",
    },
  ];
  inquirer.prompt(questions).then(function (answer) {
    connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: answer.titleID,
        manager_id: answer.managerID,
      },
      function (error) {
        if (error) throw error;
        updateEmpManager(answer.titleID, answer.managerID);
        empAllSearch();
      }
    );
  });
}

function addDept() {
  inquirer
    .prompt({
      type: "input",
      message: "What would you like to name the new department?",
      name: "department",
    })
    .then(function (answer) {
      console.log(answer.department);
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.department,
        },
        function (err, res) {
          if (err) throw err;
          startUp();
        }
      );
    });
}

function addRole() {
  let questions = [
    {
      type: "input",
      message: "What type of role would you like to add?",
      name: "title",
    },
    {
      type: "input",
      message: "In what department is the new role?",
      name: "id",
    },
    {
      type: "list",
      message: "What is the salary for this role?",
      name: "salary",
      choices: [10, 20, 30],
    },
  ];
  inquirer.prompt(questions).then(function (answer) {
    connection.query(
      "INSERT INTO role SET ?",
      {
        title: answer.title,
        department_id: answer.id,
        salary: answer.salary,
      },
      function (error, res) {
        if (error) throw error;
        startUp();
      }
    );
  });
}
function updateEmpRole() {
  connection.query("SELECT * FROM employee", (empErr, empData) => {
    if (empErr) throw empErr;
    connection.query("SELECT * FROM role", (roleErr, roleData) => {
      if (roleErr) throw roleErr;

      const employees = [];
      for (i = 0; i < empData.length; i++) {
        const firstLast = empData[i].first_name + empData[i].last_name;
        employees.push(firstLast);
      }
      const roles = [];
      for (i = 0; i < roleData.length; i++) {
        roles.push(roleData[i].title);
      }
    
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeId",
            message: " Which employee's role would you like to update?",
            choices: employees,
          },

          {
            type: "list",
            name: "newRole",
            message: "What is their new role?",
            choices: roles,
          },
        ])
        .then((answer) => {
          console.log(answer);
          // if answer =
          // need if statement that compares the answer from your inquirer prompt to the data in your database based on the
          // formatting of the answer from your inquirer prompt

          //once you've found a match, we need to ask what new role are we giving them
          //This is going to require another inquirer.prompt().then()

          //Inside of the second inquire, then use the connection.query below to go into the database and
          //change the role of the employee into the new one you've selected

          //if commit out should work.....
          connection.query("UPDATE employee SET role_id = ? WHERE employee_id = ?", [roleID, empID]);
        });
    });
  });
}

startUp();
