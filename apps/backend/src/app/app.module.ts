import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { connectionString } from 'apps/backend/secrets';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, MongooseModule.forRoot(connectionString)],
  controllers: [],
  providers: [],
})
export class AppModule {}
