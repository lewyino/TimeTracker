import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TimeTrackerComponent } from './components/time-tracker/time-tracker.component';
import { IssueComponent } from './components/issue/issue.component';
import { CallComponent } from './components/call/call.component';
import { BreakComponent } from './components/break/break.component';
import { TimeTrackerItemComponent } from './components/time-tracker-item/time-tracker-item.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SimpleFormComponent } from './components/simple-form/simple-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { HighlightDirective } from './directives/highlight.directive';
import { MultipleDirective } from './directives/multiple.directive';
import {TypeInterceptorService} from "./services/interceptors/type-interceptor.service";
import {LoginGuard} from "./services/gurads/login.guard";
import { LoginComponent } from './components/login/login.component';
import {TimeTrackerResolver} from "./services/resolvers/time-tracker.resolver";

const routes: Routes = [
  { path: 'time-tracker', component: TimeTrackerComponent, canActivate: [LoginGuard],
    resolve: {
      timeTrackerData: TimeTrackerResolver,
    }
  },
  { path: 'simple-form', component: SimpleFormComponent },
  { path: 'reactive-form', component: ReactiveFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'stats', canLoad: [LoginGuard], loadChildren: () => import('./modules/stats/stats.module').then((m) => m.StatsModule)},
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
    MultipleDirective,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TypeInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
