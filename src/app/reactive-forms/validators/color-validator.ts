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
    const value: string | undefined = control.value
    if (!value || VALID_COLORS.includes(value.toLowerCase())) {
      return null
    }
    return { invalidColor: true }
  }

  public static isValidColor(color?: string): boolean {
    if (!color) {
      return false
    }
    return VALID_COLORS.includes(color.toLowerCase())
  }
}


