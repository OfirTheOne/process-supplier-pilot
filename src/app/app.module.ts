import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// core-modules
import { MaterialModule } from './core-modules/material-module/material.module';
import { RoutingModule } from './core-modules/routing-module/routing.module';

import { StoreRouterConnectingModule, RouterStateSerializer} from '@ngrx/router-store';
import { RootStoreModule } from './store/root-store/root-store.module';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { reducers, CustomSirializer } from './store/routing';


import { AppComponent } from './app.component';
import { ApprovedProcessSourcesComponent } from './containers/approved-process-sources/approved-process-sources.component';
import { ApprovedSuppliersComponent } from './containers/approved-suppliers/approved-suppliers.component';

import { servicesArray } from './services';

import { environment } from '../environments/environment';
export const metaReducers: MetaReducer<any>[]
  = !environment.production ? [storeFreeze] : [];

@NgModule({
  declarations: [
    AppComponent,
    ApprovedProcessSourcesComponent,
    ApprovedSuppliersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RoutingModule,

    RootStoreModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule,
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSirializer},
    ...servicesArray
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
