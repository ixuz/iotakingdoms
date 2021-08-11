import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Int, Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Field(() => Int)
  @Column("int", { nullable: true })
  age!: number;
}
