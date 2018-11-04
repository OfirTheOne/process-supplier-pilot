import { Params } from '@angular/router';
import { createSelector } from '@ngrx/store';
import * as fromApprovedSuppliers from '../reducers/approved-suppliers.reducer';
import * as fromFeature from '../reducers';
import * as fromRouting from '../../routing';

import { ProcessSuppliers, ApprovedSuppliers } from '../../../models/process-suppliers.model';
import { HttpParams } from '@angular/common/http';


export const getApprovedSuppliersState = createSelector(
    fromFeature.getRootStoreState,
    (state: fromFeature.RootStoreState) => state.approvedSuppliers
);
export const getApprovedSuppliersEntities = createSelector(
    getApprovedSuppliersState,
    fromApprovedSuppliers.getApprovedSuppliersEntities
);

export const getSelectedApprovedSuppliers = createSelector(
    getApprovedSuppliersEntities,
    fromRouting.getRouterState,
    (entities, router) => {
        const paramsAsString = new HttpParams({fromObject: router.state.queryParams}).toString();
        return router.state && entities[paramsAsString];
    }
);

export const getApprovedSuppliersLoaded = createSelector(
    getApprovedSuppliersState,
    fromApprovedSuppliers.getApprovedSuppliersLoaded
);

export const getApprovedSuppliersLoading = createSelector(
    getApprovedSuppliersState,
    fromApprovedSuppliers.getApprovedSuppliersLoading
);
