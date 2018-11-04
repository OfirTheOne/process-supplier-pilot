import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import * as fromStore from '../../store/root-store';
import * as fromStoreRouting from '../../store/routing';
import { ProcessSuppliers, ApprovedSuppliers } from './../../models/process-suppliers.model';


@Component({
    selector: 'app-process-suppliers-board',
    templateUrl: './approved-suppliers.component.html',
    styleUrls: ['./approved-suppliers.component.css']
}) export class ApprovedSuppliersComponent implements OnInit, OnDestroy {

    approvedSuppliers$: Observable<ApprovedSuppliers>;
    loadProcessSuppliersSuccess: Subscription;
    loadProcessSuppliersFail: Subscription;

    displayedColumns = ['position', 'supplierName', 'supplierNumber'];
    dataSource = new MatTableDataSource();
    @ViewChild(MatSort) sort: MatSort;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private store: Store<fromStore.RootStoreState>,
        private actions$: Actions) { }

    ngOnInit(): void {

        this.approvedSuppliers$ = this.store.select(fromStoreRouting.getActivatedRouteQueryParams)
            .pipe(switchMap((queryParams: Params) => {
                console.log(queryParams);
                return this.store.select(fromStore.getSelectedApprovedSuppliers)
                    .pipe(
                        tap((suppliers: ApprovedSuppliers) => {
                            if (!suppliers) {
                                console.log('queryParams ------', queryParams);
                                // debugger;
                                this.store.dispatch(new fromStore.LoadApprovedSuppliers(queryParams));
                            }
                        })
                    );
            })
            );
        this.approvedSuppliers$.subscribe(data => {
            console.log(data);
            if (data) {
                this.dataSource.data = data.suppliers;
            }
        });
        this.loadProcessSuppliersSuccess = this.actions$.ofType(fromStore.LOAD_PROCESS_STANDARDS_SUCCESS)
            .subscribe(() => {
                console.log('loadProcessSuppliersSuccess');
            });

        this.loadProcessSuppliersFail = this.actions$.ofType(fromStore.LOAD_PROCESS_STANDARDS_FAIL)
            .subscribe(() => {
                console.log('loadProcessSuppliersFail');
            });

    }

    ngOnDestroy(): void {
        this.loadProcessSuppliersSuccess.unsubscribe();
        this.loadProcessSuppliersFail.unsubscribe();
    }
}
