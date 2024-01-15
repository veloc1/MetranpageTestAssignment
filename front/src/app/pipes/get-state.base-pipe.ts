import {inject, PipeTransform} from "@angular/core";
import {Project} from "../models";
import {distinctUntilChanged, map, Observable} from "rxjs";
import {ProjectStateService} from "../state/project-state.service";

export abstract class GetStateBasePipe implements PipeTransform {

  protected readonly state = inject(ProjectStateService)

  transform(project: Project): Observable<string | null> {
    return this.state.updateView$.pipe(
      map(() => this.getState(project)),
      distinctUntilChanged()
    );
  }

  abstract getState(project: Project): string | null

}
