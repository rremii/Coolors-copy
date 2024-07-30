import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import configurations from "../configurations"
import { getOrmConfig } from "../configurations/orm.config"
import { MailerModule } from "@nestjs-modules/mailer"
import { getMailConfig } from "../configurations/mail.config"
import { UsersModule } from "./users/users.module"
import { CodeModule } from "./Code/code.module"
import { AuthModule } from "./auth/auth.module"
import { PaletteModule } from "./palette/palette.module"

@Module({
  imports: [
    PaletteModule,
    CodeModule,
    AuthModule,
    UsersModule,
    CodeModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
      envFilePath: [".development.env", ".env", ".production.env"],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMailConfig,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getOrmConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
