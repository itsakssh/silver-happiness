import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-layout',
  standalone: true,
  imports: [BreadcrumbComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './add-layout.component.html',
  styleUrls: ['./add-layout.component.scss'],
})
export class AddLayoutComponent implements OnInit {
  layoutForm!: FormGroup;
  countryList: any[] = [];
  timeZoneList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.layoutForm = this.fb.group({
      layoutName: ['', Validators.required],
      location: ['', Validators.required],
      country_id: ['', Validators.required],
      region: ['', Validators.required],
      zone: ['', Validators.required],
      subZone: ['', Validators.required],
      layoutScale: ['1.5', Validators.required],
      layoutDefault: ['yes'],
      description: [''],
      status: [false],
      timezone_id: ['', Validators.required],
    });

    this.getCountryList();

    this.layoutForm.get('country_id')?.valueChanges.subscribe((countryId) => {
      if (countryId) {
        this.getTimeZoneList(countryId);
      }
    });
  }

  async getCountryList() {
    try {
      const res = await this.apiService.getCountryList();
      if (res && res.data) {
        this.countryList = res.data;
      }
    } catch (error) {
      console.error('Error fetching country list:', error);
    }
  }

  async getTimeZoneList(countryId: number) {
    try {
      const res = await this.apiService.getTimeZone({ country_id: countryId });
      if (res && res.data) {
        this.timeZoneList = res.data;
      }
    } catch (error) {
      console.error('Error fetching timezone list:', error);
    }
  }

  async onSubmit() {
    if (this.layoutForm.invalid) {
      alert('Fields Required');
      return;
    }

    const formData = {
      layout_name: this.layoutForm.get('layoutName')?.value,
      location_id: this.layoutForm.get('location')?.value,
      country_id: this.layoutForm.get('country_id')?.value,
      region_id: this.layoutForm.get('region')?.value,
      zone_id: this.layoutForm.get('zone')?.value,
      subzone_id: this.layoutForm.get('subZone')?.value,
      layout_scale: this.layoutForm.get('layoutScale')?.value,
      layout_default: 'yes',
      layout_desc: this.layoutForm.get('description')?.value,
      layout_status: this.layoutForm.get('status')?.value
        ? 'Active'
        : 'Inactive',
    };

    try {
      const res = await this.apiService.addLayout(formData);
      console.log('@@', res);
      alert('Layout Added Successfully');
      this.router.navigate(['/setup/layout']);
      if (res == 200) {
        alert('Layout Added Successfully');
      }
    } catch (error) {
      alert('Error adding layout:');
      console.error('Error adding layout:', error);
    }
  }
}
