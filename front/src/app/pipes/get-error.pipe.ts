import {Pipe} from '@angular/core';
import {Project} from "../models";
import {GetStateBasePipe} from "./get-state.base-pipe";

@Pipe({
  name: 'getError',
  pure: true,
  standalone: true
})
export class GetErrorPipe extends GetStateBasePipe {

  getState(project: Project): string | null {
    return this.state.getError(project);
  }

}
