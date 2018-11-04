import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as ProcessStandardsActions from '../actions/process-standard.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ServerHandlerService } from './../../../services';


@Injectable()
export class ProcessStandardEffect {

    constructor(private actions$: Actions, private serverHandler: ServerHandlerService) { }

    @Effect()
    loadProcessStandards$ = this.actions$.ofType(ProcessStandardsActions.LOAD_PROCESS_STANDARDS)
        .pipe(
            switchMap(() => {
                return this.serverHandler.getAllProcessStandardData().pipe(
                    map(loadedProcessStandard => {
                        console.log(loadedProcessStandard);
                        return new ProcessStandardsActions.LoadProcessStandardsSuccess(loadedProcessStandard);
                    }),
                    catchError(error => of(new ProcessStandardsActions.LoadProcessStandardsFail(error)))
                );
            })
        );
}
