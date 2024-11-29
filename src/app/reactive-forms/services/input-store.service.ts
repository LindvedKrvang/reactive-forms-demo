import { Injectable } from '@angular/core';
import { InputConfiguration } from '../model/input-configuration'

const INPUTS_STORAGE_KEY: string = 'INPUTS'

const INPUTS: InputConfiguration[] = [
  {
    id: '1'
  },
  {
    id: '2'
  },
  {
    id: '3'
  },
  {
    id: '4'
  },
  {
    id: '5'
  },
  {
    id: '6'
  },
  {
    id: '7'
  },
  {
    id: '8'
  },
  {
    id: '9'
  },
  {
    id: '10'
  },
  {
    id: '11'
  },
  {
    id: '12'
  },
  {
    id: '13'
  },
  {
    id: '14'
  },
  {
    id: '15'
  },
  {
    id: '16'
  },
  {
    id: '17'
  },
  {
    id: '18'
  },
  {
    id: '19'
  },
  {
    id: '20'
  }
]

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
