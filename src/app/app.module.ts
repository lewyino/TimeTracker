import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TimeTrackerComponent } from './components/time-tracker/time-tracker.component';
import { IssueComponent } from './components/issue/issue.component';
import { CallComponent } from './components/call/call.component';
import { BreakComponent } from './components/break/break.component';
import { TimeTrackerItemComponent } from './components/time-tracker-item/time-tracker-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeTrackerComponent,
    IssueComponent,
    CallComponent,
    BreakComponent,
    TimeTrackerItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
