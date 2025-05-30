import { Component } from '@angular/core';
import { ChildAtoutputComponent } from '../child-atoutput/child-atoutput.component';

@Component({
  selector: 'app-parent-atinput',
  imports: [ChildAtoutputComponent],
  templateUrl: './parent-atinput.component.html',
  styleUrl: './parent-atinput.component.scss'
})
export class ParentAtinputComponent {
  appaSentYouMessage: string = "Thambi Balaji epa iruka, Vetla Amma, Banu, Mathan epadi irukanga?? Banu keep on thinking me .. tell her that I am with her";
  whatBalajiSenttoAppa: string = "";

  methodToCapureFromChildAndDisplay(messageFromBalaji: any) {

    this.whatBalajiSenttoAppa = messageFromBalaji;
  }
}
