import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ColorValidator } from '../validators/color-validator'
import { InputConfiguration, LabelConfiguration } from '../model/input-configuration'

@Injectable({
  providedIn: 'root'
})
export class InputFormService {

  constructor(private readonly fb: FormBuilder) { }

  public buildInputFormArray(inputs: InputConfiguration[]): FormArray {
    return this.fb.array(inputs.map(input => {
        const formGroup: FormGroup = this.fb.group({
          id: [input.id],
          color: [input.color, [ColorValidator.validate, Validators.required]]
        })
        if (input.label) {
          this.adLabelFormToGroup(formGroup, input.label)
        }
        return formGroup
      })
    )
  }

  public adLabelFormToGroup(formGroup: FormGroup, label?: LabelConfiguration): void {
    formGroup.addControl('label', this.fb.nonNullable.group({
        id: this.fb.nonNullable.control(label?.id ?? '', [Validators.required]),
        text: this.fb.nonNullable.control(label?.text ?? '', [Validators.required])
      })
    )
  }

  public getErrorMessageFromFormArray(form: FormArray): string {
    if (!form.invalid) {
      return ''
    }

    return form.controls.filter(group => group.invalid).reduce((message: string, control: AbstractControl) => {
      const group: FormGroup = control as FormGroup
      if (group.get('color')?.hasError('invalidColor')) {
        return `${message} Input ${group.get('id')?.value} has an invalid color: "${group.get('color')?.value}".`
      }
      const labelGroup: FormGroup | undefined = group.get('label') as FormGroup | undefined
      if (labelGroup && labelGroup.invalid) {
        if (labelGroup.get('id')?.hasError('required')) {
          return `${message} No Id specified for label on Input ${group.get('id')?.value}.`
        }

        if (labelGroup.get('text')?.hasError('required')) {
          return `${message} No text specified for label on Input ${group.get('id')?.value}.`
        }
      }
      return ''
    }, '')
  }
}
