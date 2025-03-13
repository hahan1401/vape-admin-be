import { createConnection } from 'mysql2/promise';

export const initializeDatabase = async () => {
  const connection = await createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS fraud_codes`);
  await connection.query(`
    CREATE DATABASE IF NOT EXISTS fraud_codes;
    USE fraud_codes;
    CREATE TABLE IF NOT EXISTS fraud_codes (
      id CHAR(36) PRIMARY KEY,
      value VARCHAR(255) NOT NULL,
      createdDate VARCHAR(255) NOT NULL,
      usedDate VARCHAR(255) DEFAULT NULL,
      INDEX (value)
    );
  `);
  await connection.end();
};
