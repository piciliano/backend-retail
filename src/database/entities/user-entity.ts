import { UserRole } from "src/enums/role-enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({type: 'enum', nullable: false, default: UserRole.Functionary, enum: UserRole})
    role: UserRole

    @Column({ type: 'boolean', default: true })
    isActive: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    update_at: Date
}