import { Injectable } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ColorValidator } from '../validators/color-validator'
import {
  ActionCommand,
  CommandType,
  InputConfiguration,
  LabelConfiguration,
  ModifierCommand
} from '../model/input-configuration'


export const ID_CONTROL_NAME: string = 'id'
export const TEXT_CONTROL_NAME: string = 'text'
export const COLOR_CONTROL_NAME: string = 'color'
export const LABEL_CONTROL_NAME: string = 'label'
export const COMMAND_CONTROL_NAME: string = 'command'
export const TYP_CONTROL_NAME: string = 'type'
export const ACTION_ID_CONTROL_NAME: string = 'actionId'
export const MODIFIER_ID_CONTROL_NAME: string = 'modifier'

@Injectable({
  providedIn: 'root'
})
export class InputFormService {

  constructor(private readonly fb: FormBuilder) { }

  public buildInputFormArray(inputs: InputConfiguration[]): FormArray {
    return this.fb.array(inputs.map(this.buildInputFormGroup.bind(this)))
  }

  public buildInputFormGroup(input: InputConfiguration): FormGroup {
    const formGroup: FormGroup = this.fb.group({
      id: [input.id]
    })
    if (input.color) {
      this.addColorFormToGroup(formGroup, input.color)
    }
    if (input.label) {
      this.adLabelFormToGroup(formGroup, input.label)
    }
    switch (input.command?.type) {
      case CommandType.ACTION: {
        this.addActionCommandFormToGroup(formGroup, input.command)
        break
      }
      case CommandType.MODIFIER: {
        this.addModifierCommandFormToGroup(formGroup, input.command)
        break
      }
    }
    return formGroup
  }

  private addColorFormToGroup(formGroup: FormGroup, color?: string): void {
    formGroup.addControl(COLOR_CONTROL_NAME, this.fb.nonNullable.control(color ?? '', [ColorValidator.validate]))
  }

  private removeColorFromFromGroup(formGroup: FormGroup): void {
    formGroup.removeControl(COLOR_CONTROL_NAME)
  }

  public adLabelFormToGroup(formGroup: FormGroup, label?: LabelConfiguration): void {
    formGroup.addControl(LABEL_CONTROL_NAME, this.fb.nonNullable.group({
        id: this.fb.nonNullable.control(label?.id ?? '', [Validators.required]),
        text: this.fb.nonNullable.control(label?.text ?? '', [Validators.required])
      })
    )
  }

  public getLabelFormGroup(formGroup?: FormGroup): FormGroup {
    const labelGroup: FormGroup | null = formGroup?.get(LABEL_CONTROL_NAME) as FormGroup | null
    if (!labelGroup) {
      throw new Error(`No FormGroup for "${LABEL_CONTROL_NAME}"`)
    }
    return labelGroup
  }

  public removeLabelFormFromGroup(formGroup: FormGroup): void {
    formGroup.removeControl(LABEL_CONTROL_NAME)
  }

  public hasLabelGroup(formGroup: FormGroup): boolean {
    return !!formGroup.get(LABEL_CONTROL_NAME)
  }

  public addActionCommandFormToGroup(formGroup: FormGroup, actionCommand?: ActionCommand): void {
    formGroup.addControl(COMMAND_CONTROL_NAME, this.fb.nonNullable.group({
        type: this.fb.nonNullable.control(actionCommand?.type ?? CommandType.ACTION, [Validators.required]),
        actionId: this.fb.nonNullable.control(actionCommand?.actionId ?? '', [Validators.required])
      })
    )
    this.addColorFormToGroup(formGroup)
  }

  private removeCommandFormFromGroup(formGroup: FormGroup): void {
    formGroup.removeControl(COMMAND_CONTROL_NAME)
  }

  public addModifierCommandFormToGroup(formGroup: FormGroup, modifierCommand?: ModifierCommand): void {
    formGroup.addControl(COMMAND_CONTROL_NAME, this.fb.nonNullable.group({
        type: this.fb.nonNullable.control(modifierCommand?.type ?? CommandType.MODIFIER, [Validators.required]),
        modifier: this.fb.nonNullable.control(modifierCommand?.modifier ?? '', [Validators.required])
      })
    )
    this.addColorFormToGroup(formGroup)
  }

  public clearInputGroup(formGroup: FormGroup): void {
    this.removeCommandFormFromGroup(formGroup)
    this.removeLabelFormFromGroup(formGroup)
    this.removeColorFromFromGroup(formGroup)
  }

  public hasCommandGroup(formGroup: FormGroup): boolean {
    return !!formGroup.get(COMMAND_CONTROL_NAME)
  }

  public getActiveCommandType(formGroup: FormGroup): CommandType {
    if (!!formGroup.get(COMMAND_CONTROL_NAME)) {
      const value = formGroup.get(COMMAND_CONTROL_NAME)!.get('type')!.value
      console.log(value)
      return value
    }
    throw new Error('No CommandType for FormGroup')
  }

  public getErrorMessageFromFormArray(form: FormArray): string {
    if (!form.invalid) {
      return ''
    }

    return form.controls.filter(group => group.invalid).reduce((message: string, control: AbstractControl) => {
      const group: FormGroup = control as FormGroup
      if (group.get(COLOR_CONTROL_NAME)?.hasError('invalidColor')) {
        return `${message} Input ${group.get(ID_CONTROL_NAME)?.value} has an invalid color: "${group.get(COLOR_CONTROL_NAME)?.value}".`
      }

      const labelGroup: FormGroup | undefined = group.get(LABEL_CONTROL_NAME) as FormGroup | undefined
      if (labelGroup && labelGroup.invalid) {
        if (labelGroup.get(ID_CONTROL_NAME)?.hasError('required')) {
          return `${message} No Id specified for label on Input ${group.get(ID_CONTROL_NAME)?.value}.`
        }

        if (labelGroup.get(TEXT_CONTROL_NAME)?.hasError('required')) {
          return `${message} No text specified for label on Input ${group.get(ID_CONTROL_NAME)?.value}.`
        }
      }

      if (group.get(COMMAND_CONTROL_NAME) && group.get(COMMAND_CONTROL_NAME)?.invalid) {
        const commandGroup: FormGroup = group.get(COMMAND_CONTROL_NAME) as FormGroup
        if (commandGroup.get('actionId')?.hasError('required')) {
          return `${message} ActionId is required for Input ${group.get(ID_CONTROL_NAME)?.value}.`
        }

        if (commandGroup.get('modifier')?.hasError('required')) {
          return `${message} Modifier is required for Input ${group.get(ID_CONTROL_NAME)?.value}.`
        }
      }

      return ''
    }, '')
  }
}
