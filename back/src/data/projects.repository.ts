import { Injectable } from "@nestjs/common";
import { Project } from "./models";

@Injectable()
export class ProjectsRepository {
  getList(): Project[] {
    return [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ];
  }
}
