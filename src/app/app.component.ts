import {Component, OnDestroy} from '@angular/core'
import {ToastService} from './services/toast.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'portal'

  constructor(public toastService: ToastService) {}

  ngOnDestroy(): void {
    this.toastService.clear()
  }
}
