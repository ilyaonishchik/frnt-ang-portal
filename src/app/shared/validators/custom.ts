import {AbstractControl, ValidatorFn} from '@angular/forms'

export class CustomValidators {
  static mustMatch(
    firstControlName: string,
    secondControlName: string
  ): ValidatorFn {
    return (controls: AbstractControl) => {
      const firstControl = controls.get(firstControlName)
      const secondControl = controls.get(secondControlName)

      if (secondControl?.errors && !secondControl.errors['mustMatch']) {
        return null
      }

      if (firstControl?.value !== secondControl?.value) {
        controls.get(secondControlName)?.setErrors({mustMatch: true})
        return {mustMatch: true}
      } else {
        return null
      }
    }
  }
}
