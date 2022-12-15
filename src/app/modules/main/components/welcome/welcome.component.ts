import {Component, OnInit} from '@angular/core'
import {Observable} from 'rxjs'
import {Store} from '@ngrx/store'

import {ILink} from '../../interfaces/link.interface'
import {getLinksAction} from '../../store/actions/links.action'
import {isLoadingSelector, linksSelector} from '../../store/selectors'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  isLoadings$!: Observable<boolean>
  links$!: Observable<ILink[] | null>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoadings$ = this.store.select(isLoadingSelector)
    this.links$ = this.store.select(linksSelector)
    this.store.dispatch(getLinksAction())
  }

  showLink(link: string): void {
    window.open(link, '_blank')
  }
}
