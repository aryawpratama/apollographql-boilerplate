import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity, Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Role extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
    id!: number;

  @Field()
  @Column('varchar')
    name!: string;
}
