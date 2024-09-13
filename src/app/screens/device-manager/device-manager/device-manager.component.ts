import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { FilterComponent } from '../../../components/filter/filter.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-device-manager',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    FilterComponent,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './device-manager.component.html',
  styleUrl: './device-manager.component.scss',
})
export class DeviceManagerComponent {
  searchTerm: string = '';
  isFilterOpen: boolean = false;
  autoStart: boolean = false;
  devices = [
    {
      name: 'aProwtech Standee 2024',
      id: 'utdhcthneertyyeyx1715844054335',
      createdAt: '2024-05-16 14:21:17',
      network: 'LMX AQ Testing 1',
      location: 'Prowtech Standee',
      address: 'Suite 915 2652 Ashiea',
      buildVersion: '2.8.7.9 native',
      platform: 'Android',
      googleLink: '39.4374106, -91.6617911',
      status: 'ACTIVE',
      autoStart: true,
    },
    {
      name: 'aProwtech Standee 2025',
      id: 'dfjd7gfnery5ffsd658465dcv',
      createdAt: '2024-06-12 10:15:43',
      network: 'LMX AQ Testing 2',
      location: 'Prowtech Standee',
      address: 'Suite 912 2652 High Street',
      buildVersion: '3.1.2 native',
      platform: 'Android',
      googleLink: '40.712776, -74.005974',
      status: 'INACTIVE',
      autoStart: false,
    },
    {
      name: 'aProwtech Standee 2026',
      id: 'djndjd7fner84jfnzsd5465dcv',
      createdAt: '2024-08-02 09:30:21',
      network: 'LMX AQ Testing 3',
      location: 'Prowtech Standee',
      address: 'Suite 917 2652 Broadway',
      buildVersion: '3.2.0 native',
      platform: 'Android',
      googleLink: '34.052235, -118.243683',
      status: 'UNPAIR',
      autoStart: true,
    },
    {
      name: 'aProwtech Standee 2027',
      id: 'xyzchthnerutydxfz85d58asv',
      createdAt: '2024-09-10 13:40:05',
      network: 'LMX AQ Testing 4',
      location: 'Prowtech Standee',
      address: 'Suite 920 2652 Elm Street',
      buildVersion: '2.9.0 native',
      platform: 'Android',
      googleLink: '51.507351, -0.127758',
      status: 'PREPARE',
      autoStart: false,
    },
    {
      name: 'aProwtech Standee 2028',
      id: 'kjnsd8fnwery9vfg85fdfsgd',
      createdAt: '2024-07-22 11:45:30',
      network: 'LMX AQ Testing 5',
      location: 'Prowtech Standee',
      address: 'Suite 923 2652 Oak Street',
      buildVersion: '2.7.5 native',
      platform: 'Android',
      googleLink: '48.856613, 2.352222',
      status: 'ACTIVE',
      autoStart: true,
    },
    {
      name: 'Sam Standee 2028',
      id: 'kjnsd8fnwery9vfg85fdfsgd',
      createdAt: '2024-07-22 11:45:30',
      network: 'LMX AQ Testing 5',
      location: 'Prowtech Standee',
      address: 'Suite 923 2652 Oak Street',
      buildVersion: '2.7.5 native',
      platform: 'Android',
      googleLink: '48.856613, 2.352222',
      status: 'ACTIVE',
      autoStart: true,
    },
  ];

  filteredDevices() {
    return this.devices.filter((device) =>
      device.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  applyFilter(event: any) {
    console.warn('@@-Apply Filter');
  }

  downloadLog(deviceId: string) {
    console.log('Downloading log for device:', deviceId);
  }

  editDevice(deviceId: string) {
    console.log('Editing device:', deviceId);
  }

  deleteDevice(deviceId: string) {
    console.log('Deleting device:', deviceId);
  }
  autoStartToggle(deviceId: string) {
    const device = this.devices.find((d) => d.id === deviceId);
    if (device) {
      device.autoStart = !device.autoStart;
    }
  }
}
