import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import * as fromStore from '../../store/root-store';
import * as ProcessStandardSelectors from '../../store/root-store/selectors/process-standard.selector';
import * as ApprovedSuppliersSelectors from '../../store/root-store/selectors/approved-suppliers.selector';

import { ProcessStandard } from '../../models/process-standard.model';

@Component({
    selector: 'app-process-standard-board',
    templateUrl: './approved-process-sources.component.html',
    styleUrls: ['./approved-process-sources.component.css']
})

export class ApprovedProcessSourcesComponent implements OnInit {

    processStandards$: Observable<ProcessStandard[]>;
    processMap$: Observable<any>;
    displayedColumns = [
        'position', 'supplierName', 'standardName', 'processName', 'supplierNumber',
        'comments', 'elop', 'NADCAP', 'AS9100', 'aircraft', 'land', 'drone',
        'elisra', 'kinetics'
    ];
    dataSource = new MatTableDataSource<ProcessStandard>();
    @ViewChild(MatSort) sort: MatSort;
    filterForm: FormGroup;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<fromStore.RootStoreState>) { }

    ngOnInit() {

        this.store.dispatch(new fromStore.LoadProcessStandards());
        this.processStandards$ = this.store.select(ProcessStandardSelectors.getAllProcessStandards)
            .pipe(tap(data => this.dataSource.data = data));
        this.processStandards$.subscribe((data) => console.log(data));
        this.dataSource.filterPredicate = filterPredicate;
        this.dataSource.sort = this.sort;
        this.filterForm = this.initFilterForm();
    }

    onGoSuppliersPageByProcessName(curRow: ProcessStandard, $event) {
        const route = '/approvedSuppliers';
        const queryParams = {processName: curRow.processName};
        this.navigateToPage(route, queryParams);
    }

    onGoSuppliersPageByStandardName(curRow: ProcessStandard, $event) {
        const route = '/approvedSuppliers';
        const queryParams = {standardName: curRow.standardName};
        this.navigateToPage(route, queryParams);
    }

    private navigateToRelativePage(subRoute: string, relativeRoute: ActivatedRoute) {
        this.router.navigate([subRoute], { relativeTo: relativeRoute });
    }

    private navigateToPage(completeRoute: string, queryParams: Params) {
        this.router.navigate([completeRoute], { queryParams });
    }

    public applyFilter() {
        const filterData = this.getDataForm();
        const filter = JSON.stringify(filterData);
        this.dataSource.filter = filter; // filterValue.trim().toLowerCase();
    }

    private initFilterForm(): FormGroup {
        return new FormGroup({
            supplierName:   new FormControl(), // ,undefined, [Validators.required, Validators.min(1)]),
            standardName:   new FormControl(), // ,undefined, [Validators.required, Validators.minLength(1)]),
            processName:    new FormControl(), // ,undefined, [Validators.required, Validators.minLength(1)]),
            supplierNumber: new FormControl(), // ,undefined, [Validators.required, Validators.minLength(1)]),
            flags:          new FormGroup({
                elop:       new FormControl(),
                NADCAP:     new FormControl(),
                AS9100:     new FormControl(),
                aircraft:   new FormControl(),
                land:       new FormControl(),
                kinetics:   new FormControl(),
                elisra:     new FormControl(),
                drone:      new FormControl(),
            }),
        });
    }

    private getDataForm() {
        // if (this.filterForm.valid) {
            const flagsForm = this.filterForm.controls.flags as FormGroup;
            const flags = flagsForm.getRawValue();

            const filterData = {
                supplierName:   this.filterForm.controls.supplierName.value   || undefined,
                standardName:   this.filterForm.controls.standardName.value   || undefined,
                processName:    this.filterForm.controls.processName.value    || undefined,
                supplierNumber: this.filterForm.controls.supplierNumber.value || undefined,
                elop:       flags.elop      || undefined,
                NADCAP:     flags.NADCAP    || undefined,
                AS9100:     flags.AS9100    || undefined,
                aircraft:   flags.aircraft  || undefined,
                land:       flags.land      || undefined,
                kinetics:   flags.kinetics  || undefined,
                elisra:     flags.elisra    || undefined,
                drone:      flags.drone     || undefined,
            };
            console.log('filterData', filterData);
            return filterData;
        // } else {
            // console.log('product form invalid');
        // }
    }

}

function filterPredicate<T>(data: T, filter: string): boolean {
    console.log('filterPredicate');
    const partialRowData = JSON.parse(filter);
    // return true if data contains every value in filterPredicate.
    return Object.keys(partialRowData)
        .every(partialRowKey => {
            return (partialRowData[partialRowKey] !== undefined) && (partialRowData[partialRowKey] === data[partialRowKey]);
        });
}
