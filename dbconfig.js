const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");

const sequelize = new Sequelize("chatapp-api", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

async function createDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    await connection.query("CREATE DATABASE IF NOT EXISTS `chatapp-api`");

    connection.end();
  } catch (error) {
    console.error("Error creating database:", error);
  }
}

createDatabase();

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

module.exports = sequelize;
