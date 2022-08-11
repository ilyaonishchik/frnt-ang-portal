import {NgModule} from '@angular/core'
import {HttpClientModule} from '@angular/common/http'
import {BrowserModule} from '@angular/platform-browser'

import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {Page404Component} from './components/page404/page404.component'
import {SharedModule} from './modules/shared/shared.module'
import {ToastComponent} from './components/toast/toast.component'
import {WelcomeComponent} from './components/welcome/welcome.component'

@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
    ToastComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
