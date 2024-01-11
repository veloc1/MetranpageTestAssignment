import { Component } from "@angular/core";
import { Subscription, map } from "rxjs";
import { AppService } from "./app.service";
import { Project } from "./models";

export type ProjectState = {
  project: Project;
  buildedProject: string;
  error: string;
};

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  private sub = new Subscription();
  protected projects: ProjectState[] = [];

  constructor(private readonly appService: AppService) {}

  ngOnInit() {
    this.sub.add(
      this.appService
        .getProjects()
        .pipe(map((projectData) => projectData.projects.map((project) => ({ project, buildedProject: "", error: "" }))))
        .subscribe((projectData) => {
          this.projects = projectData;
        }),
    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  async buildProject(id: number) {
    const project = this.projects.find((p) => p.project.id === id);
    if (!project) {
      return;
    }

    try {
      const result = await this.appService.buildProject(id);

      project.buildedProject = result.buildedProject;
    } catch (e) {
      console.error(e);
      project.error = "Something went wrong";
    }
  }
}
