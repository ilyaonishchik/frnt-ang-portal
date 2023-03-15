import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @Input() visible = false
  @Input() isLoading: boolean | null = false
  @Input() errors: IBackendErrors | null = null
  @Input() subject = ''
  @Input() dialogType: 'read' | 'create' | 'update' | 'delete' | 'none' = 'none'
  @Input() itemInfo: string | number | undefined

  @Output() visibleChange = new EventEmitter<boolean>()
  @Output() saveItem = new EventEmitter<any>()
  @Output() deleteItem = new EventEmitter<any>()

  header = ''

  ngOnInit(): void {
    this.switchDialog()
  }

  private switchDialog(): void {
    switch (this.dialogType) {
      case 'create': {
        this.header = `Создание ${this.subject}`
        break
      }
      case 'read': {
        this.header = `Просмотр ${this.subject}`
        break
      }
      case 'update': {
        this.header = `Изменение ${this.subject}`
        break
      }
      case 'delete': {
        this.header = `Удаление ${this.subject}`
        break
      }
      case 'none': {
        this.header = this.subject
      }
    }
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  onSaveItem() {
    this.saveItem.emit()
  }

  onDeleteItem() {
    this.deleteItem.emit()
  }
}
