import { HttpClient } from "@angular/common/http";
import {BuildResponse, ProjectResponse, TemplateResponse} from "./models";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppService {
  private readonly backendUrl = "http://localhost:3000";

  constructor(private readonly http: HttpClient) {}

  getProjects() {
    return this.http.get<ProjectResponse>(`${this.backendUrl}/projects`);
  }

  getTemplates() {
    return this.http.get<TemplateResponse>(`${this.backendUrl}/templates`);
  }

  async buildProject(id: number, templateId: number) {
    return firstValueFrom(
      this.http.post<BuildResponse>(`${this.backendUrl}/build`, {
        id,
        templateId
      }),
    );
  }
}
