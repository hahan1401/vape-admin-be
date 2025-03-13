import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createConnection } from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  constructor(private configService: ConfigService) {}
  async initializeDatabase() {
    console.log('adas', this.configService.get<string>('SQL_HOST'));
    const connection = await createConnection({
      host: this.configService.get<string>('SQL_HOST'),
      port: this.configService.get<number>('SQL_PORT'),
      user: this.configService.get<string>('SQL_USERNAME'),
      password: this.configService.get<string>('SQL_PASSWORD'),
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS fraud_codes`);
    await connection.query(`USE perfume_store`);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS fraud_codes (
        id CHAR(36) PRIMARY KEY,
        value VARCHAR(255) NOT NULL,
        createdDate VARCHAR(255) NOT NULL,
        usedDate VARCHAR(255) DEFAULT NULL,
        INDEX (value)
      );
    `);

    await connection.end();
  }
}
