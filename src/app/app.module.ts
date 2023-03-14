import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store'

import {MessageService} from 'primeng/api'
import {ToastModule} from 'primeng/toast'

import {environment} from '../environments/environment'

import {AppRoutingModule} from './app-routing.module'
import {SessionModule} from '@shared/modules/session/session.module'
import {LayoutModule} from '@shared/modules/layout/layout.module'

import {AppComponent} from './app.component'
import {httpInterceptorProviders} from './interceptors/http.interceptor'

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    // console.log('State', state)
    console.log('Action', action.type)

    return reducer(state, action)
  }
}

export const metaReducers: MetaReducer<any>[] = [debug]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SessionModule,
    LayoutModule,
    ToastModule,
    // StoreModule.forRoot({router: routerReducer}, {metaReducers}),
    StoreModule.forRoot({router: routerReducer}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [MessageService, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
