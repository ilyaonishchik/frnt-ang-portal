import {Injectable, OnDestroy} from '@angular/core'
import {AvsSerial} from '../components/serial/avs-serial'

@Injectable({
  providedIn: 'root',
})
export class SerialService implements OnDestroy {
  serialPort: AvsSerial
  currentPort: any

  constructor() {
    this.serialPort = new AvsSerial(this.dataHandler)
  }

  dataHandler(data: string) {
    console.log(`Load from port: ${data}`)
  }

  async openPort() {
    await this.serialPort.connect((port: any) => {
      this.currentPort = port
      console.log(this.currentPort)
    })
  }

  async sendToPort(data: string) {
    if (this.currentPort) {
      await this.serialPort.sendData(data)
    }
  }

  async closePort() {
    if (this.currentPort)
      await this.serialPort.close((port: any) => {
        this.currentPort = port
      })
  }

  ngOnDestroy() {
    this.closePort().then((r) => {})
  }
}
