import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { initializeDatabase } from './lib/database';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..'),
  }),
  TypeOrmModule.forRootAsync({
    useFactory: async () => {
      await initializeDatabase();
      console.log('__dirname', __dirname);
      return {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'fraud_codes',
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      };
    },
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
