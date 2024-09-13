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
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DataTablesModule } from 'angular-datatables';
import { ToastComponent } from '../../../components/toast/toast.component';

@Component({
  selector: 'app-network',
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
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NetworkComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  isEditModal: boolean = false;
  networks: any[] = [];
  networkId!: number;

  selectedNetwork: any = {};

  // Reactive Form
  networkForm!: FormGroup;

  // Filter logic
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
    this.setupDataTable();
  }

  initForm() {
    this.networkForm = this.fb.group({
      network_name: ['', [Validators.required]],
      network_tag: [''],
      network_desc: [''],
      device_start_time: ['00:00', [Validators.required]],
      device_end_time: ['00:00', [Validators.required]],
      device_playlog_interval: ['10', [Validators.required]],
      device_volume_range: [100, [Validators.required]],
      device_screen_brightness: ['100', [Validators.required]],
      default_start_date: ['2024-01-01', [Validators.required]],
      default_play_list: ['Playlist1', [Validators.required]],
      default_duration: ['100', [Validators.required]],
      default_layout: [1, [Validators.required]],
      background_download: [false],
      status: [false],
    });
  }

  setupDataTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback: (response: any) => void) => {
        this.apiService.getNetworks(dataTablesParameters).subscribe(
          (res: any) => {
            this.networks = res.data;
            callback({
              draw: dataTablesParameters.draw,
              recordsTotal: res.recordsTotal,
              recordsFiltered: res.recordsFiltered,
              data: res.data,
            });
          },
          (error) => {
            console.error('Error fetching networks:', error);
          }
        );
      },
      columns: [
        { title: 'Network Name', data: 'network_name' },
        { title: 'Start Time', data: 'device_start_time' },
        { title: 'End Time', data: 'device_end_time' },
        { title: 'Play Log Interval', data: 'device_playlog_interval' },
        {
          title: 'Actions',
          data: null,
          orderable: false,
          render: (data: any, type: any, row: any) => {
            return `
              <button class="btn-edit" data-id="${row.network_id}">
                <img src="../../../assets/icons/edit.svg" class="w-5 h-5" alt="Edit">
              </button>
            `;
          },
        },
      ],
    };
  }

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  applyFilter(filter: any) {
    this.appliedFilters = filter;
  }

  filteredNetworks() {
    return this.networks
      .filter((network) => {
        if (this.searchTerm) {
          return network.network_name
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());
        }
        return true;
      })
      .filter((network) => {
        if (
          this.appliedFilters.status &&
          this.appliedFilters.status !== 'ALL'
        ) {
          return network.status === this.appliedFilters.status;
        }
        return true;
      });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
    $('#networkTable').on('click', '.btn-edit', (event) => {
      const id = $(event.currentTarget).data('id');
      this.getNetworkByIdHandler(id);
    });
  }

  async getNetworkByIdHandler(id: number): Promise<void> {
    try {
      const network = await this.apiService.getNetworkById(id);
      if (network) {
        this.selectedNetwork = network.data;
        this.isEditModal = true;
        this.networkForm.patchValue(this.selectedNetwork);
      }
    } catch (error) {
      console.error('Error fetching network:', error);
    }
  }

  closeEditModal(): void {
    this.isEditModal = false;
    this.selectedNetwork = {};
    this.networkForm.reset();
  }

  async updateNetworkHandler(): Promise<void> {
    if (this.networkForm.invalid) {
      this.toastComponent.showToast(
        'Error',
        'Please fill all required fields.',
        0
      );
      return;
    }

    const formData = {
      ...this.networkForm.value,
      background_download: this.networkForm.value.background_download
        ? 'Yes'
        : 'No',
      status: this.networkForm.value.status ? 'Active' : 'Inactive',
    };
    try {
      const res = await this.apiService.updateNetwork(
        formData,
        this.selectedNetwork.network_id
      );
      if (res?.status === 200) {
        alert('Network Update Successfully');
        this.toastComponent.showToast(
          'Success',
          'Network Update Successfully',
          1
        );
        this.router.navigate(['/setup/network']).then(() => {
          window.location.reload();
        });
        this.closeEditModal();
      } else {
        this.toastComponent.showToast(
          'Error',
          'Failed to update network. Please try again later.',
          0
        );
      }
    } catch (error) {
      console.error('Error updating network:', error);
    }
  }

  async deleteNetworkHandler(id: number): Promise<void> {
    try {
      const res = await this.apiService.deleteNetwork(id);
      if (res.status === 200) {
        alert('Network Delete Successfully');
        this.toastComponent.showToast(
          'Success',
          'Network Delete Successfully',
          1
        );
        this.closeEditModal();
        this.router.navigate(['/setup/network']).then(() => {
          window.location.reload();
        });
      } else {
        console.error('Failed to delete network');
      }
    } catch (error) {
      console.error('Error deleting network:', error);
    }
  }

  rerender(): void {
    this.dtElement?.dtInstance.then((dtInstance: { destroy: () => void }) => {
      dtInstance.destroy();
      this.dtTrigger.next(null);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
