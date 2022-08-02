import {Component, OnInit} from '@angular/core'
import {FaIconLibrary} from '@fortawesome/angular-fontawesome'
import {faBell} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  count = '25'
  constructor(libraryIcons: FaIconLibrary) {
    libraryIcons.addIcons(faBell)
  }

  ngOnInit(): void {}
}
