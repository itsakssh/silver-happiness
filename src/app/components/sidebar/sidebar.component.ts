import { Component } from '@angular/core';
import { MenuLinkComponent } from '../menu-link/menu-link.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MenuLinkComponent, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  menuItems = [
    {
      href: '/dashboard',
      iconPath: 'assets/icons/dashboard.svg',
      text: 'Dashboard',
    },
    {
      href: '/device-manager',
      iconPath: 'assets/icons/device.svg',
      text: 'Device Manager',
    },
    {
      href: null,
      iconPath: 'assets/icons/setup.svg',
      text: 'Setup',
      subMenuItems: [
        { href: '/setup/network', text: 'Network' },
        { href: '/setup/location', text: 'Location' },
        { href: '/setup/playlist', text: 'Playlist' },
        { href: '/setup/layout', text: 'Layout' },
      ],
    },
    {
      href: null,
      iconPath: 'assets/icons/brand.svg',
      text: 'Brand',
      subMenuItems: [
        { href: '/brand/brand-list', text: 'Brand List' },
        { href: '/brand/brand-api', text: 'Brand API' },
      ],
    },
    {
      href: '/storage',
      iconPath: 'assets/icons/storage.svg',
      text: 'Storage',
    },
    {
      href: '/schedule-content',
      iconPath: 'assets/icons/schedule_content.svg',
      text: 'Schedule Content',
    },
    {
      href: null,
      iconPath: 'assets/icons/approved.svg',
      text: 'Approval',
      subMenuItems: [
        { href: '/approval/content', text: 'Content' },
        { href: '/approval/campaign', text: 'Campaign' },
      ],
    },
    {
      href: null,
      iconPath: 'assets/icons/monitor.svg',
      text: 'Monitoring',
      subMenuItems: [
        { href: '/monitoring/log-device', text: 'Log Device' },
        { href: '/monitoring/log-user', text: 'Log User' },
        { href: '/monitoring/log-campaign', text: 'Log Campaign' },
        { href: '/monitoring/device-screenshot', text: 'Device Screenshot' },
        {
          href: '/monitoring/broadcasting-status',
          text: 'Broadcasting Status',
        },
        { href: '/monitoring/brand-access', text: 'Brand Access' },
        { href: '/monitoring/black-list-device', text: 'Black List Device' },
      ],
    },
    {
      href: '/user-management',
      iconPath: 'assets/icons/user.svg',
      text: 'User Management',
    },
    {
      href: null,
      iconPath: 'assets/icons/bulk.svg',
      text: 'Bulk',
      subMenuItems: [
        { href: '/bulk/group-management', text: 'Group Management' },
        { href: '/bulk/switch-network', text: 'Switch Network' },
        { href: '/bulk/switch-location', text: 'Switch Location' },
        { href: '/bulk/switch-playlist', text: 'Switch Playlist' },
        { href: '/bulk/hot-switch', text: 'Hot Switch' },
        { href: '/bulk/download-tvc', text: 'Download TVC to Device' },
        { href: '/bulk/call-off-tvc', text: 'Call off TVC' },
        { href: '/bulk/call-off-campaign', text: 'Call off Campaign' },
        { href: '/bulk/device-screenshot', text: 'Device Screenshot' },
      ],
    },
    {
      href: null,
      iconPath: 'assets/icons/control_panel.svg',
      text: 'Control Panel',
      subMenuItems: [
        { href: '/control-panel/cms-setting', text: 'CMS Setting' },
        {
          href: '/control-panel/telegram-notification',
          text: 'Telegram Notification',
        },
        { href: 'control-panel/device-setting', text: 'Device Setting' },
      ],
    },
  ];

  isSidebarOpen = false;
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
