import {Injectable} from "@angular/core";
import {map, Observable, shareReplay, Subject} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Project} from "../models";
import {AppService} from "../app.service";

@Injectable()
export class ProjectStateService {

  protected readonly buildResults: Map<number, string> = new Map()
  protected readonly buildErrors: Map<number, string> = new Map()

  readonly updateView$: Subject<void> = new Subject()

  readonly projects$: Observable<Project[]> = this.appService.getProjects().pipe(
    map((projectData) => projectData.projects),
    takeUntilDestroyed(),
    shareReplay({ bufferSize: 1, refCount: true })
  )

  constructor(private readonly appService: AppService) {
    this.projects$.subscribe()
  }

  getResult(project: Project): string | null {
    return this.buildResults.get(project.id) ?? null
  }

  getError(project: Project): string | null {
    return this.buildErrors.get(project.id) ?? null
  }

  async buildProject(project: Project, templateId: number) {
    try {
      const result = await this.appService.buildProject(project.id, templateId);
      this.buildResults.set(project.id, result.buildedProject)
    } catch (e) {
      console.error(e);
      this.buildErrors.set(project.id, "Something went wrong")
    } finally {
      this.updateView$.next()
    }
  }
}
