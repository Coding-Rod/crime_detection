const { Client } = require("pg");

async function getConnection() {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "rodri",
    password: "admin123",
    database: "thesis",
  });
  await client.connect();
  return client;
}

module.exports = getConnection;
