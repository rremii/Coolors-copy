import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new AllExceptionsFilter())

  const configService = app.get(ConfigService)

  app.use(cookieParser())
  app.enableCors({
    origin: [configService.get("client_origin")],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
  // app.use(s(path.join(__dirname , "../uploads")))
  await app.listen(+configService.get("port") || 5000)
}

bootstrap()
