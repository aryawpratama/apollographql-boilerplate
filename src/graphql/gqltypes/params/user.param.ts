import { ArgsType, Field } from 'type-graphql';

class Profile {
  @Field()
    name!: string;

  @Field()
    email!: string;

  @Field()
    phone!: string;

  @Field()
    password!: string;
}

@ArgsType()
export class CreateUser extends Profile {
  @Field()
    roleId!: number;
}

@ArgsType()
export class UpdateProfile extends Profile {}

@ArgsType()
export class UpdateUser extends Profile {
  @Field()
    id!: number;

  @Field()
    roleId!: number;
}
