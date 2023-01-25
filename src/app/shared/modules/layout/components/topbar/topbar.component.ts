import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {MenuItem} from 'primeng/api'

import {LayoutService} from '../../services/layout.service'
import {environment} from 'environments/environment'
import {
  isAnonymousSelector,
  isSignedInSelector,
} from '@modules/auth/store/selectors'
import {signoutAction} from '@modules/auth/store/actions/signout.action'

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  production: boolean = environment.production
  projectTitle: string = environment.title

  isSignedIn$!: Observable<boolean>
  isAnonymous$!: Observable<boolean>

  items!: MenuItem[]

  @ViewChild('menubutton') menuButton!: ElementRef

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef

  @ViewChild('topbarmenu') menu!: ElementRef

  constructor(private store: Store, public layoutService: LayoutService) {}

  ngOnInit(): void {
    this.isSignedIn$ = this.store.select(isSignedInSelector)
    this.isAnonymous$ = this.store.select(isAnonymousSelector)
  }

  logout(): void {
    this.store.dispatch(signoutAction())
  }
}
