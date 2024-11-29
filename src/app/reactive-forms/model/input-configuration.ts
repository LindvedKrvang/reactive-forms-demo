export interface InputConfiguration {
  id: string
  color?: string
  label?: LabelConfiguration
  command?: Command
}

export interface LabelConfiguration {
  id: string
  text: string
}

export enum CommandType {
  ACTION = 'ACTION',
  MODIFIER= 'MODIFIER'
}

export type Command = ActionCommand | ModifierCommand

export interface ActionCommand {
  type: CommandType.ACTION
  actionId: string
}

export interface ModifierCommand {
  type: CommandType.MODIFIER
  modifier: string
}
