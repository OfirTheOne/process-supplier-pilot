import { Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router, CanActivate, Params } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import * as fromStore from '../store/root-store';
import * as fromStoreRouting from '../store/routing';

import { ProcessSuppliers } from '../models/process-suppliers.model';

@Injectable()
export class ProcessSuppliersLoadedGuard implements CanActivate {

    constructor(
        private router: Router,
        private store: Store<fromStore.RootStoreState>,
        private actions$: Actions
    ) { }

    canActivate(): Observable<boolean> {
        // return this.loadProductsIfThereIsNone();
        return of(true);
    }

    // private loadProductsIfThereIsNone() {
    //     return this.store.select(fromStore.getSelectedProcess)
    //     .pipe(
    //         tap((suppliers: ProcessSuppliers) => {
    //             console.log('canActivate', suppliers);
    //             // if there is no products loaded
    //             if (!suppliers) {
    //                 return this.store.select(fromStoreRouting.getActivatedRouteParams).pipe(
    //                     map((params: Params) => {
    //                         console.log('params', params);
    //                         return this.store.dispatch(new fromStore.LoadProcessSuppliers(params.processName));

    //                     })
    //                 );
    //             }
    //             // return suplliers;
    //         }),
    //         map(() => true),
    //         catchError(error => {
    //             this.router.navigate(['/data']);
    //             return of(false);
    //         }),
    //     );
    //   }
    }
