export interface filterInterface {
  usbVendorId: number
  usbProductId: number
}

export class AvsSerial {
  private port: any
  private ports: any = []
  private options = {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    bufferSize: 256,
    flowControl: 'none',
  }
  private writer: any
  private readFunction: Function
  private controlCharacter: string = '\n'
  private endLineCharacter: string = '\r'
  private reader: any
  private readableStreamClosed: any
  private writableStreamClosed: any
  private keepReading: boolean = true

  constructor(
    readFunction: Function,
    options?: any,
    controlCharacter?: string,
    endLineCharacter?: string
  ) {
    this.readFunction = readFunction
    if (options) this.options = options
    if (controlCharacter) this.controlCharacter = controlCharacter
    if (endLineCharacter) this.endLineCharacter = endLineCharacter
  }

  public async getPorts(filters?: filterInterface[]) {
    if ('serial' in navigator) {
      let nav: any = navigator
      const _ports = await nav.serial.getPorts()
      console.log(_ports)
      for (let i = 0; i < _ports.length - 1; i++) {
        const _port = _ports[i].getInfo()
        if (filters) {
          if (
            filters.find(
              (item) =>
                item.usbVendorId === _port.usbVendorId &&
                item.usbProductId === _port.usbProductId
            )
          ) {
            this.ports.push(_ports[i])
          }
        } else {
          this.ports.push(_ports[i])
        }
      }
    } else {
      console.error('This browser does NOT support the Web Serial API')
    }
    return this.ports
  }

  public setCurrentPort(port: any) {
    this.port = port
    // console.log(this.port)
    // localStorage.setItem('serialPort', JSON.stringify(this.port))
  }

  public async connect(callback: Function) {
    if (this.port) {
      try {
        await this.port.open(this.options)
      } catch (error) {
        console.error('Opening port error: ' + error)
        return
      }

      const textEncoder = new TextEncoderStream()
      this.writableStreamClosed = textEncoder.readable.pipeTo(
        this.port.writable
      )
      this.writer = textEncoder.writable.getWriter()

      this.readLoop()

      callback(this.port)
    } else console.warn('Port undefined')
  }

  // public async connectOld(callback: Function) {
  //   this.keepReading = true
  //   if ('serial' in navigator) {
  //     // The Web Serial API is supported by the browser.
  //     let nav: any = navigator
  //     const ports = await nav.serial.getPorts()
  //
  //     for (let i = 0; i < ports.length - 1; i++) {
  //       console.log(ports[i].getInfo())
  //     }
  //     // console.log(ports[0].getInfo())
  //     // console.log(ports[1].getInfo())
  //
  //     try {
  //       // this.port = ports[0]
  //       this.port = await nav.serial.requestPort({
  //         filters: [{usbProductId: 24592, usbVendorId: 1027}],
  //       })
  //       console.log(this.port.getInfo())
  //     } catch (error) {
  //       console.error('Requesting port error: ' + error)
  //       return
  //     }
  //
  //     try {
  //       await this.port.open(this.options)
  //     } catch (error) {
  //       console.error('Opening port error: ' + error)
  //       return
  //     }
  //
  //     const textEncoder = new TextEncoderStream()
  //     this.writableStreamClosed = textEncoder.readable.pipeTo(
  //       this.port.writable
  //     )
  //     this.writer = textEncoder.writable.getWriter()
  //
  //     this.readLoop()
  //
  //     callback(this.port)
  //   } else {
  //     console.error('This browser does NOT support the Web Serial API')
  //   }
  // }

  private async readLoop() {
    while (this.port.readable && this.keepReading) {
      const textDecoder = new TextDecoderStream()
      this.readableStreamClosed = this.port.readable.pipeTo(
        textDecoder.writable
      )
      this.reader = textDecoder.readable
        .pipeThrough(
          new TransformStream(new LineBreakTransformer(this.controlCharacter))
        )
        .getReader()

      try {
        while (true) {
          const {value, done} = await this.reader.read()
          if (done) {
            break
          }
          if (value) {
            this.readFunction(value)
          }
        }
      } catch (error) {
        console.error(
          'Read Loop error. Have the serial device been disconnected ? '
        )
      }
    }
  }

  public async sendData(data: string) {
    await this.writer.write(`${data}${this.endLineCharacter}`)
  }

  public async close(callback: Function) {
    this.keepReading = false
    this.reader.cancel()
    await this.readableStreamClosed.catch(() => {})
    this.writer.close()
    await this.writableStreamClosed
    await this.port.close()
    callback(null)
  }
}

class LineBreakTransformer {
  container: any = ''
  controlCharacter: string

  constructor(controlCharacter: string) {
    this.container = ''
    this.controlCharacter = controlCharacter
  }

  transform(chunk: any, controller: any) {
    this.container += chunk
    const lines = this.container.split(this.controlCharacter)
    this.container = lines.pop()
    lines.forEach((line: any) => controller.enqueue(line))
  }

  flush(controller: any) {
    controller.enqueue(this.container)
  }
}
