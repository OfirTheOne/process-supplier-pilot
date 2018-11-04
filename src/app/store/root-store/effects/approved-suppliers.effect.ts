import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as ApprovedSuppliersActions from '../actions/approved-suppliers.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ServerHandlerService } from './../../../services';


@Injectable()
export class ApprovedSuppliersEffect {

    constructor(private actions$: Actions, private serverHandler: ServerHandlerService) { }

    @Effect()
    loadProcessSuppliers$ = this.actions$.ofType(ApprovedSuppliersActions.LOAD_APPROVED_SUPPLIERS)
        .pipe(
            switchMap((action: ApprovedSuppliersActions.LoadApprovedSuppliers) => {
                const processName = action.payload.processName as string;
                const standardName = action.payload.standardName as string;
                return this.serverHandler.getApprovedSuppliers({processName, standardName}).pipe(
                    map(loadedApprovedSuppliers => {
                        return new ApprovedSuppliersActions.LoadApprovedSuppliersSuccess(loadedApprovedSuppliers);
                    }),
                    catchError(error =>
                        of(new ApprovedSuppliersActions.LoadApprovedSuppliersFail(error)))
                );
            })
        );
}
