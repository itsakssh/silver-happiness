import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';

import { LocationLayoutComponent } from './location-layout/location-layout.component';
import { BasicDetailComponent } from './basic-detail/basic-detail.component';
import { TimeResolutionComponent } from './time-resolution/time-resolution.component';

@Component({
  selector: 'app-add-device',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    FormsModule,
    CommonModule,
    LocationLayoutComponent,
    BasicDetailComponent,
    TimeResolutionComponent,
  ],
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss'],
})
export class AddDeviceComponent {
  currentTab: string = 'basic-details';

  // Form data objects
  basicDetails = {};
  locationDetails = {};
  timeDetails = {};

  switchTab(tab: string) {
    this.currentTab = tab;
  }

  onBasicDetailsChange(data: any) {
    this.basicDetails = data;
  }

  onLocationDetailsChange(data: any) {
    this.locationDetails = data;
  }

  onTimeDetailsChange(data: any) {
    this.timeDetails = data;
  }

  onSubmit() {
    const allFormData = {
      ...this.basicDetails,
      ...this.locationDetails,
      ...this.timeDetails,
    };
    console.log('Form Data:', allFormData);
  }
}
