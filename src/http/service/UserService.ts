import { UserModel } from "../model/UserModel";

export class UserService {
  public getUser(id: number): UserModel {
    return {
      id,
      email: "jane@doe.com",
    };
  }
}
