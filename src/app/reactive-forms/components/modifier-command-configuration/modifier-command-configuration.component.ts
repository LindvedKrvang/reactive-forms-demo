import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { COLOR_CONTROL_NAME, COMMAND_CONTROL_NAME, MODIFIER_ID_CONTROL_NAME } from '../../services/input-form.service'

@Component({
  selector: 'demo-modifier-command-configuration',
  templateUrl: './modifier-command-configuration.component.html',
  styleUrls: ['./modifier-command-configuration.component.scss']
})
export class ModifierCommandConfigurationComponent {

  @Input()
  public inputForm!: FormGroup

  protected readonly COMMAND_CONTROL_NAME = COMMAND_CONTROL_NAME
  protected readonly COLOR_CONTROL_NAME = COLOR_CONTROL_NAME
  protected readonly MODIFIER_ID_CONTROL_NAME = MODIFIER_ID_CONTROL_NAME
}
