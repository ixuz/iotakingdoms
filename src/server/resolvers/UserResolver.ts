import {
  Resolver,
  Mutation,
  Arg,
  Query,
  InputType,
  Field,
  Int,
} from "type-graphql";
import { User } from "../entity/User";

@InputType()
class UserInput {
  @Field()
  firstName!: string;
  @Field()
  lastName!: string;
  @Field(() => Int)
  age!: number;
}

@InputType()
class UserUpdateInput {
  @Field(() => String, { nullable: true })
  firstName?: string;
  @Field(() => String, { nullable: true })
  lastName?: string;
  @Field(() => Int, { nullable: true })
  age?: number;
}

@Resolver()
export class UserResolver {
  @Mutation(() => Boolean)
  async createUser(@Arg("options", () => UserInput) options: UserInput) {
    await User.insert(options);
    return true;
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => Boolean)
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("options", () => UserUpdateInput) options: UserUpdateInput
  ) {
    await User.update({ id }, options);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => Int) id: number) {
    await User.delete({ id });
    return true;
  }
}
