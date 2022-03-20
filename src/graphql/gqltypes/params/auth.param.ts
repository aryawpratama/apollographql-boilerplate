import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class Login {
  @Field()
    email!: string;

  @Field()
    password!: string;
}
@ArgsType()
export class Register {
  @Field()
    name!: string;

  @Field()
    email!: string;

  @Field()
    phone!: string;

  @Field()
    password!: string;
}
