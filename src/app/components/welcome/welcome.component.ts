import {Component, OnInit} from '@angular/core'
import {WelcomeService} from './service/welcome.service'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  invoiceDate: string
  constructor(private welcomeService: WelcomeService) {
    this.invoiceDate = new Date().toLocaleDateString()
  }

  ngOnInit(): void {}

  getLinks() {
    return this.welcomeService.getLinks()
  }

  showLink(link: string) {
    window.open(link, '_blank')
  }

  onDateChanged(value: string) {
    this.invoiceDate = value
  }
}
