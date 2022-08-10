import {Component, OnInit} from '@angular/core'
import {WelcomeService} from './service/welcome.service'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(private welcomeService: WelcomeService) {}

  ngOnInit(): void {}

  getLinks() {
    return this.welcomeService.getLinks()
  }

  showLink(link: string) {
    window.open(link, '_blank')
  }
}
