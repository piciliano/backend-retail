import { CateroryRole } from "src/enums/category-enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')

export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    productName: string

    @Column()
    description: string

    @Column({ type: 'enum', enum: CateroryRole })
    category: CateroryRole

    @Column()
    quantity: number

    @Column()
    location: string

    @Column()
    price: string

    @Column({nullable: true})
    assessing: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}