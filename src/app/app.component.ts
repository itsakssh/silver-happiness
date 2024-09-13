import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './screens/login/login.component';
import { NetworkComponent } from './screens/setup/network/network.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NetworkComponent,
    LoginComponent,
    SidebarComponent,
    DashboardComponent,
    RouterOutlet,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'prowtech';
  isLoggedIn = false;
  loading = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.checkAuthentication();
  }

  checkAuthentication() {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('token');
      this.isLoggedIn = !!user;
      // setTimeout(() => {
      //   const user = localStorage.getItem('token');
      //   this.isLoggedIn = !!user;
      //   this.loading = false;
      // }, 500);
    }
  }

  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
    if (this.isLoggedIn === false && isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
}
