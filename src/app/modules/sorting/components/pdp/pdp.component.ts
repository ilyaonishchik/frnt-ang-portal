import {Component, OnDestroy, OnInit} from '@angular/core'
import {SerialService} from '../../../../services/serial.service'

@Component({
  selector: 'app-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.scss'],
})
export class PdpComponent implements OnInit, OnDestroy {
  constructor(private serialService: SerialService) {}

  ngOnInit(): void {
    const filters = [{usbVendorId: 1027, usbProductId: 24592}]
    this.serialService.getPorts(filters).then((r) => {
      this.serialService.setCurrentPort(r.pop())
    })
  }

  send(text: string[]) {
    text.unshift('#')
    this.serialService.sendData(text)
  }

  clearDigits() {
    this.serialService.clearDigits()
  }

  ngOnDestroy(): void {
    this.clearDigits()
  }
}
