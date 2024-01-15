import {Pipe} from '@angular/core';
import {Project} from "../models";
import {GetStateBasePipe} from "./get-state.base-pipe";

@Pipe({
  name: 'getResult',
  pure: true,
  standalone: true
})
export class GetResultPipe extends GetStateBasePipe {

  getState(project: Project): string | null {
    return this.state.getResult(project);
  }

}
