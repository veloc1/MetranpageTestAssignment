import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {firstValueFrom, Observable} from "rxjs";
import {Project, Template} from "./models";
import {ProjectStateService} from "./state/project-state.service";
import {TemplateStateService} from "./state/template-state.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProjectStateService, TemplateStateService]
})
export class AppComponent {

  private templateSelectState: Map<number, number> = new Map()

  private readonly projectState = inject(ProjectStateService)
  private readonly templateState = inject(TemplateStateService)

  protected readonly projects$: Observable<Project[]> = this.projectState.projects$
  protected readonly templates$: Observable<Template[]> = this.templateState.templates$

  selectTemplate(project: Project, event: any) {
    this.templateSelectState.set(project.id, +event.target.value)
  }

  async buildProject(project: Project) {
    const templateId = await this.getTemplateId(project)
    await this.projectState.buildProject(project, templateId)
  }

  private async getTemplateId(project: Project): Promise<number> {
    const id = this.templateSelectState.get(project.id)
    if (id) return id
    const templates = await firstValueFrom(this.templates$)
    return templates[0].id
  }
}
