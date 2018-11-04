/**
 * here we defining a feature module - top level above all store data leyers.
 */

import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromProcessStandard from './process-standard.reducer';
import * as fromApprovedSuppliers from './approved-suppliers.reducer';


// define the collective store state
export interface RootStoreState {
    processStandard: fromProcessStandard.ProcessStandardState;
    approvedSuppliers: fromApprovedSuppliers.ApprovedSuppliersStates;

}

// map reducer to keyword in the store object
/**
 * The object which we will register in every reducer under the 'dashboard' layer.
 */
export const reducers: ActionReducerMap<RootStoreState> = {
    processStandard: fromProcessStandard.reducer,
    approvedSuppliers: fromApprovedSuppliers.reducer
};

export const getRootStoreState = createFeatureSelector<RootStoreState>('rootStore');

