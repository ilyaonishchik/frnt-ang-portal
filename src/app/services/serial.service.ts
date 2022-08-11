import {Injectable, OnDestroy} from '@angular/core'
import {AvsSerial, filterInterface} from '../components/serial/avs-serial'

@Injectable({
  providedIn: 'root',
})
export class SerialService implements OnDestroy {
  serialPort: AvsSerial
  currentPort: any
  options = {
    baudRate: 19200,
    dataBits: 8,
    parity: 'none',
    bufferSize: 256,
    flowControl: 'none',
  }

  constructor() {
    this.serialPort = new AvsSerial(this.dataHandler, this.options)
  }

  dataHandler(data: string) {
    console.log(`Load from port: ${data}`)
  }

  async getPorts(filters?: filterInterface[]) {
    return await this.serialPort.getPorts(filters)
  }

  setCurrentPort(port: any) {
    this.serialPort.setCurrentPort(port)
  }

  async openPort() {
    await this.serialPort.connect((port: any) => {
      this.currentPort = port
    })
  }

  async sendToPort(data: string[]) {
    if (this.currentPort) {
      console.log(`Sending to port: ${data}`)
      for (const dataKey in data) {
        await this.serialPort.sendData(data[dataKey])
      }
    } else {
      console.error('No opening ports')
    }
  }

  async closePort() {
    if (this.currentPort) {
      await this.serialPort.close((port: any) => {
        this.currentPort = port
        console.log('Close port')
      })
    } else {
      console.warn('No opening ports')
    }
  }

  ngOnDestroy() {
    console.log('Serial service destroy...')
    this.sendToPort(['#']).then((r) => {})
    this.closePort().then((r) => {})
  }
}
