import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private vehicleUrl = 'https://swapi.py4e.com/api/vehicles/'

  //Injected service
  private http = inject(HttpClient);

  //signals managed by service
  selectedVehicle = signal<Vehicle | undefined>(undefined);

  //Reset the quantity when vehicle changes
  quantity = linkedSignal({
    source: this.selectedVehicle,
    computation: (v) => {
      if (v) {
        return v.passengers == 0 ? v.crew : v.passengers;
      }
      return 0;
    }
  })

  //computed signals
  total = computed(() => (this.selectedVehicle()?.cost_in_credits ?? 0) * this.quantity());

  color = computed(() => (this.total() > 50000 ? 'green' : 'blue'))

  vehicles = computed(() => this.vehiclesResource.value() ?? ([] as Vehicle[]))

  constructor() { }

  //api call
  vehiclesResource = rxResource({
    loader: () => this.http.get<VehicleResponse>(this.vehicleUrl)
      .pipe(map((vr) => vr.results))
  })



}




export interface VehicleResponse {
  count: number;
  next: string;
  previous: any;
  results: Vehicle[]
}

export interface Vehicle {
  name: string;
  cost_in_credits: number;
  passengers: number;
  crew: number;
}
