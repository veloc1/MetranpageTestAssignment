import {Injectable} from "@angular/core";
import {AppService} from "../app.service";
import {map, shareReplay} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable()
export class TemplateStateService {

  readonly templates$ = this.appService.getTemplates().pipe(
    map(response => response.templates),
    takeUntilDestroyed(),
    shareReplay({ bufferSize: 1, refCount: true })
  )

  constructor(private readonly appService: AppService) {
    this.templates$.subscribe()
  }

}
