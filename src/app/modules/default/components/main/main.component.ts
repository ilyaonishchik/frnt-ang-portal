import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'

import {ModuleInterface} from '../../module.interface'
import {DefaultService} from '../../default.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private defaultService: DefaultService, private router: Router) {}

  ngOnInit(): void {}

  getModules(): ModuleInterface[] {
    return this.defaultService.getModules()
  }

  startModule(link: string) {
    this.router.navigate([link])
  }
}
