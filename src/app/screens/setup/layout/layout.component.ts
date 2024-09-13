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
  selector: 'app-layout',
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
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  @ViewChild(DataTableDirective, { static: false }) dtElement:
    | DataTableDirective
    | undefined;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  isEditModal: boolean = false;

  layoutForm!: FormGroup;
  layouts: any[] = [];
  countryList: any[] = [];
  timeZoneList: any[] = [];

  isFilterOpen = false;
  appliedFilters = { status: 'ALL', fromDate: '', toDate: '' };
  searchTerm: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  applyFilter(filter: any) {
    this.appliedFilters = filter;
  }

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
        this.apiService.getLayout(dataTablesParameters).subscribe(
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
        { title: 'Layout Name', data: 'layout_name' },
        { title: 'Country', data: 'country_id' },
        { title: 'Region', data: 'region_id' },
        { title: 'Zone', data: 'zone_id' },
        { title: 'Sub Zone', data: 'subzone_id' },
        { title: 'Description', data: 'layout_desc' },
        { title: 'Scale', data: 'layout_scale' },
        { title: 'Status', data: 'layout_status' },
        {
          title: 'Action',
          data: null,
          defaultContent: '',
          orderable: false,
          render: (data: any, type: any, row: any) => {
            return `
              <button class="btn-edit" data-id="${row.layout_id}">
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
    this.layoutForm = this.fb.group({
      layout_id: [null], // Add layout_id to form group
      layoutName: ['', Validators.required],
      location: ['', Validators.required],
      country_id: ['', Validators.required],
      region: ['', Validators.required],
      timezone_id: ['', Validators.required],
      zone: ['', Validators.required],
      subZone: ['', Validators.required],
      layoutScale: ['1.5', Validators.required], // Optional if default value is needed
      description: ['', Validators.required],
      status: [false, Validators.required], // Boolean value for status
    });

    // Listen to changes in the country_id form control to trigger the timezone fetch
    this.layoutForm.get('country_id')?.valueChanges.subscribe((countryId) => {
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

  // Handle form submission for updating layout
  async updateLayoutHandler(): Promise<void> {
    if (this.layoutForm.invalid) {
      this.toastComponent.showToast(
        'Error',
        'Please fill all required fields',
        0
      );
      return;
    }

    const formData = {
      ...this.layoutForm.value,
      status: this.layoutForm.get('status')?.value ? 'Active' : 'Inactive',
    };

    try {
      const res = await this.apiService.updateLayout(
        formData,
        formData.layout_id
      );
      if (res?.status === 200) {
        alert('Layout Update Success');

        this.router.navigate(['/setup/layout']).then(() => {
          window.location.reload();
        });
        this.closeEditModal();
      } else {
        console.error('Failed to update layout');
      }
    } catch (error) {
      console.error('Error updating layout:', error);
    }
  }

  // Handle delete layout
  async deleteLayoutHandler(id: number): Promise<void> {
    try {
      const res = await this.apiService.deleteLayout(id);
      if (res.status === 200) {
        alert('Layout Deleted Successfully');
        this.toastComponent.showToast(
          'Success',
          'Layout Deleted Successfully',
          1
        );
        this.closeEditModal();
        this.router.navigate(['/setup/layout']).then(() => {
          window.location.reload();
        });
      } else {
        console.error('Failed to delete layout');
      }
    } catch (error) {
      console.error('Error deleting layout:', error);
    }
  }

  closeEditModal(): void {
    this.isEditModal = false;
    this.layoutForm.reset();
  }

  async getLayoutByIdHandler(id: number): Promise<void> {
    try {
      const layout = await this.apiService.getLayoutById(id);
      if (layout && layout.data) {
        this.layoutForm.patchValue({
          layout_id: layout.data.layout_id, // Ensure the layout_id is patched
          layoutName: layout.data.layout_name,
          location: layout.data.location_id, // Ensure formControlName is "location"
          country_id: layout.data.country_id,
          region: layout.data.region_id,
          zone: layout.data.zone_id,
          subZone: layout.data.subzone_id,
          layoutScale: layout.data.layout_scale,
          description: layout.data.layout_desc,
          status: layout.data.layout_status === 'Active' ? true : false, // Convert status to boolean if needed
        });

        console.log('@@', this.layoutForm.value.layout_id);

        this.isEditModal = true;
        this.getTimeZoneList(layout.data.country_id); // Fetch and pre-fill timezone
      }
    } catch (error) {
      console.error('Error fetching layout:', error);
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
    $('#layoutTable').on('click', '.btn-edit', (event) => {
      const id = $(event.currentTarget).data('id');
      this.getLayoutByIdHandler(id);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
