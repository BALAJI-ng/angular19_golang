import { Component, inject } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-linked-signals',
  imports: [FormsModule, CommonModule],
  templateUrl: './linked-signals.component.html',
  styleUrl: './linked-signals.component.scss',
  standalone: true
})
export class LinkedSignalsComponent {

  private vehicleService = inject(VehicleService)

  vehicles = this.vehicleService.vehicles;
  selectedVehicle = this.vehicleService.selectedVehicle;
  quantity = this.vehicleService.quantity;
  total = this.vehicleService.total;
  color = this.vehicleService.color;

}
