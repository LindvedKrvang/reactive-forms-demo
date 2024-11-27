import { Injectable } from '@angular/core';
import { InputConfiguration } from '../model/input-configuration'

const INPUTS: InputConfiguration[] = [
  {
    id: '1',
    color: 'red'
  },
  {
    id: '2',
    color: 'green',
  },
  {
    id: '3',
    color: 'grey'
  },
  {
    id: '4',
    color: 'grey'
  },
  {
    id: '5',
    color: 'grey'
  },
  {
    id: '6',
    color: 'grey'
  },
  {
    id: '7',
    color: 'grey'
  },
  {
    id: '8',
    color: 'grey'
  },
  {
    id: '9',
    color: 'grey'
  },
  {
    id: '10',
    color: 'grey'
  },
  {
    id: '11',
    color: 'grey'
  },
  {
    id: '12',
    color: 'grey'
  },
  {
    id: '13',
    color: 'grey'
  },
  {
    id: '14',
    color: 'grey'
  },
  {
    id: '15',
    color: 'grey'
  },
  {
    id: '16',
    color: 'grey'
  },
  {
    id: '17',
    color: 'grey'
  },
  {
    id: '18',
    color: 'grey'
  },
  {
    id: '19',
    color: 'grey'
  },
  {
    id: '20',
    color: 'grey'
  }
]

@Injectable({
  providedIn: 'root'
})
export class InputStoreService {

  constructor() { }

  public getInputs(): InputConfiguration[] {
    return INPUTS
  }
}
