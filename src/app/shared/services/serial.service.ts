import {Injectable} from '@angular/core'
import {AvsSerial, filterInterface} from '../classes/avs-serial'

@Injectable({
  providedIn: 'root',
})
export class SerialService {
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

  async getPorts(filters: filterInterface[] = [], request = false) {
    return await this.serialPort.getPorts(filters, request)
  }

  setCurrentPort(port: any) {
    this.serialPort.setCurrentPort(port)
  }

  async openPort() {
    await this.serialPort.connect((port: any) => {
      this.currentPort = port
    })
  }

  private async sendToPort(data: string[]) {
    if (this.currentPort) {
      for (const dataKey in data) {
        await this.serialPort.sendData(data[dataKey])
      }
    } else {
      console.warn('No opening ports')
    }
  }

  async sendData(data: string[]) {
    await this.openPort()
    await this.sendToPort(data)
    await this.closePort()
  }

  async clearDigits() {
    await this.sendData(['#'])
  }

  async closePort() {
    if (this.currentPort) {
      await this.serialPort.close((port: any) => {
        this.currentPort = port
      })
    }
  }
}
