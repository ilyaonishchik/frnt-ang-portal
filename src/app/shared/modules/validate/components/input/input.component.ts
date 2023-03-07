import {Component, Input, OnChanges} from '@angular/core'
import {ValidationErrors} from '@angular/forms'

@Component({
  selector: 'avs-validate-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnChanges {
  @Input() errors: ValidationErrors | null = null
  errorMessages: string[] = []

  ngOnChanges(): void {
    if (this.errors) {
      this.errorMessages = []
      for (const errorsPropsKey in this.errors) {
        switch (errorsPropsKey) {
          case 'required': {
            this.errorMessages.push('Обязательно для заполнения')
            break
          }
          case 'min': {
            this.errorMessages.push(
              `Значение должно быть больше или равно: ${this.errors[errorsPropsKey]['min']}`
            )
            break
          }
          case 'minlength': {
            this.errorMessages.push(
              `Введено символов: ${this.errors[errorsPropsKey]['actualLength']} из минимально необходимых: ${this.errors[errorsPropsKey]['requiredLength']}`
            )
            break
          }
          case 'max': {
            this.errorMessages.push(
              `Значение должно быть меньше или равно: ${this.errors[errorsPropsKey]['max']}`
            )
            break
          }
          case 'maxlength': {
            this.errorMessages.push(
              `Введено символов: ${this.errors[errorsPropsKey]['actualLength']} из максимально возможных: ${this.errors[errorsPropsKey]['requiredLength']}`
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
