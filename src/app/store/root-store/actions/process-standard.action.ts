import { Action } from '@ngrx/store';
import { ProcessStandard } from '../../../models/process-standard.model';


// step 1 -
// define namespace for each action / state.
export const LOAD_PROCESS_STANDARDS = '[dashboard] Load Process-Standards';
export const LOAD_PROCESS_STANDARDS_FAIL = '[dashboard] Load Process-Standards Fail';
export const LOAD_PROCESS_STANDARDS_SUCCESS = '[dashboard] Load Process-Standards Success';


// step 2 -
// define class / type for each action / state using the namespaces.
export class LoadProcessStandards implements Action {
    readonly type = LOAD_PROCESS_STANDARDS;
    constructor(public payload?: any) { }
}
export class LoadProcessStandardsFail implements Action {
    readonly type = LOAD_PROCESS_STANDARDS_FAIL;
    constructor(public payload?: any) { }
}
export class LoadProcessStandardsSuccess implements Action {
    readonly type = LOAD_PROCESS_STANDARDS_SUCCESS;
    constructor(public payload?: ProcessStandard[]) { }
}


// step 3 -
// wraping all the classes / types of actions under one type.
export type ProcessStandardsActions
    = LoadProcessStandards
    | LoadProcessStandardsFail
    | LoadProcessStandardsSuccess;




