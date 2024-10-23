import { Module } from '@nestjs/common';
import { DataBaseModule } from 'src/database/database-config';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [DataBaseModule, UsersModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
