import { Module } from '@nestjs/common';
import { DataBaseModule } from 'src/database/database-config';


@Module({
  imports: [DataBaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
