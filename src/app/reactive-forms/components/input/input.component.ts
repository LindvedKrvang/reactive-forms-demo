import { Component, EventEmitter, Input, Output } from '@angular/core'
import { InputConfiguration } from '../../model/input-configuration'
import { ColorValidator } from '../../validators/color-validator'

@Component({
  selector: 'demo-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input({ required: true })
  public inputId!: string
  @Input()
  public input: InputConfiguration | undefined

  @Input()
  public isSelected: boolean = false

  @Output()
  public inputClicked: EventEmitter<InputConfiguration> = new EventEmitter()

  public emit(): void {
    this.inputClicked.emit(this.input ? this.input : { id: this.inputId })
  }

  public getId(): string {
    return this.input?.id ?? this.inputId
  }

  public getColor(): string {
    if (!this.input?.color || !ColorValidator.isValidColor(this.input.color)) {
      return 'grey'
    }
    return this.input.color
  }
}
