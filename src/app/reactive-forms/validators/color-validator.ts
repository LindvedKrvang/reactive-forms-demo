import { AbstractControl, ValidationErrors } from '@angular/forms'

const VALID_COLORS: string[] = [
  'red',
  'green',
  'blue',
  'yellow',
  'white',
  'grey',
  'orange'
]

export class ColorValidator {

  public static validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const value: string = control.value
    if (VALID_COLORS.includes(value.toLowerCase())) {
      return null
    }
    return { invalidColor: true }
  }
}


