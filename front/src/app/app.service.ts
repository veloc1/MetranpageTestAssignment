import { HttpClient } from "@angular/common/http";
import { BuildResponse, ProjectResponse } from "./models";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppService {
  private readonly backendUrl = "http://localhost:4443";

  constructor(private readonly http: HttpClient) {}

  getProjects() {
    return this.http.get<ProjectResponse>(`${this.backendUrl}/projects`);
  }

  async buildProject(id: number) {
    return firstValueFrom(
      this.http.post<BuildResponse>(`${this.backendUrl}/build`, {
        id,
        // TODO templateId
      }),
    );
  }
}
