import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child-atoutput',
  imports: [],
  templateUrl: './child-atoutput.component.html',
  styleUrl: './child-atoutput.component.scss'
})
export class ChildAtoutputComponent {

  @Input() comingFromParent!: string
  @Output() goingToParent = new EventEmitter<string>();


  goToYourParent() {
    this.goingToParent.emit('Appa na Nalla iruken - neenga epadi irukiga??!');
  }
}
