import { Routes } from '@angular/router';
import { DeviceManagerComponent } from './screens/device-manager/device-manager/device-manager.component';
import { LoginComponent } from './screens/login/login.component';
import { NotFoundComponent } from './screens/not-found/not-found.component';

import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { NetworkComponent } from './screens/setup/network/network.component';
import { LocationComponent } from './screens/setup/location/location.component';
import { PlaylistComponent } from './screens/setup/playlist/playlist.component';
import { LayoutComponent } from './screens/setup/layout/layout.component';
import { AddNetworkComponent } from './screens/setup/add-network/add-network.component';
import { AddLocationComponent } from './screens/setup/add-location/add-location.component';
import { AddPlaylistComponent } from './screens/setup/add-playlist/add-playlist.component';
import { AddLayoutComponent } from './screens/setup/add-layout/add-layout.component';

import { AddDeviceComponent } from './screens/device-manager/add-device/add-device.component';
export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: DashboardComponent },
  //Device Manager
  { path: 'device-manager', component: DeviceManagerComponent },
  { path: 'device-manager/add-device', component: AddDeviceComponent },
  //Setup Screen
  { path: 'setup/network', component: NetworkComponent },
  { path: 'setup/location', component: LocationComponent },
  { path: 'setup/playlist', component: PlaylistComponent },
  { path: 'setup/layout', component: LayoutComponent },

  { path: 'setup/add-network', component: AddNetworkComponent },
  { path: 'setup/add-location', component: AddLocationComponent },
  { path: 'setup/add-playlist', component: AddPlaylistComponent },
  { path: 'setup/add-layout', component: AddLayoutComponent },

  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
