import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AuthTokenRespond {
  @Field()
    status!: string;

  @Field()
    token!: string;

  @Field()
    refreshToken!: string;
}

@ObjectType()
export class ActionRespond {
  @Field()
    status!: string;

  @Field()
    msg!: string;

  @Field(() => String, { nullable: true })
    data?: string;
}
