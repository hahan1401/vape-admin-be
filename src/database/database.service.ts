import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createConnection } from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  constructor(private configService: ConfigService) { }
  async initializeDatabase() {
    const connection = await createConnection({
      host: this.configService.get<string>('SQL_HOST'),
      port: this.configService.get<number>('SQL_PORT'),
      user: this.configService.get<string>('SQL_USERNAME'),
      password: this.configService.get<string>('SQL_PASSWORD'),
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS vape_store_fraud_codes`);
    await connection.query(`USE vape_store_fraud_codes`);
    // await connection.query(`
    //   CREATE TABLE IF NOT EXISTS fraud_codes (
    //     id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    //     value VARCHAR(255) NOT NULL,
    //     createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    //     usedDate TIMESTAMP DEFAULT NULL,
    //     isUsed BOOLEAN DEFAULT FALSE,
    //     INDEX (value)
    //   );
    // `);

    // await connection.query(`
    //   CREATE TRIGGER IF NOT EXISTS before_update_fraud_codes
    //     BEFORE UPDATE ON fraud_codes
    //     FOR EACH ROW
    //     SET NEW.usedDate = CURRENT_TIMESTAMP;
    // `);

    await connection.end();
  }
}
