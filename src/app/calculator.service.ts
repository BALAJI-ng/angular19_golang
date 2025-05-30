import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  addSum(a: number, b: number) {
    return a + b;
  }
}
