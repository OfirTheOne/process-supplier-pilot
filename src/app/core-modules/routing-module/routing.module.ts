
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ProcessSuppliersLoadedGuard } from './../../guards/process-suppliers-loaded.guard';

import { ApprovedSuppliersComponent } from './../../containers/approved-suppliers/approved-suppliers.component';
import { ApprovedProcessSourcesComponent } from './../../containers/approved-process-sources/approved-process-sources.component';

const routes: Routes = [
  { path: '', redirectTo: '/data', pathMatch: 'full' },
  { path: 'data', component: ApprovedProcessSourcesComponent },
  {
    path: 'approvedSuppliers',
    component: ApprovedSuppliersComponent,
  },
  { path: '**', redirectTo: '/data' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }
