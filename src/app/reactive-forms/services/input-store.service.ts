import { Injectable } from '@angular/core';
import { InputConfiguration } from '../model/input-configuration'

const INPUTS_STORAGE_KEY: string = 'INPUTS'

const INPUTS: InputConfiguration[] = []

@Injectable({
  providedIn: 'root'
})
export class InputStoreService {

  constructor() { }

  public getInputs(): InputConfiguration[] {
    const savedInputs: string | null = localStorage.getItem(INPUTS_STORAGE_KEY)
    if (!savedInputs) {
      return INPUTS
    }
    return JSON.parse(savedInputs)
  }

  public saveInputs(inputs: InputConfiguration[]): void {
    localStorage.setItem(INPUTS_STORAGE_KEY, JSON.stringify(inputs))
  }
}
