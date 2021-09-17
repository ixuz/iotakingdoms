import { Controller, Get, Path, Route, Tags } from "tsoa";
import { UserModel } from "../model/UserModel";
import { UserService } from "../service/UserService";

@Tags("user")
@Route("user")
export class UserController extends Controller {
  @Get("{userId}")
  public async getUser(@Path() userId: number): Promise<UserModel> {
    return new UserService().getUser(userId);
  }
}
