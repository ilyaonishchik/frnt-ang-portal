import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {UsersService} from './users.service'
import {IUser} from './user'
// import {Observable} from 'rxjs'
import {Table} from 'primeng/table'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: IUser[] = []
  // results$?: Observable<IUser[]>

  @ViewChild('filter') filter!: ElementRef

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    // this.results$ = this.usersService.getAll()
    this.usersService.getAll().subscribe({
      next: (users) => {
        this.users = users
      },
    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
  }
}
