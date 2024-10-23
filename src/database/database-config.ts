import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { env } from "src/env";
import { User } from "./entities/user-entity";
import { Product } from "./entities/product-entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: env.DB_HOST,
            port: env.DB_PORT,
            username: env.DB_USERNAME,
            password: env.DB_PASSWORD,
            database: env.DB_NAME,
            entities: [User, Product],
            synchronize: true,
        })
    ]
})

export class DataBaseModule { }