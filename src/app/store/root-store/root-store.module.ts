

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { effects } from './effects';
import { reducers } from './reducers';

/**
 * The purpose of this file is to load all states and actions under one module,
 * and enable lazy loading of the store's data.
 * */

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('rootStore', reducers),
        EffectsModule.forFeature(effects)
    ],
    exports: [
        StoreModule
    ]
})
export class RootStoreModule { }
