import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './components/show/show.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: 'stats/show', component: ShowComponent }
];

@NgModule({
  declarations: [
    ShowComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class StatsModule { }
