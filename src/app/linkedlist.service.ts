import { Injectable } from '@angular/core';
import { LinkedList } from './linked-list'

@Injectable({
  providedIn: 'root'
})
export class LinkedlistService {

  private list = new LinkedList<string>();

  constructor() { }

  addItem(value: string) {
    this.list.add(value)
  }

  getList(): LinkedList<string> {
    return this.list;
  }
}
