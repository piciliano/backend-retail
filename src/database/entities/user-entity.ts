import { UserRole } from "src/enum/role-enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    password_hash: string

    @Column()
    phone: string

    @Column()
    email: string

    @Column({type: 'enum', nullable: false, default: UserRole.Retail, enum: UserRole})
    role: UserRole

    @Column({ type: 'boolean', default: true })
    isActive: boolean

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    update_at: Date
}