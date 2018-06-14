import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
  ],
})

export class AppModule {
  constructor(private readonly connection: Connection) {}
}
