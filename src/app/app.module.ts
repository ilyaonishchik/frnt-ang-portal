import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AppRoutingModule} from './app-routing.module'
import {AppLayoutModule} from './layout/app.layout.module'

import {AppComponent} from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AppLayoutModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
