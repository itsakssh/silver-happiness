import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-location-layout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './location-layout.component.html',
  styleUrl: './location-layout.component.scss',
})
export class LocationLayoutComponent {
  @Output() locationDetailsChange = new EventEmitter<any>();

  displayBugCheck: any;
  durationChecking: any;
  logoDisplay: any;
  dateTimeDisplay: any;
  addOverlay: any;
  defaultPlaylist: any;
  defaultLayout: any;
  gpsLongitude: any;
  gpsLatitude: any;
  address: any;
  mobileNumber: any;
  subZone: any;
  zone: any;
  region: any;
  country: any;
  location: any;
  network: any;
  onSubmit() {
    const deviceData = {
      displayBugCheck: this.displayBugCheck,
      durationChecking: this.durationChecking,
      logoDisplay: this.logoDisplay,
      dateTimeDisplay: this.dateTimeDisplay,
      addOverlay: this.addOverlay,
      defaultPlaylist: this.defaultPlaylist,
      defaultLayout: this.defaultLayout,
      gpsLongitude: this.gpsLongitude,
      gpsLatitude: this.gpsLatitude,
      address: this.address,
      mobileNumber: this.mobileNumber,
      subZone: this.subZone,
      zone: this.zone,
      region: this.region,
      country: this.country,
      location: this.location,
      network: this.network,
    };

    console.log('Location Form data submitted:', deviceData);
  }
}
