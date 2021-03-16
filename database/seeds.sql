INSERT INTO department (name)
VALUES ('Engineering');
INSERT INTO department (name)
VALUES ('Finance');
INSERT INTO department (name)
VALUES ('Legal');
INSERT INTO department (name)
VALUES ('Sales');


INSERT INTO role (title, salary, department_id)
VALUES ('Front-End Engineer', 60000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Back-End Engineer', 85000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Full-Stack Engineer', 100000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('Financial Planner', 87850, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 65750, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Budget Analyst', 74650, 2);

INSERT INTO role (title, salary, department_id)
VALUES ('Legal Analyst', 51000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ('Case Manager', 50000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ('Administrative Assistant', 40000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Support Staff', 30000 , 4);
INSERT INTO role (title, salary, department_id)
VALUES ('Account Manager', 45000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ('Lead Development Specialist', 36000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Olive', "Yew", 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Aida', "Bugg", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Maureen', "Biologist", 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Allie', "Gater", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Teri', "Dactyl", 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Liz', "Erd", 3, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Chris', "Anthemum", 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ben', "Dover", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bea', "Mine", 4);