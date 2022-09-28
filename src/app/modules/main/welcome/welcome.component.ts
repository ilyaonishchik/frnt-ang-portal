import {Component, OnInit} from '@angular/core'
import {WelcomeService} from './welcome.service'
import {ILink} from './link.interface'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  links!: ILink[]

  constructor(private welcomeService: WelcomeService) {}

  ngOnInit(): void {
    this.welcomeService.getLinks().subscribe({
      next: (value) => {
        this.links = value
      },
    })
  }

  showLink(link: string) {
    window.open(link, '_blank')
  }
}
