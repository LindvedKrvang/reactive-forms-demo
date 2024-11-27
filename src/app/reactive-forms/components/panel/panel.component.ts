import { Component, EventEmitter, Input, Output } from '@angular/core'
import { InputConfiguration } from '../../model/input-configuration'

@Component({
  selector: 'demo-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {

  @Input()
  public inputs: InputConfiguration[] = []

  @Output()
  public inputSelected: EventEmitter<InputConfiguration> = new EventEmitter()

  public selectedInput: InputConfiguration | undefined

  public getInput(inputId: string): InputConfiguration {
    const input: InputConfiguration | undefined = this.inputs.find(input => input.id === inputId)
    if (!input) {
      throw new Error(`Unknown inputId: ${inputId}`)
    }
    return input
  }

  public markSelectedInput(input: InputConfiguration): void {
    this.selectedInput = input
    this.inputSelected.emit(this.selectedInput)
  }

  public isSelected(inputId: string): boolean {
    return this.selectedInput?.id === inputId
  }

  public getLabelText(labelId: string): string {
    return this.inputs.filter(input => input.label?.id === labelId).map(input => input.label?.text).toString()
  }
}
