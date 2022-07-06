import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TimeTrackerComponent } from './components/time-tracker/time-tracker.component';
import { IssueComponent } from './components/issue/issue.component';
import { CallComponent } from './components/call/call.component';
import { BreakComponent } from './components/break/break.component';
import { TimeTrackerItemComponent } from './components/time-tracker-item/time-tracker-item.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SimpleFormComponent } from './components/simple-form/simple-form.component';
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  { path: 'time-tracker', component: TimeTrackerComponent },
  { path: 'simple-form', component: SimpleFormComponent },
  { path: '', component: MainPageComponent},
  { path: '**', component: NotFoundPageComponent  }
]

@NgModule({
  declarations: [
    AppComponent,
    TimeTrackerComponent,
    IssueComponent,
    CallComponent,
    BreakComponent,
    TimeTrackerItemComponent,
    NotFoundPageComponent,
    MainPageComponent,
    SimpleFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
