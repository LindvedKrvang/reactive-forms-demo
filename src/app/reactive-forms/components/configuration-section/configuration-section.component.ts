import { Component, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'demo-configuration-section',
  templateUrl: './configuration-section.component.html',
  styleUrls: ['./configuration-section.component.scss']
})
export class ConfigurationSectionComponent {

  constructor(private readonly fb: FormBuilder) {
  }

  @Input()
  public inputForm: FormGroup | undefined

  public getId(): string {
    return this.inputForm?.get('id')?.value
  }

  public hasLabel(): boolean {
    return !!this.inputForm?.get('label')
  }

  public addLabelGroup(): void {
    this.inputForm?.addControl('label', this.fb.nonNullable.group({
      id: this.fb.nonNullable.control('', [Validators.required]),
      text: this.fb.nonNullable.control('', [Validators.required])
    }))
  }

  public removeLabelGroup(): void {
    this.inputForm?.removeControl('label')
  }

  public getLabelGroup(): FormGroup {
    const labelGroup: FormGroup | null = this.inputForm?.get('label') as FormGroup | null
    if (!labelGroup) {
      throw new Error('No FromGroup for "label"')
    }
    return labelGroup
  }
}
