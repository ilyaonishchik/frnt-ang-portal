import {Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {IUser} from '@shared/interfaces/user.interface'
import {currentUserSelector} from '@modules/auth/store/selectors'

@Component({
  selector: 'app-user-profile',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  currentUser$!: Observable<IUser | null>
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.currentUser$ = this.store.select(currentUserSelector)
  }
}
