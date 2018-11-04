import { Action } from '@ngrx/store';
import { ProcessSuppliers, ApprovedSuppliers } from '../../../models/process-suppliers.model';


// step 1 -
// define namespace for each action / state.
export const LOAD_APPROVED_SUPPLIERS = '[dApprovedSuppliersashboard] Load Approved-Suppliers';
export const LOAD_APPROVED_SUPPLIERS_FAIL = '[dashboard] Load Approved-Suppliers Fail';
export const LOAD_APPROVED_SUPPLIERS_SUCCESS = '[dashboard] Load Approved-Suppliers Success';


// step 2 -
// define class / type for each action / state using the namespaces.
export class LoadApprovedSuppliers implements Action {
    readonly type = LOAD_APPROVED_SUPPLIERS;
    constructor(public payload: {processName?: string, standardName?: string}) { }
}
export class LoadApprovedSuppliersFail implements Action {
    readonly type = LOAD_APPROVED_SUPPLIERS_FAIL;
    constructor(public payload?: any) { }
}
export class LoadApprovedSuppliersSuccess implements Action {
    readonly type = LOAD_APPROVED_SUPPLIERS_SUCCESS;
    constructor(public payload?: ApprovedSuppliers) { }
}


// step 3 -
// wraping all the classes / types of actions under one type.
export type ApprovedSuppliersActions
    = LoadApprovedSuppliers
    | LoadApprovedSuppliersFail
    | LoadApprovedSuppliersSuccess;




