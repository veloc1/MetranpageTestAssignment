import { Injectable } from "@nestjs/common";
import { Template } from "./models";

@Injectable()
export class TemplatesRepository {
  getList(): Template[] {
    return [
      {
        id: 1,
        arg1: "arg1-1",
        arg2: "arg2-1",
      },
      {
        id: 2,
        arg1: "arg1-2",
        arg2: "arg2-2",
      },
      {
        id: 3,
        arg1: "arg1-3",
        arg2: "arg2-3",
      },
    ];
  }

  findById(id: number): Template | null {
    return this.getList().find((template) => template.id === id) ?? null;
  }
}
