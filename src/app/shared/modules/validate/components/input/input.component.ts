import {Component, Input, OnChanges} from '@angular/core'
import {ValidationErrors} from '@angular/forms'

@Component({
  selector: 'avs-validate-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnChanges {
  @Input('errors') errorsProps: ValidationErrors | null = null
  errorMessages: string[] = []

  ngOnChanges(): void {
    if (this.errorsProps) {
      this.errorMessages = []
      for (const errorsPropsKey in this.errorsProps) {
        switch (errorsPropsKey) {
          case 'required': {
            this.errorMessages.push('Обязательно для заполнения')
            break
          }
          case 'min': {
            this.errorMessages.push(
              `Значение должно быть больше или равно: ${this.errorsProps[errorsPropsKey]['min']}`
            )
            break
          }
          case 'minlength': {
            this.errorMessages.push(
              `Введено символов: ${this.errorsProps[errorsPropsKey]['actualLength']} из минимально необходимых: ${this.errorsProps[errorsPropsKey]['requiredLength']}`
            )
            break
          }
          case 'max': {
            this.errorMessages.push(
              `Значение должно быть меньше или равно: ${this.errorsProps[errorsPropsKey]['max']}`
            )
            break
          }
          case 'maxlength': {
            this.errorMessages.push(
              `Введено символов: ${this.errorsProps[errorsPropsKey]['actualLength']} из максимально возможных: ${this.errorsProps[errorsPropsKey]['requiredLength']}`
            )
            break
          }
          case 'email': {
            this.errorMessages.push(
              'Введите корректный адрес электронной почты'
            )
            break
          }
          case 'mustMatch': {
            this.errorMessages.push('Пароли должны совпадать')
            break
          }
          default: {
            this.errorMessages.push(`Неизвестная ошибка: ${errorsPropsKey}`)
          }
        }
      }
    }
  }
}
