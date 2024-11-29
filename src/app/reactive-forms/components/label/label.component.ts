import { Component, Input } from '@angular/core'
import { ID_CONTROL_NAME, InputFormService, TEXT_CONTROL_NAME } from '../../services/input-form.service'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'demo-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent {

  @Input()
  public inputForm!: FormGroup

  constructor(private readonly inputFormService: InputFormService) {
  }

  public hasLabel(): boolean {
    return this.inputFormService.hasLabelGroup(this.inputForm)
  }

  public addLabelGroup(): void {
    this.inputFormService.adLabelFormToGroup(this.inputForm)
  }

  public removeLabelGroup(): void {
    this.inputFormService.removeLabelFormFromGroup(this.inputForm)
  }

  public getLabelGroup(): FormGroup {
    return this.inputFormService.getLabelFormGroup(this.inputForm)
  }

  protected readonly ID_CONTROL_NAME = ID_CONTROL_NAME
  protected readonly TEXT_CONTROL_NAME = TEXT_CONTROL_NAME
}
