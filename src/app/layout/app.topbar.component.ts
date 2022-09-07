import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {MenuItem} from 'primeng/api'
import {LayoutService} from './service/app.layout.service'
import {AuthService} from '../services/auth.service'

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
  items!: MenuItem[]

  @ViewChild('menubutton') menuButton!: ElementRef

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef

  @ViewChild('topbarmenu') menu!: ElementRef

  constructor(
    public layoutService: LayoutService,
    public authService: AuthService
  ) {}

  ngOnInit() {}

  logout() {
    this.authService.signOut()
  }
}
