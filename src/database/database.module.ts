import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
  ],
})
export class DatabaseModule {}