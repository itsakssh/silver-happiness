import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ToastComponent } from '../../components/toast/toast.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, ToastComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent {
  isLoading: boolean = false;
  email: string = 'john.doe@example.com';
  password: string = 'P@ssw0rd123';
  rememberMe: boolean = false;
  selectedLogin: string = 'admin';

  constructor(private router: Router, private apiService: ApiService) {}
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  async onSubmit() {
    this.isLoading = true;
    if (this.email && this.password) {
      let data = {
        email: this.email,
        password: this.password,
      };
      const res: any = await this.apiService.login(data);
      console.log(res);
      if (res.status == 200) {
        this.toastComponent.showToast('Success', 'Login Successfully.', 1);
        localStorage.setItem('token', res.token);
        setTimeout(() => {
          this.router.navigate(['/dashboard']).then(() => {
            window.location.reload();
          });
        }, 1000);
        this.isLoading = false;
      } else {
        this.toastComponent.showToast('Error!', ' Please try again later.', 0);
        console.error('Failed to add network');
      }
    } else {
      console.log('Form is not valid');
    }
  }
  setLoginType(type: string) {
    this.selectedLogin = type;
  }
}
