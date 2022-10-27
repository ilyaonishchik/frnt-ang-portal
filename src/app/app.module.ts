import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import {EntityDataModule} from '@ngrx/data'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'

import {ToastModule} from 'primeng/toast'
import {MessageService} from 'primeng/api'

import {AppRoutingModule} from './app-routing.module'
import {SharedModule} from './shared/shared.module'

import {AppComponent} from './app.component'
import {httpInterceptorProviders} from './interceptors/http.interceptor'

import {environment} from '../environments/environment'
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store'
import {entityConfig} from './entity-metadata'

// const defaultDataServiceConfig: DefaultDataServiceConfig = {
//   root: 'https://my-api-domain.com:8000/api/v1',
//   timeout: 3000, // request timeout,
// }

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ToastModule,
    StoreModule.forRoot(
      {router: routerReducer},
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
        },
      }
    ),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot(),
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [MessageService, httpInterceptorProviders],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
