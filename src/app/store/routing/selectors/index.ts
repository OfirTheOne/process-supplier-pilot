import { Params } from '@angular/router';
import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import { RouterReducerState } from '@ngrx/router-store';

export const getActivatedRouteParams = createSelector(
    fromFeature.getRouterState,
    (router: RouterReducerState<fromFeature.RouterStateUrl> ) => router.state ? router.state.params : {}
);

export const getActivatedRouteQueryParams = createSelector(
    fromFeature.getRouterState,
    (router: RouterReducerState<fromFeature.RouterStateUrl> ) => router.state ? router.state.queryParams : {}
);

