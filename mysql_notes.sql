-- To make a comment just double hyphen 

-- To view all the databases on the server
-- SHOW DATABASES
SHOW DATABASES;

-- To create a database
-- CREATE DATABASE <database_name>
CREATE DATABASE myDB;

-- To drop a database so delete it
-- DROP DATABASE <database_name>
DROP DATABASE myDB;

-- To select a database to interact with
-- USE <database_name>
USE myDB;

-- To view what database your currently in
-- SELECT DATABASE();
-- Returns null if in no database.
SELECT DATABASE();

-- To make your database use "safe update mode" which means that if you try to
-- update or delete something in your database using a column that is not a key
-- you will get an error
-- SET SQL_SAFE_UPDATES = 1;
SET SQL_SAFE_UPDATES = 1;

-- To make your database not use "safe update mode" which means you will get an 
-- error whenever you try to update and delete a row using a column that is not 
-- a key
-- SET SQL_SAFE_UPDATES = 0;
SET SQL_SAFE_UPDATES = 0;

-- To make a database read only so you cant make changes or delete it
-- ALTER DATABASE <database_name> READ ONLY = 1;
ALTER DATABASE myDB READ ONLY = 1;

-- To make a database read/write so you can do whatever you want
-- ALTER DATABASE <database_name> READ ONLY = 0;
ALTER DATABASE myDB READ ONLY = 0;

-- To create a table, inside the parentheses input the columns for the 
-- table. So it would be column_name, data_type, attributes, and then constraints
-- Note: The convention is that after you specify the type you can add the
-- attributes and only then the constraints. 
-- Data Type Options you can use
-- INT (number)
-- VARCHAR(255) (string) where the 255 is equal to the amount of characters
-- DECIMAL(5, 2) (decimal) where the 5 is equal to the total amount of digits
-- allowed. The two is equal to the amount of decimal values you can have. So
-- this means the max for this input would be 999.99. Notice how in total there
-- are 5 digits and 2 decimal digits.
-- DATE this just returns the date
-- CREATE TABLE <table_name> ();
-- List of Attributes: AUTO_INCREMENT
-- List of Constraints: UNIQUE, NOT NULL, CHECK, DEFAULT, PRIMARY KEY, and FOREIGN KEY.
CREATE TABLE employees (
	employee_id INT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    hourly_pay DECIMAL(5, 2),
    hire_date DATE
);

-- To view the content of a table
-- SELECT * FROM <table_name>
SELECT * FROM employees;

-- To rename a table 
-- RENAME TABLE <table_name> TO <new_table_name>
RENAME TABLE employees TO workers;

-- To delete a table
-- DROP TABLE <table_name>
DROP TABLE employees;

-- To add columns into a table, inside the parentheses goes the
-- same exact stuff you wrote for when you created the table
-- ALTER TABLE <table_name> ADD () 
-- or you can do
-- ALTER TABLE <table_name> ADD <column_name> <type> <options_if_any>
-- The differene is that with the parentheses approach you can add multiple
-- columns whereas with the other one it would be a single one
ALTER TABLE employees ADD (
	phone_number VARCHAR(15)
);

-- To change the name of a column in a table 
-- ALTER TABLE <table_name> RENAME COLUMN <column_name> TO <new_column_name>
ALTER TABLE employees RENAME COLUMN phone_number TO email;

-- To change the data type of a column in a table
-- ALTER TABLE <table_name> MODIFY COLUMN <column_name> <new_data_type>z
ALTER TABLE employees MODIFY COLUMN email VARCHAR(100);

-- To change the order of a column in a table
-- ALTER TABLE <table_name> MODIFY COLUMN <column_name> <type_if_any> <options_if_any> AFTER <column_we_want_it_to_be_after>
ALTER TABLE employees MODIFY COLUMN email VARCHAR(100) AFTER last_name;
-- Something cool we can do is that instead of specifying with AFTER where we would
-- like the column to come after we can simple write FIRST and it would be the first
-- column in the table then.
ALTER TABLE employees MODIFY COLUMN email VARCHAR(100) FIRST;

-- To remove a column in our table 
-- ALTER TABLE <table_name> DROP COLUMN <column_we_would_like_to_drop>, DROP COLUMN <column_we_would_like_to_drop>
-- If you want to remove multiple columns in your table just add a comma and enter DROP COLUMN <column_we_would_like_to_drop>
ALTER TABLE employees DROP COLUMN email;

-- How to insert rows into a table
-- INSERT INTO <table_name> VALUES ()
-- Inside of the parentheses in the order of the columns input the row data. 
-- Note: For data it follows the format YEAR-DA-YR, where YEAR is year, DA is day, YR is year
INSERT INTO employees VALUES (1, "Eugene", "Krabs", 25.50, "2023-01-02");
-- Note: If you want to add multiple rows just add a comman and another parentheses
INSERT INTO employees VALUES (2, "Squidward", "Tentacles", 15.00, "2023-01-03"), (3, "Spongebob", "Squarepants", 12.50, "2023-01-04"), (4, "Patrick", "Star", 12.50, "2023-01-05"), (5, "Sandy", "Cheeks", 17.25, "2023-01-06");

-- If you want to insert a row with only certain columns
-- INSERT INTO <table_name> (<select_a_column>, <select_a_column>, ...) VALUES ();
-- In the first parenthese we are selecting what columns we would like to input for
-- and the second is the data we are inputting in for it.
INSERT INTO employees (employee_id, first_name, last_name) VALUES ("6", "Sheldon", "Plankton");

-- To find a row based off some column value 
-- SELECT * FROM employees WHERE <column_name> = 'some value';
SELECT * FROM employees WHERE first_name = 'Spongebob';

-- To find sepecifc row data off some column values
-- SELECT <column_name>, <column_name> ... FROM <table_name> WHERE <column_name> = 'some value';
-- Note it returns the columns in the order you selected them
SELECT first_name, last_name FROM employees WHERE employee_id = 1;

-- To find a row based off some column value using the greater then, less than operators
-- SELECT * FROM <table_name> WHERE <column_name> <operator> 'some value';
-- Operators you can use
-- > greater than
-- < less than
-- >= greater than or equal to
-- <= less than or equal to
-- = equal to, wont work if the value is equal to NULL in that case use the keyword "IS"
-- != not equal to
-- The "IS" keywords works only when working with a value that is NULL
SELECT * FROM employees WHERE hourly_pay >= 15;

-- To update a value in your row
-- UPDATE <table_name> SET <column_name>, <column_name> ... WHERE <column_name> = 'some value';
UPDATE employees SET hourly_pay = 17.25 WHERE employee_id = 5;

-- To update a column in our table to share a value
-- UPDATE <table_name> SET <column_name> = 'some value';
UPDATE employees SET hourly_pay = 10.25;

-- To delete everything in a table
-- DELETE FROM <table_name>
DELETE FROM employees;

-- To delete a specific row based on some search criteria
-- DELETE FROM <table_name> WHERE <column_name> = 'some value';
DELETE FROM employees WHERE employee_id = 6;

-- AUTOCOMMIT is a mode we can turn on or off. When off our transactions
-- won't save automatically. We would need to manually save each transaction.
-- And setting it off gives us the ability to use the COMMIT and ROLLBACK
-- command. When on you can't do this stuff. And it is on by default.
-- SET AUTOCOMMIT = OFF:
-- Now when I use the COMMIT command it will make a save point and then 
-- anytime I make a mistake or do something I regret I can use the ROLLBACK command
-- to go back in time. If I am happy with a change if I reenter the COMMIT
-- command it will save the change.
SET AUTOCOMMIT = OFF;

-- Some cool data types to know about
-- DATE returns the date of today without time, this format -> "0000-00-00"
-- TIME returns the time of today without day, this format -> "00:00:00"
-- DATETIME returns the date and time of today, this format -> "0000-00-00 00:00:00"
CREATE TABLE test (
	my_date DATE,
    my_time TIME,
    my_datetime DATETIME
);

-- We can also use some helpful functions to add the values in for these columns.
-- The CURRENT_DATE function returns the value for DATE
-- The CURRENT_TIME function returns the value for TIME
-- The NOW function returns the DATETIME
INSERT INTO test VALUES (CURRENT_DATE(), CURRENT_TIME(), NOW());
-- We can also add some modifications for this code like so
-- INSERT INTO test VALUES (CURRENT_DATE() + 1, CURRENT_TIME(), NOW());
-- As you can see where were going you can play around with it so in
-- our case we just made the date go to tomorrow, and if you instead did
-- minus 1 it would be yesterday

-- The "UNIQUE" constraint ensures that all values in a column are all different
CREATE TABLE products (
	product_id INT,
    product_name VARCHAR(25) UNIQUE,
    price DECIMAL(4, 2) 
);
-- Now when you add something in that is a duplicate in the product_name column
-- you will get an error
-- INSERT INTO products VALUES (100, "hamburger", 3.99), (101, "fries", 1.89), (102, "soda", 1.00), (103, "ice ream", 1.49), (104, "fries", 1.75);
-- Error Code: 1062. Duplicate entry 'fries' for key 'products.product_name'

-- How to add a constraint to a column after it is already created
-- ALTER TABLE <table_name> ADD CONSTRAINT <constraint>(<column_name>)
ALTER TABLE products ADD CONSTRAINT UNIQUE(product_name);

-- The "NOT NULL" constraint makes it so that for that column you cant set the value to
-- NULL
ALTER TABLE products MODIFY price DECIMAL(4, 2) NOT NULL;
-- Now when you try to set price to "NULL" you will get an error.
-- INSERT INTO products VALUES (104, "cookie", NULL);

-- The "CHECK" constraint is a way for us to execute some logic whenever someone tries to
-- create a row in your table. When making a "CHECK" constraint simply use the "CHECK" 
-- followed by in paretheses a condition, if the condition returns false its an error and
-- if it returns true it will add the row into the table. 
-- CHECK (<column_name> some condition)
CREATE TABLE employees (
	employee_id INT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    hourly_pay DECIMAL(5, 2),
	hire_date DATE,
    CHECK (hourly_pay >= 10)
);
-- You can also add a name to your "CHECK" constraint so that later on if you want you can
-- delete it. So you can name it like this.
-- CONSTRAINT <constraint name> CHECK (condition)
CREATE TABLE employees (
	employee_id INT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    hourly_pay DECIMAL(5, 2),
	hire_date DATE
    CONSTRAINT checkHourlyPay CHECK (hourly_pay >= 10)
);

-- How to add a "CHECK" constraint after table creation. 
-- ALTER TABLE <table_name> ADD CONSTRAINT <constraint_name> CHECK (condition)
ALTER TABLE employees ADD CONSTRAINT checkHourlyPay CHECK (hourly_pay >= 10);
-- The error will look like this if the condition returns false
-- Error Code: 3819. Check constraint 'checkHourlyPay' is violated.

-- How to remove a constraint after table creation
-- ALTER TABLE <table_name> DROP CHECK <check constraint name>
ALTER TABLE employees DROP CHECK checkHourlyPay;

-- The "DEFAULT" constraint allows us to set some value for a column
-- if nothing is entered in for it. It would look like this.
CREATE TABLE products (
	product_id INT,
    product_name VARCHAR(25),
    price DECIMAL(4, 2) DEFAULT 0
);

-- To add a "DEFAULT" constraint after table creation
-- ALTER TABLE <table_name> ALTER <column_name> SET DEFAULT <defualt_value>
ALTER TABLE products ALTER price SET DEFAULT 0;

-- The "PRIMARY KEY" constraint is used to uniquely identify each row in a table.
-- You can only have 1 "PRIMARY KEY" in a table. It also makes it so all the values 
-- in the column with the "PRIMARY KEY" constraint must be unique so nothing can be 
-- a duplicate. And the value for the column CANNOT be NULL, "".
CREATE TABLE transactions (
	transaction_id INT PRIMARY KEY,
    amount DECIMAL(5, 2)
);
-- You can also set a "PRIMARY KEY" constraint like this
CREATE TABLE transactions (
	transaction_id INT,
    amount DECIMAL(5, 2),
    PRIMARY KEY (transaction_id)
);

-- How to add a "PRIMARY KEY" constraint after table creation. 
-- ALTER TABLE <table_name> ADD CONSTRAINT PRIMARY KEY (<column_name>);
ALTER TABLE transactions ADD CONSTRAINT PRIMARY KEY (amount);

-- The "AUTO_INCREMENT" attribute can be applied to a column that is 
-- set as a key. Whenever we insert a new row our primary key can be
-- populated automatically. Then each subsequent row is auto incremented.
CREATE TABLE transactions (
	transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(5, 2)
);

-- To change the starting point for the AUTO_INCREMENT so that instead
-- of starting at 1 you can set something like 1000, you would do the following
-- ALTER TABLE <table_name> AUTO_INCREMENT = 'some value';
ALTER TABLE transactions AUTO_INCREMENT = 1000;

-- The "FOREIGN KEY" constraint is a way for us to set the value of a column
-- in our table as a "PRIMARY KEY" of another table. So think of a table with
-- users and posts. For every row in the post table we can have the column 
-- user_id be set to the "PRIMARY_KEY" of the user table. And by doing this
-- we can create a link between two tables.
-- FOREIGN KEY <current_table_column_name> REFERENCES <other_table_name>(<column_name>)
-- Once you set a Foreign Key you wont be allowed to delete the value of it. So 
-- for example of if you have a users and notes table. And in the notes table you
-- have the user_id set to a Foreign Key from the users table. If you try to delete
-- a user that exists as the value in the users table it wont let you. As it wont
-- let you break the link between the two tables. Unless we explicity delete that
-- Foreign Key constraint.
CREATE TABLE users (
	user_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    email VARCHAR(25) NOT NULL,
    password VARCHAR(25) NOT NULL
);
CREATE TABLE notes (
	note_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    content VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
INSERT INTO users (name, email, password) VALUES 
("irfan", "irfan@gmail.com", "secret"),
("usman", "usman@gmail.com", "secret"),
("suliman", "suliman@gmail.com", "secret"),
("momana", "momana@gmail.com", "secret");
INSERT INTO notes (name, content, user_id) VALUES 
("What does SQL stand for", "Structured Query Langauge", 1),
("What is my favorite car", "BMW X8 is a fantastic car for fun!", 2),
("What is my dream job", "Fortnite Professional Streamer", 3),
("What is greater than food", "More food obviously!", 4);

-- To delete a Foreign Key 
-- ALTER TABLE <table_name> DROP FOREIGN KEY <name_of_foreign_key>
ALTER TABLE notes DROP FOREIGN KEY user_id;

-- To give your Foreign Key a unique name
-- ALTER TABLE <table_name> ADD CONSTRAINT <unique_name> FOREIGN KEY <current_table_column_name> REFERENCES <other_table_name>(<column_name>)

-- This wont be allowed you will get the following error
-- Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails (`mydb`.`notes`, CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`))
DELETE FROM users WHERE user_id = 1;

-- A "JOIN" is a clause that is used to combine rows from two or more tables, based on a 
-- related column between them like a "FOREIGN KEY". So say you have two tables one for
-- users and another for notes. There are five types of JOINS. We have inner, left, right,
-- full, and cross.
-- For "INNER JOIN" it would be 
-- SELECT * FROM <table_you_want_on_left> INNER JOIN <table_you_want_on_right> ON <foreign_key_from_left_table> = <primary_key_from_right_table>
-- This is telling MySQL to return all rows from these two tables that have matching
-- user_id so thats why some data could be excluded
-- For "LEFT JOIN" it would be
-- SELECT * FROM <table_you_want_on_left> LEFT JOIN <table_you_want_on_right> ON <foreign_key_from_left_table> = <primary_key_from_right_table>
-- This is telling MySQL to return everything from the table on the left and any relevant 
-- data from the table on the right.
-- For "RIGHT JOIN" it would be 
-- SELECT * FROM <table_you_want_on_left> RIGHT JOIN <table_you_want_on_right> ON <foreign_key_from_left_table> = <primary_key_from_right_table>
-- This is telling MySQL to return everything from the table on the right and any relevant 
-- data from the table on the left.

-- A Function is a way to calculate some value with extreme ease. I will show a few important
-- ones. You can always set an alias if you want using the "AS" keyword
-- SELECT COUNT(<column_name>) FROM <table_name>
SELECT COUNT(note_id) FROM notes;
-- SELECT MAX(<column_name>) FROM <table_name>
SELECT MAX(note_id) FROM notes;
-- SELECT MIN(<column_name>) FROM <table_name>
SELECT MIN(note_id) FROM notes;
-- SELECT AVG(<column_name>) FROM <table_name>
SELECT AVG(note_id) FROM notes;
-- SELECT SUM(<column_name>) FROM <table_name>
SELECT SUM(note_id) FROM notes;
-- SELECT CONCAT(<column_name>, " ", <column_name>) FROM <table_name>
SELECT CONCAT(name, " ", email) AS nameAndEmail FROM users;

-- Logical Operators are keywords that are used to combine more than 1 
-- condition (AND, OR, NOT)
-- SELECT * FROM <table_name> WHERE <column_name> <condition> = 'some value' <logical_operator> <condition> = 'some value';
SELECT * FROM employees WHERE hire_date < "2023-01-05" AND job = "cook";
-- This transaction will find the employees there were hired before the 5th of January
-- 2023 and the job is equal to cook. So it will return the results that satisfy both conditions
-- as its and
SELECT * FROM employees WHERE job = "cook" OR job = "cashier";
-- This transaction will find the employees where there job is either cook or cashier. As
-- long as one condition is true it will return data.
SELECT * FROM employees WHERE NOT job = "cook";
-- This transaction will find the employees where the employee job is not equal to cook.
SELECT * FROM employees WHERE NOT job = "cook" AND NOT job = "asst. manager";
-- This transaction will find the employees where the job is not equal to cook and the job
-- is not equal to asst.manager
SELECT * FROM employees WHERE hire_date BETWEEN "2023-01-04" AND "2023-01-07";
-- This transaction will find the employees where the hire date is between the two
-- values specified. 
SELECT * FROM employees WHERE job IN ("cook", "cashier", "janitor");
-- This transaction will find all the employees where the job is equal to cook, cashier,
-- and janitor.

-- Wild Card Characters like % and _ are a way to substitute one or more characters 
-- in a string. For example say you want to find every user in a table where the name
-- starts with the letter "s". You would probably think you would need to do this.
-- SELECT * FROM employees WHERE first_name = "s"; 
-- But that is incorrect. Instead we can use something like the percent operator (%).
-- When you see the percent operator that means everything from that point on can be
-- any character you want. So it would go like this for our case.
SELECT * FROM employees WHERE first_name = "s%";
-- And we can even go a step further by replacing the equals with the LIKE clause. So
-- that would look for any patters.
SELECT * FROM employees WHERE first_name LIKE "s%";
-- And if you want to find all the data where the value ends with a certain letter you
-- can do that too.
SELECT * FROM employees WHERE first_name LIKE "%an";
-- This transaction will return all the employees where the first name ends with the letters
-- an.
SELECT * FROM employees WHERE first_name LIKE "sp%";
-- This transaction will return all the employees where the first name starts with the 
-- letters sp.
-- And then we have the _ Wild Card character which just represents 1 random letter. So 
-- for example if you want to find any employees where the job ends with "ook" we can do
-- that by setting the letter before "ook" as a underscore. 
SELECT * FROM employeees WHERE job LIKE "_ook";
-- And if you wanted to find all the hire_date rows where the month shares the first month
SELECT * FROM employees WHERE hire_date LIKE "____-01-__";
-- So you can already see the endless possiblities of using the % and _. It is so much.
-- Remember you can also use the % and _ together. So say you want to find the job where 
-- the first letter can be anything and then the letter a followed by any number of characters
SELECT * FROM employees WHERE job LIKE "_a%";

-- The "ORDER BY" clause sorts the results of a query in either ascending or descending based on
-- which column we list. 
-- SELECT * FROM <table_name> ORDER BY <column_we_want_ordered> 
-- By default even if you don't write it the column is ordered alphbabetically so ascending
-- If you want to be explicit so make it absolutely clear that you want it in ascending order 
-- just do this.
-- SELECT * FROM <table_name> ORDER BY <column_we_want_ordered> <order_type>
SELECT * FROM employees ORDER BY first_name ASC;
-- This transaction will return all the employees with the first_name sorted in ascending order
SELECT * FROM employees ORDER BY first_name DESC;
-- This transaction will return all the employees with the first_name sorted in descending order
-- Now you may encounter a scenario where when ordering some table they might share the same
-- value. In that case simply add a comma and what the next thing it should be ordered by
SELECT * FROM employees ORDER BY amount, customer_id;

-- The "LIMIT" clause is used to limit the number of records. Useful when your working with
-- a lot of data. You see this all the time in the Pagination logic. 
-- SELECT * FROM <table_name> LIMIT <amount>;
SELECT * FROM employees LIMIT 1;
-- This transaction will return a single employee from the employees table.
-- You can also set an offset so after limit just return 2 values and separate it with a 
-- comma. The first value is how many you want to skip and how many to return after that.
SELECT * FROM employees LIMIT 2, 1;
-- This transaction will return all the employees after skipping the first two in the table
-- and then returning 1 after.

-- The "UNION" clause combines the results of two or more SELECT statements. It puts the
-- table on top of one another. So say you have two tables called income and expenses. 

CREATE TABLE income (
	income_name VARCHAR(25) NOT NULL,
    amount DECIMAL(9, 2) NOT NULL
);

INSERT INTO income VALUES
("orders", 1000000.00),
("merchandise", 50000.00),
("services", 125000.00);

CREATE TABLE expenses (
	expense_name VARCHAR(25) NOT NULL,
    amount DECIMAL(8, 2) NOT NULL
);

INSERT INTO expenses VALUES
("wages", 250000.00),
("tax", 50000),
("repairs", 15000);

SELECT * FROM income UNION SELECT * FROM expenses;
-- Now the table will look like this

-- income_name | amount
-- orders      | 1000000.00 --|
-- merchandise | 50000.00     | - income
-- services    | 125000.00  --|
-- wages       | 250000.00  --|
-- tax         | 50000.00     | - expenses
-- repairs     | 15000.00   --|

-- An excellent use case for this is when you are trying to get all the 
-- first_name and last_name of a table that contains employees and customers
SELECT first_name, last_name FROM employees UNION SELECT first_name, last_name FROM customers;

-- And by default when you use the "UNION" clause it will exclude duplicates. 
-- So to include it just add "ALL" to the "UNION" caluse. So it would look like this.
SELECT first_name, last_name FROM employees UNION SELECT first_name, last_name FROM customers;

-- A "SELF JOIN" is really any type of join where you join together another copy of a table
-- to itself. There used to compares rows of the same table. They help with displaying a
-- heirarchy of data. So if you have a table called customers you can SELF JOIN by making
-- the left and right side both set to customers

CREATE TABLE customers (
	customer_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(25) NOT NULL,
	last_name VARCHAR(25) NOT NULL
);

INSERT INTO customers (first_name, last_name) VALUES 
("Fred", "Fish"),
("Larry", "Lobster"),
("Bubble", "Bass"),
("Poppy", "Puff");

SELECT * FROM customers;

SELECT a.customer_id, a.first_name, a.last_name, CONCAT(b.first_name, " ", b.last_name) AS referred_by FROM customers AS a INNER JOIN customers AS b ON a.referral_id = b.customer_id;

-- Views are virtual tables based on the result-set of an SQL statement. The
-- fields in a view are fields from one or more real tables in the database
-- They are not real tables, but can be interacted with as if they are. Think
-- of it as the virtual method attached to a Model in Mongoose. Only this time 
-- instead of adding some property to the document we are not just creating a 
-- full on document. Which in the context of MySQL is a table. 

CREATE TABLE employees (
	employee_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(25),
    last_name VARCHAR(25),
    hourly_pay DECIMAL(5, 2),
    job VARCHAR(25),
    hire_date DATE,
    supervisor_id INT
);

INSERT INTO employees (first_name, last_name, hourly_pay, job, hire_date, supervisor_id) VALUES
("Squidward", "Tentacles", 15.00, "cashier", "2023-01-03", 5),
("Spongebob", "Squarepants", 12.50, "cook", "2023-01-04", 5),
("Patrick", "Star", 12.50, "cook", "2023-01-05", 5),
("Sandy", "Cheeks", 17.25, "asst. manager", "2023-01-06", 1),
("Sheldon", "Plankton", 10.00, "janitor",  "2023-01-07", 5);

-- CREATE VIEW <view_name> AS SELECT <column_name>, <column_nae> FROM <table_name>
CREATE VIEW employee_attendance AS SELECT first_name, last_name FROM employees;
-- This transaction states that it should create a view so a fake table that is made up of 
-- returning the first_name and last_name from the table employees. And the beautiful thing
-- about this fake table is that if the tables you interact with to make the view change
-- the fake table will also have that change. 

SELECT * FROM employee_attendance;

-- To delete a view 
-- DROP VIEW <view_name>
DROP VIEW employee_attendance;

CREATE VIEW customer_emails AS SELECT email FROM customers;
-- This transaction will create a fake table called customer_emails that is made up
-- of email from the customers table. 

-- Now to show the cool part about views, if I were to make a change to the customers table
-- by adding another row. The change would be reflected on the view we created.
INSERT INTO customers (first_name, last_name, referral_id, email) 
VALUES ("Pearl", "Krabs", NULL, "PKrabs@gmail.com");
-- Now if I view the view table we should see the added row
SELECT * FROM customer_emails;
-- And yes it did! Awesome

-- An index is a type of data structure, they are used to find values within a specific
-- column more quickly. The data structure is BTree. MySQL normally searches sequentially
-- through a column. So the longer the column the more expensive the operation. But by 
-- applying an index to a column, SELECT takes less time, and UPDATE takes more time, 
-- In other words normally MySQL looks for a specific value in a column by going one
-- by one down. And the more columns you have the more time its going to take. But by
-- applying an Index to the column we make the process of finding something in the column
-- much faster but we do make updating the column take more time. And you may not know this
-- but when we set a column as a PRIMARY KEY that is actually an index. And you will see
-- that when you view all the indexes on your table.

-- To view all the indexes on your table
-- SHOW INDEXES FROM <table_name>
SHOW INDEXES FROM customers;

-- To create an index
-- CREATE INDEX <index_name> ON <table_name>(<column_name>);
CREATE INDEX last_name_idx ON customers(last_name);
-- This transaction will create a index called last_name_idx on the table
-- customers for the last_name column. Now finding a specific value in the 
-- last_name column will be much easier. But updating will take more time.

-- Now let me search for a specific value in the last_name column of our
-- customers table. You will notice that finding it is so much faster now!
SELECT * FROM customers WHERE last_name = "Puff";
-- This transaction is going to return the row in the customers table where
-- the last_name is equal to Puff. 

SELECT * FROM customers WHERE first_name = "Poppy";
-- This transaction that is returning the row from the customers table where
-- first_name is equal to Poppy is slower compared to the transaction that is
-- returning the row in the customers table where the last_name is equal to Puff
-- because this transaction does not have an index on the column.

-- To create a multi column index, so making it easier to return some row 
-- based on two columns
-- CREATE INDEX <index_name> ON <table_name>(<list_column_in_order>);
CREATE INDEX last_name_first_name_idx ON customers(last_name, first_name);

-- To delete an index
-- ALTER TABLE <table_name> DROP INDEX <index_name>; 
ALTER TABLE customers DROP INDEX last_name_first_name_idx;

-- A subquery is just a query within another query. You write a query and close it
-- within a set of parentheses whatever value or values are retured from the subquery
-- you would use within an outer query. 

SELECT AVG(hourly_pay) FROM employees;
SELECT first_name, last_name, hourly_pay, (SELECT AVG(hourly_pay) FROM employees) AS avg_pay FROM employees;

SELECT first_name, last_name, hourly_pay FROM employees WHERE hourly_pay > (SELECT AVG(hourly_pay) FROM employees);

-- The "GROUP BY" clause will aggregate all rows by a specific column its often used with
-- aggreagte functions like SUM(), MAX(), MIN(), AVG(), COUNT()

SELECT SUM(amount), order_date FROM transactions GROUP by order_date;

CREATE TABLE transactions (
	transaction_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    amount DECIMAL(5, 2),
	customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

INSERT INTO transactions VALUES
(1000, 4.99, 3, "2023-01-01"),
(1001, 2.89, 2, "2023-01-01"),
(1002, 3.38, 3, "2023-01-02"),
(1003, 4.99, 1, "2023-01-02"),
(1004, 1.00, NULL, "2023-01-03"),
(1005, 2.49, 4, "2023-01-03"),
(1006, 5.48, NULL, "2023-01-03");

SELECT SUM(amount), order_date FROM transactions GROUP BY order_date;
SELECT COUNT(amount), order_date FROM transactions GROUP BY order_date;
