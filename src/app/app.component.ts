import { Component, computed, inject, Injectable, OnInit, signal, runInInjectionContext, resource, effect, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculatorService } from './calculator.service';
import { LinkedSignalsComponent } from './linked-signals/linked-signals.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from './rbac/auth.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrowserModule } from '@angular/platform-browser';
import { ResourceAndRxResourceComponent } from './resource-and-rx-resource/resource-and-rx-resource.component';
import { CssCombinatorsComponent } from './css-combinators/css-combinators.component';
import { ParentAtinputComponent } from './parent-atinput/parent-atinput.component';

import { Rxjs2Component } from './rxjs-2/rxjs-2.component';
import { NgRxreduxStoreComponent } from './ng-rxredux-store/ng-rxredux-store.component';
import { audit, fromEvent, interval } from 'rxjs';
import { Rxjs3Component } from "./rxjs-3/rxjs-3.component";
import { Rxjs4Component } from "./rxjs-4/rxjs-4.component";




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule, CommonModule, AutoCompleteModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {


  //for
  arrays = [{ id: 0, name: "Balaji-1" },
  { id: 1, name: "Balaji-2" },
  { id: 2, name: "Balaji-3" },
  { id: 3, name: "Balaji-4" }
  ]

  //inject
  private calculator = inject(CalculatorService);
  injectResult = this.calculator.addSum(10, 20)

  //Resource - Dealing with async data loading from API
  myAPIData = resource({
    loader: async () => {
      return Promise.resolve({ name: "Json Data 1" })
    }
  })

  //Angular 19 have 2 expremental api - RESOURCE & RX RESOURCE


  //1 change user name
  userName = signal('Pro_Programmer_123');

  //2 user role based authorization
  isValidUser = signal(true)

  //3 simple signals
  firstName = signal("Balaji")
  myKid = signal("Advika")
  title = 'angular19_golang';
  totalPrice1 = signal<number>(0);

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private calc: CalculatorService, public authService: AuthService) {
    // setTimeout(() => {
    //   this.firstName.set("Thangavelu")
    // }, 5000);


    // //resource effect to track current API status
    // effect(() => {
    //   console.log("myAPIData- status", this.myAPIData.status());
    //   console.log("myAPIData - error", this.myAPIData.error());
    //   console.log("myAPIData - isloading", this.myAPIData.isLoading());
    //   console.log("myAPIData has value", this.myAPIData.value());
    // })

  }

  userInput: string = '';
  suggestions: string[] = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
  filteredSuggestions: string[] = [];

  filterSuggestions(event: any) {
    const query = event.query.toLowerCase();
    this.filteredSuggestions = this.suggestions.filter(item =>
      item.toLowerCase().includes(query)
    );
  }

  sampleSignal = signal(10)

  //call RBAC
  login(username: string): void {
    this.authService.login(username, 'password').subscribe();
  }
  logout(): void {
    this.authService.logout();
  }


  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      const source$ = fromEvent(document, ' click')
      const audit$ = source$.pipe(audit(() => interval(1000)))
      audit$.subscribe(value => `audit Value ${value}`)
    }
    //3 Computed Signal
    const price = signal(10);
    const quantity = signal(11);
    const totalPrice = computed(() => price() * quantity())
    console.log(totalPrice()); // Output: 50   
    const myName = signal("balaji");
    const output = computed(() => myName().toUpperCase());

    //set signals
    this.userName.set('cool_coder_789');





  }



  //5 control flow @IF @ELSE
  myBoolean = true;




}
