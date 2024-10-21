import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { env } from "src/env";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: env.DB_HOST,
            port: env.DB_PORT,
            username: env.DB_USERNAME,
            password: env.DB_PASSWORD,
            database: env.DB_NAME,
            entities: [],
            synchronize: true,
        })
    ]
})

export class DataBaseModule { }