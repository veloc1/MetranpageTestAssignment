import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProjectsRepository } from "./data/projects.repository";
import { TemplatesRepository } from "./data/templates.repository";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: !ENV ? ".env" : `.env.${ENV}`,
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, ProjectsRepository, TemplatesRepository],
})
export class AppModule {}
