import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromProcessStandard from '../reducers/process-standard.reducer';
import * as fromFeature from '../reducers';
// import * as fromRoot from '../../routing';

import { ProcessStandard } from '../../../models/process-standard.model';

export const getProcessStandardsState = createSelector(
    fromFeature.getRootStoreState,
    (state: fromFeature.RootStoreState) => state.processStandard
);
export const getProcessStandardsEntities = createSelector(
    getProcessStandardsState,
    fromProcessStandard.getProcessStandardsEntities
);

export const getAllProcessStandards = createSelector(
    getProcessStandardsEntities,
    (entities: {[id: string]: ProcessStandard}) => {
        return Object.keys(entities).map(id => entities[id]);
    }
);

export const getProcessStandardsLoaded = createSelector(
    getProcessStandardsState,
    fromProcessStandard.getProcessStandardsLoaded
);

export const getProcessStandardsLoading = createSelector(
    getProcessStandardsState,
    fromProcessStandard.getProcessStandardsLoading
);
