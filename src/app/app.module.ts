import {NgModule} from '@angular/core'
// import {HttpClientModule} from '@angular/common/http'
import {BrowserModule} from '@angular/platform-browser'

// import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
// import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'

// import {SharedModule} from './modules/shared/shared.module'
import {AppRoutingModule} from './app-routing.module'

import {AppComponent} from './app.component'
// import {ToastComponent} from './components/toast/toast.component'
// import {WelcomeComponent} from './components/welcome/welcome.component'

// import {registerLocaleData} from '@angular/common'
// import localeRu from '@angular/common/locales/ru'
import {AppLayoutModule} from './layout/app.layout.module'

// registerLocaleData(localeRu)

@NgModule({
  declarations: [
    AppComponent,
    // ToastComponent,
    // WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // NgbModule,
    // FontAwesomeModule,
    // HttpClientModule,
    // SharedModule,
    AppLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
