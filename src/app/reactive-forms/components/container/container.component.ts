import { Component } from '@angular/core'
import { InputConfiguration } from '../../model/input-configuration'
import { InputStoreService } from '../../services/input-store.service'
import { FormArray, FormGroup } from '@angular/forms'
import { InputFormService } from '../../services/input-form.service'

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

  constructor(private readonly inputStore: InputStoreService, private readonly inputFormService: InputFormService) {
    this.inputs = inputStore.getInputs()
    this.form = inputFormService.buildInputFormArray(this.inputs)
  }

  public selectInput(input: InputConfiguration): void {
    this.selectedInput = input
    this.selectedFormGroup = this.form.controls.find(control => control.get('id')?.value === input.id) as FormGroup
  }

  public getInputs(): InputConfiguration[] {
    return this.form.controls.map(control => control.value as InputConfiguration)
  }

  public getErrorMessage(): string {
    return this.inputFormService.getErrorMessageFromFormArray(this.form)
  }

  public save(): void {
    const inputs: InputConfiguration[] = this.form.value
    this.inputStore.saveInputs(inputs)
  }
}
