import { Component } from '@angular/core'
import { InputConfiguration } from '../../model/input-configuration'
import { InputStoreService } from '../../services/input-store.service'
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ColorValidator } from '../../validators/color-validator'

@Component({
  selector: 'demo-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {

  public inputs: InputConfiguration[]
  public selectedInput: InputConfiguration = { } as any
  public selectedFormGroup: FormGroup | undefined

  public form: FormArray

  constructor(private readonly inputStore: InputStoreService, fb: FormBuilder) {
    this.inputs = inputStore.getInputs()
    this.form = fb.array(this.inputs.map(input => {
      const formGroup: FormGroup = fb.group({
        id: [input.id],
        color: [input.color, [ColorValidator.validate, Validators.required]]
      })
      if (input.label) {
        formGroup.addControl('label', fb.nonNullable.group({
          id: fb.nonNullable.control(input.label.id, [Validators.required]),
          text: fb.nonNullable.control(input.label.text, [Validators.required])
        }))
      }
      return formGroup
      })
    )
  }

  public selectInput(input: InputConfiguration): void {
    this.selectedInput = input
    this.selectedFormGroup = this.form.controls.find(control => control.get('id')?.value === input.id) as FormGroup
  }

  public getInputs(): InputConfiguration[] {
    return this.form.controls.map(control => control.value as InputConfiguration)
  }

  public getErrorText(): string {
    if (!this.form.invalid) {
      return ''
    }

    return this.form.controls.filter(group => group.invalid).reduce((message: string, control: AbstractControl) => {
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

  public save(): void {
    const inputs: InputConfiguration[] = this.form.value
    this.inputStore.saveInputs(inputs)
  }
}
