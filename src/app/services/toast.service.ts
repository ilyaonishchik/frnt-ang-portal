import {Injectable, TemplateRef} from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any[] = []

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({textOrTpl, ...options})
  }

  showInfo(text: string, header: string = 'Информация') {
    this.show(text, {
      header: header,
      classname: 'bg-info text-light',
    })
  }

  showWarning(text: string, header: string = 'Внимание') {
    this.show(text, {
      header: header,
      classname: 'bg-warning text-light',
      delay: 10000,
    })
  }

  showPrimary(text: string, header: string = 'Primary') {
    this.show(text, {
      header: header,
      classname: 'bg-primary text-light',
    })
  }

  showSuccess(text: string, header: string = 'Выполнено') {
    this.show(text, {
      header: header,
      classname: 'bg-success text-light',
    })
  }

  showError(text: string, header: string = 'Ошибка') {
    this.show(text, {
      header: header,
      classname: 'bg-danger text-light',
      delay: 15000,
    })
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast)
  }

  clear() {
    this.toasts.splice(0, this.toasts.length)
  }
}
