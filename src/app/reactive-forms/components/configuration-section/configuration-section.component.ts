import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ID_CONTROL_NAME, InputFormService } from '../../services/input-form.service'
import { CommandType } from '../../model/input-configuration'

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
    return this.inputForm?.get(ID_CONTROL_NAME)?.value
  }

  public hasCommand(): boolean {
    if (!this.inputForm) {
      return false
    }
    return this.inputFormService.hasCommandGroup(this.inputForm)
  }

  public getCommandType(): CommandType {
    return this.inputFormService.getActiveCommandType(this.inputForm!)
  }

  public addActionCommand(): void {
    if (!this.inputForm) {
      return
    }
    this.inputFormService.addActionCommandFormToGroup(this.inputForm)
  }

  public addModifierCommand(): void {
    if (!this.inputForm) {
      return
    }
    this.inputFormService.addModifierCommandFormToGroup(this.inputForm)
  }

  public clearInput(): void {
    if (!this.inputForm) {
      return
    }
    this.inputFormService.clearInputGroup(this.inputForm)
  }

  protected readonly CommandType = CommandType
}
