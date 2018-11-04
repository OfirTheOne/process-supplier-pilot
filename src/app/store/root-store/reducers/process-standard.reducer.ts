import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as fromProcessStandard from '../actions/process-standard.action';
import { ProcessStandard } from './../../../models/process-standard.model';

// step 1 -
// define adapter & state blueprint.
export const processStandardAdapter = createEntityAdapter<ProcessStandard>({
    selectId: (processStandard: ProcessStandard) => processStandard._id
});
export interface ProcessStandardState extends EntityState<ProcessStandard> {
    loaded: boolean;
    loading: boolean;
}

// step 2 -
// define initial state.
export const initialState = processStandardAdapter.getInitialState({
    loaded: false,
    loading: false,
});

// step 3 -
// define a pure reducer method.
export function reducer(state = initialState, action: fromProcessStandard.ProcessStandardsActions) {
    switch (action.type) {
        case fromProcessStandard.LOAD_PROCESS_STANDARDS: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case fromProcessStandard.LOAD_PROCESS_STANDARDS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
            };
        }

        case fromProcessStandard.LOAD_PROCESS_STANDARDS_SUCCESS: {
            // get the payload
            const processStandards = action.payload;
            // adjust loading indicators
            state = {
                ...state,
                loading: false,
                loaded: true
            };
            // pass the payload to the adapter and get new state
            const newState = processStandardAdapter.addMany(processStandards, state);
            // return new state
            return newState;
        }

        default:
            return state;
    }
}

// step 4 -
// define getters methods to expose each attribute of the state.
export const getProcessStandardsLoaded = (state: ProcessStandardState) => state.loaded;
export const getProcessStandardsLoading = (state: ProcessStandardState) => state.loading;
export const getProcessStandardsEntities = (state: ProcessStandardState) => state.entities;

