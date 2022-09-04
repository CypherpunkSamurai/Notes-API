# Notes API PostgreSQL



## PostgreSQL
Let's make a database

I got the db url:
```
postgres://oluvrxza:hOxb0uOj2rnvJMGuPiBJkBMqv9i-Ibjv@arjuna.db.elephantsql.com/oluvrxza
```

Let's make a new table and name it 'notes'. We have a id that is autoincremented (serial) and then we have a text column that will be 250 characters long, for storing the contents.
```
CREATE TABLE IF NOT EXISTS notes(
		id		SERIAL PRIMARY KEY NOT NULL,
		text	VARCHAR(250) NOT NULL
);
```

or using IDENTITY
```sql
CREATE TABLE IF NOT EXISTS notes(
		id INT PRIMARY KEY generated always as identity NOT NULL,
		text	VARCHAR(250) NOT NULL
);
```

**Note: Keep in mind, the `table_name()` is a table schema syntax. it's like `table_name(column_name type, column_name type);`**


Let's add a few notes for testing

```sql
INSERT INTO notes (text) VALUES 
('Hi World'),
('Hello');

# or in one line
# INSERT INTO notes (text) VALUES ('Hi World'), ('Hello');
```

Basically we are Running...
```sql
CREATE TABLE IF NOT EXISTS notes(id SERIAL, text VARCHAR(250) NOT NULL);

INSERT INTO notes (text) VALUES ('Hi World'), ('Hello');
```

### References:
* https://quickref.me/postgres
* https://www.postgresqltutorial.com/postgresql-cheat-sheet/
* https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-create-table/
* https://www.elephantsql.com/blog/databases-for-beginners-what-is-sql-what-is-postgresql.html
* https://geshan.com.np/blog/2021/01/nodejs-postgresql-tutorial/
* https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/

## ExpressJS
Now that we have a database, we need a API.

### Creating a Project

First let's make a new npm package and init it.

```shell
npm init
```

Next we install express, postgres and nodemon.
```
npm i express nodemon postgresql
```

### Express App
Let's make a Express App and add routing to it. We will later add CRUD operations to these routes, for now we return json.


