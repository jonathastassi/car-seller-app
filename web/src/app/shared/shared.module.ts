import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/material/material.module';
import { RouterModule } from '@angular/router';
import { InputFormComponent } from './components/input-form/input-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { ListInfiniteScrollComponent } from './components/list-infinite-scroll/list-infinite-scroll.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [InputFormComponent, CardComponent, ListInfiniteScrollComponent, NavigationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule
  ],
  exports: [
    InputFormComponent,
    CardComponent,
    ListInfiniteScrollComponent,
    NavigationComponent
  ]
})
export class SharedModule { }
