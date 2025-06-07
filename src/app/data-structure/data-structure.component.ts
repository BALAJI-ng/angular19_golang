import { CommonModule, } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LinkedlistService } from '../linkedlist.service';
import { defer, of } from 'rxjs';

@Component({
  selector: 'app-data-structure',
  imports: [CommonModule, FormsModule],
  templateUrl: './data-structure.component.html',
  styleUrl: './data-structure.component.scss'
})
export class DataStructureComponent implements OnInit {
  throwTestError() {
    throw new Error('Method not implemented.');
  }
  txt: any;

  constructor(private listService: LinkedlistService) { }
  Items: string[] = [];
  filteredAdvika: string[] = []
  filteredDeepa: string[] = []
  soretedData: string[] = []
  pushA: string[] = []
  popA: string[] = []
  sliceA: string[] = []
  spliceA: string[] = []
  items: string[] = [];

  ngOnInit(): void {
    this.Items.push("Balaji")
    this.Items.push("Advika")
    this.Items.push("Deepa")

    this.filteredAdvika = this.Items.filter(x => x.includes("v"))
    this.filteredDeepa = this.Items.filter(x => x.startsWith("D"))
    this.soretedData = this.Items.sort();
    this.Items.push("AAA");
    this.pushA = [...this.Items]
    this.Items.pop()
    this.popA = [...this.Items]

    this.sliceA = this.Items.slice(0, 1)
    this.spliceA = this.Items.splice(0, 1)

    const emitRandomNumber = of(Math.random())
    emitRandomNumber.subscribe(x => console.log(`NO defer -A is subscribing ${x}`))
    emitRandomNumber.subscribe(x => console.log(`NO defer -B is subscribing ${x}`))

    const emitRandomNumberUsingDefer = defer(() => of(Math.random()))
    emitRandomNumberUsingDefer.subscribe(x => console.log(`YES defer - A is subscribing ${x}`))
    emitRandomNumberUsingDefer.subscribe(x => console.log(`YES defer - B is subscribing ${x}`))


  }

  trackByFn(i: number, item: string) {
    return item
  }

  onSubmit(txt: any) {
    this.listService.addItem(txt);
    this.updateList();
  }

  updateList() {
    let temp = this.listService.getList().head;
    this.items = [];
    while (temp) {
      this.items.push(temp.value)
      temp = temp.next;
    }
  }


}


