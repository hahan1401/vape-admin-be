import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { FileController } from './file/file.controller';
import { FileModule } from './file/file.module';
import { FileService } from './file/file.service';
import { FraudCodeModule } from './fraud-code/fraud-code.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, DatabaseModule],
      useFactory: async (databaseService: DatabaseService) => {
        console.log('process.env', process.env)
        await databaseService.initializeDatabase();
        return {
          type: 'mysql',
          host: process.env.SQL_HOST,
          port: Number(process.env.SQL_PORT),
          username: process.env.SQL_USERNAME,
          password: process.env.SQL_PASSWORD,
          database: 'vape_store_fraud_codes',
          synchronize: true,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        };
      },
      inject: [DatabaseService],
    }),
    FileModule,
    FraudCodeModule,
  ],
  controllers: [AppController, FileController],
  providers: [AppService, FileService],
})
export class AppModule { }
