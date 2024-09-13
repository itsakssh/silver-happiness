import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { FilterComponent } from '../../../components/filter/filter.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-location',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    FilterComponent,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss'],
})
export class AddLocationComponent implements OnInit {
  locationName: string = '';
  country: number = 0; // To store selected country ID
  timeZone: number = 0; // To store selected timezone ID
  region: string = '';
  zoneName: string = '';
  subZoneName: string = '';
  tags: string = '';
  description: string = '';
  status: boolean = false;

  countryList: any[] = []; // List of countries fetched from the API
  timeZoneList: any[] = []; // List of time zones fetched based on country

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getCountryList(); // Load countries when the component initializes
  }

  // Fetch country list from API
  async getCountryList() {
    try {
      const res = await this.apiService.getCountryList();
      if (res && res.data) {
        this.countryList = res.data; // Populate country list
      }
    } catch (error) {
      console.error('Error fetching country list:', error);
    }
  }

  // Fetch time zones based on selected country
  async onCountryChange(countryId: number) {
    try {
      const res = await this.apiService.getTimeZone({ country_id: countryId });
      if (res && res.data) {
        this.timeZoneList = res.data; // Populate time zone list based on selected country
      }
    } catch (error) {
      console.error('Error fetching time zone list:', error);
    }
  }

  // Submit the form data
  async onSubmit() {
    const statusString = this.status ? 'Active' : 'Inactive';

    const data = {
      location_name: this.locationName,
      country_id: this.country, // Submit the selected country ID
      region_name: this.region,
      timezone_id: this.timeZone, // Submit the selected timezone ID
      zone_name: this.zoneName,
      sub_zone_name: this.subZoneName,
      location_tags: this.tags,
      location_desc: this.description,
      location_status: statusString,
    };

    try {
      const res = await this.apiService.addLocation(data);
      if (res && res.status==200) {
        // Handle successful submission (e.g., navigate to another page)
        this.router.navigate(['/setup/location']);
      }
    } catch (error) {
      console.error('Error adding location:', error);
    }
  }
}
