import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormOptions } from './config/orm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// installing packages
// typeorm, pg, @nestjs/typeorm,

//  ORM is OBJECT RELATIONAL MAPPING
