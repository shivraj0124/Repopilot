const mysql = require("mysql2/promise");

async function main() {
  try {
    const conn = await mysql.createConnection({
      host: "repopilot-db.c6lwucayyr8w.us-east-1.rds.amazonaws.com",
      user: "admin",
      password: "PassRds123",
      database: "repopilot",
      port: 3306,
    });

    console.log("Connected! Heyyyy");
    await conn.end();
  } catch (err) {
    console.error(err);
  }
}

main();