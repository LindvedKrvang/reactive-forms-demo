import { Component, Input } from '@angular/core'
import { ACTION_ID_CONTROL_NAME, COLOR_CONTROL_NAME, COMMAND_CONTROL_NAME } from '../../services/input-form.service'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'demo-action-command-configuration',
  templateUrl: './action-command-configuration.component.html',
  styleUrls: ['./action-command-configuration.component.scss']
})
export class ActionCommandConfigurationComponent {

  @Input()
  public inputForm!: FormGroup

  protected readonly COMMAND_CONTROL_NAME = COMMAND_CONTROL_NAME
  protected readonly COLOR_CONTROL_NAME = COLOR_CONTROL_NAME
  protected readonly ACTION_ID_CONTROL_NAME = ACTION_ID_CONTROL_NAME
}
