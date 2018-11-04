import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material'; //
import { MatExpansionModule } from '@angular/material/expansion'; //
import { MatCheckboxModule } from '@angular/material/checkbox'; //
import { MatTableModule } from '@angular/material/table';

import { MatSortModule } from '@angular/material/sort';


@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        // using ~
        MatExpansionModule, MatIconModule, MatSnackBarModule, MatSelectModule,
        MatListModule, MatCardModule,
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        // using ~
        MatExpansionModule, MatIconModule, MatSnackBarModule, MatSelectModule,
        MatListModule, MatCardModule,
    ]
})
export class MaterialModule { }
