import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as  fromApprovedSuppliers from '../actions/approved-suppliers.action';
import { ProcessSuppliers, ApprovedSuppliers } from './../../../models/process-suppliers.model';

const approvedSupplierAdapter = createEntityAdapter<ApprovedSuppliers>({
    selectId: (approvedSuppliers: ApprovedSuppliers) => approvedSuppliers.paramsAsString
});

export interface ApprovedSuppliersStates extends EntityState<ApprovedSuppliers> {
    loaded: boolean;
    loading: boolean;
}

export const initialState = approvedSupplierAdapter.getInitialState({
    loaded: false,
    loading: false,
});

export function reducer(state = initialState, action: fromApprovedSuppliers.ApprovedSuppliersActions) {
    switch (action.type) {
        case fromApprovedSuppliers.LOAD_APPROVED_SUPPLIERS:
            return {
                ...state,
                loading: true,
                loaded: false
            };

        case fromApprovedSuppliers.LOAD_APPROVED_SUPPLIERS_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false
            };

        case fromApprovedSuppliers.LOAD_APPROVED_SUPPLIERS_SUCCESS:
            const approvedSuppliers = action.payload;
            state = { ...state, loading: false, loaded: true };
            const newState = approvedSupplierAdapter.addOne(approvedSuppliers, state);
            return newState;

        default:
            return state;
    }
}

export const getApprovedSuppliersLoaded = (state: ApprovedSuppliersStates) => state.loaded;
export const getApprovedSuppliersLoading = (state: ApprovedSuppliersStates) => state.loading;
export const getApprovedSuppliersEntities = (state: ApprovedSuppliersStates) => state.entities;
