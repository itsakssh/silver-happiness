import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DataTablesModule } from 'angular-datatables';
import { DataTablesResponse } from '../../../data-tables-response.model';
import { ToastComponent } from '../../../components/toast/toast.component';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [
    SidebarComponent,
    BreadcrumbComponent,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    DataTablesModule,
    ToastComponent,
  ],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LocationComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  @ViewChild(DataTableDirective, { static: false }) dtElement:
    | DataTableDirective
    | undefined;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  isEditModal: boolean = false;
  locationForm!: FormGroup;
  locations: any[] = [];
  countryList: any[] = []; // Country list data
  timeZoneList: any[] = []; // Time zone list data

  isFilterOpen = false;
  appliedFilters = { status: 'ALL', fromDate: '', toDate: '' };
  searchTerm: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCountryList(); // Fetch countries when the component is initialized

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (
        dataTablesParameters: any,
        callback: (response: DataTablesResponse) => void
      ) => {
        this.apiService.getLocation(dataTablesParameters).subscribe(
          (response: DataTablesResponse) => {
            callback({
              draw: dataTablesParameters.draw,
              recordsTotal: response.recordsTotal,
              recordsFiltered: response.recordsFiltered,
              data: response.data,
            });
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
      },
      columns: [
        { title: 'Location Name', data: 'location_name' },
        { title: 'Country', data: 'country_id' },
        { title: 'Region', data: 'region_name' },
        { title: 'Zone', data: 'zone_name' },
        { title: 'Sub Zone', data: 'sub_zone_name' },
        { title: 'Description', data: 'location_desc' },
        {
          title: 'Action',
          data: null,
          defaultContent: '',
          orderable: false,
          render: (data: any, type: any, row: any) => {
            return `
              <button class="btn-edit" data-id="${row.location_id}">
                <img src="../../../assets/icons/edit.svg" class="w-5 h-5" alt="Edit">
              </button>
            `;
          },
        },
      ],
    };
  }

  // Initialize the reactive form
  initForm() {
    this.locationForm = this.fb.group({
      location_name: ['', Validators.required],
      country_id: ['', Validators.required],
      location_id: ['', Validators.required],
      region_name: ['1', Validators.required],
      timezone_id: ['', Validators.required],
      zone_name: ['', Validators.required],
      sub_zone_name: ['', Validators.required],
      location_tags: [''],
      location_desc: [''],
      location_status: [false],
    });

    // Listen to changes in the country_id form control to trigger the timezone fetch
    this.locationForm.get('country_id')?.valueChanges.subscribe((countryId) => {
      if (countryId) {
        this.getTimeZoneList(countryId); // Fetch timezones based on selected country
      }
    });
  }

  // Fetch country list from API
  async getCountryList() {
    try {
      const res = await this.apiService.getCountryList();
      if (res && res.data) {
        this.countryList = res.data; // Store the fetched country list
      }
    } catch (error) {
      console.error('Error fetching country list:', error);
    }
  }

  // Fetch timezone list based on selected country
  async getTimeZoneList(countryId: string) {
    try {
      const res = await this.apiService.getTimeZone({ country_id: countryId });
      if (res && res.data) {
        this.timeZoneList = res.data; // Store the fetched timezone list
      }
    } catch (error) {
      console.error('Error fetching time zone list:', error);
    }
  }

  // Handle form submission for updating location
  async updateLocationHandler(): Promise<void> {
    if (this.locationForm.invalid) {
      this.toastComponent.showToast(
        'Error',
        'Please fill all required fields',
        0
      );
      return;
    }

    const formData = {
      ...this.locationForm.value,
      location_status: this.locationForm.get('location_status')?.value
        ? 'Active'
        : 'Inactive',
    };

    try {
      const res = await this.apiService.updateLocation(
        formData,
        this.locationForm.get('location_id')?.value
      );
      if (res?.status === 200) {
        alert('Location Update Success');
        this.router.navigate(['/setup/location']).then(() => {
          window.location.reload();
        });
        this.closeEditModal();
      } else {
        console.error('Failed to update location');
      }
    } catch (error) {
      console.error('Error updating location:', error);
    }
  }

  // Handle delete location
  async deleteLocationHandler(id: number): Promise<void> {
    try {
      const res = await this.apiService.deleteLocation(id);
      if (res.status === 200) {
        alert('Location Delete Successfully');
        this.toastComponent.showToast(
          'Success',
          'Location Delete Successfully',
          1
        );
        this.closeEditModal();
        this.router.navigate(['/setup/location']).then(() => {
          window.location.reload();
        });
      } else {
        console.error('Failed to delete location');
      }
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  }

  closeEditModal(): void {
    this.isEditModal = false;
    this.locationForm.reset();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
    $('#locationTable').on('click', '.btn-edit', (event) => {
      const id = $(event.currentTarget).data('id');
      this.getLocationByIdHandler(id);
    });
  }

  async getLocationByIdHandler(id: number): Promise<void> {
    try {
      const location = await this.apiService.getLocationById(id);
      if (location) {
        this.locationForm.patchValue(location.data);
        this.isEditModal = true;

        this.getTimeZoneList(location.data.country_id);
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
