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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { HighlightDirective } from './directives/highlight.directive';
import { MultipleDirective } from './directives/multiple.directive';

const routes: Routes = [
  { path: 'time-tracker', component: TimeTrackerComponent },
  { path: 'simple-form', component: SimpleFormComponent },
  { path: 'reactive-form', component: ReactiveFormComponent },
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
    SimpleFormComponent,
    ReactiveFormComponent,
    HighlightDirective,
    MultipleDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
