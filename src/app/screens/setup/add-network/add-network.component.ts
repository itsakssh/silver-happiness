import {
  Component,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { ApiService } from '../../../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { ToastComponent } from '../../../components/toast/toast.component';

@Component({
  selector: 'app-add-network',
  standalone: true,
  imports: [
    SidebarComponent,
    BreadcrumbComponent,
    CommonModule,
    ReactiveFormsModule,
    ToastComponent,
    RouterLink,
  ],
  templateUrl: './add-network.component.html',
  styleUrls: ['./add-network.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddNetworkComponent implements OnInit {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  networkForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.initForm();
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

  async onSubmit() {
    if (this.networkForm.invalid) {
      alert('Fields Required ');
      return;
    }

    const formData = {
      ...this.networkForm.value,
      background_download: this.networkForm.value.background_download
        ? 'Yes'
        : 'No',
      status: this.networkForm.value.status ? 'Active' : 'Inactive',
    };

    console.log(formData);

    const res: any = await this.apiService.addNetworks(formData);

    if (res.status == 200) {
      alert('Network Added');
      this.toastComponent.showToast(
        'Network Added!',
        'The network was added successfully.',
        1
      );

      this.router.navigate(['/setup/network']);
    } else {
      console.error('Failed to add network');
      this.toastComponent.showToast(
        'Error!',
        'Failed to add the network. Please try again later.',
        0
      );
    }
  }
}
