import { Component, signal, resource, OnInit, effect } from '@angular/core';
import { error } from 'console';
import { FormsModule } from '@angular/forms';
import { HttpClient, provideHttpClient } from '@angular/common/http';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-resource-and-rx-resource',
  imports: [AutoCompleteModule, CommonModule],

  standalone: true,
  templateUrl: './resource-and-rx-resource.component.html',
  styleUrl: './resource-and-rx-resource.component.scss'
})
export class ResourceAndRxResourceComponent {

  noRxResource: any;
  yesRxResource: any;



  constructor(private http: HttpClient) {
    effect(() => {
      console.log(this.yesRxResource);
    });
  }

  //No RX resource - signal based async call - simple operation 
  employeeNumber = signal<number>(3);
  employeeData = resource({
    //request
    request: this.employeeNumber,
    //loader
    loader: async ({ request: employeeNumber }) => {
      const response = await fetch(`https://api.restful-api.dev/objects?id=${employeeNumber}`);
      if (!response.ok) {
        throw new Error("Failed to fetch Employee details")
      }

      this.noRxResource = await response.json();

    }
  });

  onChange(employeeNumber: any) {
    this.employeeNumber.set(employeeNumber.target.value);
  }
  //End - No RX resource - signal based async call - simple operation 





  //YES RX Resource - signal based async call - simple operation
  userId = signal<number>(1);

  userData = rxResource({
    request: this.userId,
    loader: ({ request: id }) =>
      this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .pipe(
          map((response: any) => {
            this.yesRxResource = response
          }) // Process API response
        ),
  });

  updateUser(newId: any): void {
    this.userId.set(newId.target.value);
  }






}
