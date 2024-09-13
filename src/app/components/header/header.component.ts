import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ToastComponent } from "../toast/toast.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ModalComponent, ToastComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  clockModalOpen: boolean = false;
  notificationModalOpen: boolean = false;
  locationModalOpen: boolean = false;
  profileModalOpen: boolean = false;

  notifications = [
    {
      title: 'Abben_10TS....mp4',
      description: 'Lorem ipsum dolor sit...',
      time: 'Yesterday',
      canDelete: false,
    },
    {
      title: 'Abben_10TS....mp4',
      description: 'Lorem ipsum dolor sit...',
      time: 'Today',
      canDelete: false,
    },
    {
      title: 'Abben_10TS....mp4',
      description: 'Lorem ipsum dolor sit...',
      time: '11:12 AM',
      canDelete: false,
    },
    {
      title: 'Abben_10TS....mp4',
      description: 'Lorem ipsum dolor sit...',
      time: '02:10 PM',
      canDelete: true,
    },
    {
      title: 'Abben_10TS....mp4',
      description: 'Lorem ipsum dolor sit...',
      time: '06:00 AM',
      canDelete: true,
    },
  ];

  devices = [
    { name: 'Akash', status: 'Online', statusClass: 'text-green-500' },
    { name: 'Rick', status: 'Blacklist', statusClass: 'text-red-500' },
    { name: 'Velocity', status: 'Offline', statusClass: 'text-orange-500' },
    { name: 'Contus', status: 'Unpaired', statusClass: 'text-gray-500' },
    { name: 'Royal Blue', status: 'Offline', statusClass: 'text-orange-500' },
    { name: 'Alexas', status: 'Unpaired', statusClass: 'text-gray-500' },
  ];
  brands = [
    {
      name: 'Brand Name 1',
      description: 'Lorem ipsum dolor sit amet...',
      time: 'Today',
    },
    {
      name: 'Brand Name 2',
      description: 'Lorem ipsum dolor sit amet...',
      time: '11:12 AM',
    },
    {
      name: 'Brand Name 3',
      description: 'Lorem ipsum dolor sit amet...',
      time: '02:10 PM',
    },
    {
      name: 'Brand Name 4',
      description: 'Lorem ipsum dolor sit amet...',
      time: '06:00 AM',
    },
    {
      name: 'Brand Name 2',
      description: 'Lorem ipsum dolor sit amet...',
      time: '11:12 AM',
    },
    {
      name: 'Brand Name 3',
      description: 'Lorem ipsum dolor sit amet...',
      time: '02:10 PM',
    },
    {
      name: 'Brand Name 4',
      description: 'Lorem ipsum dolor sit amet...',
      time: '06:00 AM',
    },
    {
      name: 'Brand Name 2',
      description: 'Lorem ipsum dolor sit amet...',
      time: '11:12 AM',
    },
    {
      name: 'Brand Name 3',
      description: 'Lorem ipsum dolor sit amet...',
      time: '02:10 PM',
    },
    {
      name: 'Brand Name 4',
      description: 'Lorem ipsum dolor sit amet...',
      time: '06:00 AM',
    },
  ];
  profileLinks = [
    {
      label: 'User Account Information',
      icon: 'assets/icons/user-info.svg',
      url: '/user-account',
    },
    {
      label: 'Permissions',
      icon: 'assets/icons/permission.svg',
      url: '/permissions',
    },
    {
      label: 'Personal Details',
      icon: 'assets/icons/clipboard.svg',
      url: '/personal-details',
    },
    {
      label: 'Password Management',
      icon: 'assets/icons/password.svg',
      url: '/password-management',
    },
    { label: 'Logout', icon: 'assets/icons/logout.svg', url: '/logout' },
  ];

  toggleClockModal() {
    this.closeAllModals();
    this.clockModalOpen = true;
  }

  toggleNotificationModal() {
    this.closeAllModals();
    this.notificationModalOpen = true;
  }

  toggleLocationModal() {
    this.closeAllModals();
    this.locationModalOpen = true;
  }

  toggleProfileModal() {
    this.closeAllModals();
    this.profileModalOpen = true;
  }

  closeAllModals() {
    this.clockModalOpen = false;
    this.notificationModalOpen = false;
    this.locationModalOpen = false;
    this.profileModalOpen = false;
  }
}
