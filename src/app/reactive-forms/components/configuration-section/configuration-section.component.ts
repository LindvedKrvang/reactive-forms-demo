import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { InputFormService } from '../../services/input-form.service'

@Component({
  selector: 'demo-configuration-section',
  templateUrl: './configuration-section.component.html',
  styleUrls: ['./configuration-section.component.scss']
})
export class ConfigurationSectionComponent {

  constructor(private readonly inputFormService: InputFormService) {
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
    if (!this.inputForm) {
      return
    }
    this.inputFormService.adLabelFormToGroup(this.inputForm)
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
