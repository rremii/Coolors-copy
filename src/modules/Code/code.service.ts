import { BadRequestException, Injectable } from "@nestjs/common"
import { ConfirmEmailDto } from "./dto/confirm-email.dto"
import { DefaultResponse } from "../../common/types/types"
import { ApiError } from "../../common/constants/errors"
import { VerifyCodeDto } from "./dto/verify-code.dto"
import { MailerService } from "@nestjs-modules/mailer"
import { UsersService } from "../users/users.service"
import { InjectRepository } from "@nestjs/typeorm"
import { Code } from "./entities/code.entity"
import { LessThan, Repository } from "typeorm"
import { GetAuthCodeExpTime } from "../../common/helpers/getAuthCodeExpTime"
import { rgbToHex } from "../../common/helpers/rgbToHex"

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(Code)
    private readonly codeRepository: Repository<Code>,
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService,
  ) {}

  private getRandomLimitedHexColor() {
    const r = Math.floor(Math.random() * 120)
    const g = Math.floor(Math.random() * 120)
    const b = Math.floor(Math.random() * 120)

    return rgbToHex([r, g, b])
  }

  async sendConfirmCode({ email }: ConfirmEmailDto): Promise<DefaultResponse> {
    const existUser = await this.usersService.findUserByEmail(email)
    if (existUser) throw new BadRequestException(ApiError.USER_EXIST)

    const color = this.getRandomLimitedHexColor()

    await this.mailerService.sendMail({
      to: email,
      from: "remi mail sender",
      subject: "confirm email",
      text: "please confirm your email",
      html: `<div>${color.slice(1)}</div>`,
    })

    const newCode = this.codeRepository.create({
      code: color.slice(1),
      expTime: new Date(Date.now() + GetAuthCodeExpTime()),
    })

    await newCode.save()

    return { message: "code was sent" }
  }

  async verifyCode({ code }: VerifyCodeDto) {
    await this.deleteExpired()

    const codeData = await this.codeRepository.findOneBy({ code })
    if (!codeData) throw new BadRequestException(ApiError.INVALID_CODE)

    // const currentTime = Date.now()
    // const codeExpTime = codeData.expTime.getTime()

    // if (currentTime > codeExpTime)
    //   throw new BadRequestException(ApiError.INVALID_CODE)

    await codeData.remove()

    return { message: "code is correct" }
  }

  async deleteExpired() {
    const expCods = await this.codeRepository.find({
      where: {
        expTime: LessThan(new Date()),
      },
    })

    await this.codeRepository.remove(expCods)
  }
}
