import {
  Controller,
  Get,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common"
import { UsersService } from "./users.service"
import { AccessTokenGuard } from "../../guards/access-token.guard"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/me")
  @UseGuards(AccessTokenGuard)
  getUser(@Req() request: Request) {
    if (!("authorization" in request.headers)) throw new UnauthorizedException()
    const authHeader = request.headers.authorization as string

    const authToken = authHeader.split(" ")[1]

    return this.usersService.getUser(authToken)
  }
}
