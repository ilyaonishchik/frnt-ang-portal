import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {Page404Component} from './components/page404/page404.component'
import {WelcomeComponent} from './components/welcome/welcome.component'

@NgModule({
  declarations: [AppComponent, Page404Component, WelcomeComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
