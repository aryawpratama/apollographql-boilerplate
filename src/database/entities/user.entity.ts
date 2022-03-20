import { hash } from 'bcryptjs';
import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity({ name: 'users' })
@ObjectType()
export class User extends BaseEntity {
  @BeforeInsert()
  async hashPassword(password: string) {
    this.password = await hash(password || this.password, +process.env.SALT!);
  }

  @Field()
  @PrimaryGeneratedColumn()
    id!: number;

  @Field()
  @Column({ type: 'varchar' })
    name!: string;

  @Field()
  @Column({ type: 'varchar' })
    email!: string;

  @Field()
  @Column({ type: 'varchar' })
    phone!: string;

  @Column({ type: 'varchar' })
    password!: string;

  @Field()
  @ManyToOne(() => Role, (role) => role.id)
    role!: Role;

  @Field()
  @CreateDateColumn()
    created_at!: Date;

  @Field()
  @UpdateDateColumn()
    updated_at!: Date;

  @DeleteDateColumn()
    deleted_at?: Date;
}
