import { Module } from '@nestjs/common';
import { DataBaseModule } from 'src/database/database-config';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [DataBaseModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
