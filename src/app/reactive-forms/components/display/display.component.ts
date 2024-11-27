import { Component, Input } from '@angular/core'

@Component({
  selector: 'demo-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent {

  @Input()
  public id: string = ''

  @Input()
  public text: string = ''
}
