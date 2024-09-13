import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  navigateTo(arg0: any) {
    throw new Error('Method not implemented.');
  }
  @Input() title: string = '';
  @Input() events: any[] = [];
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  showAll: boolean = false;
  constructor(private router: Router) {}

  // ngOnInit(): void {
  //   console.log('Model', this.events);
  // }

  closeModal() {
    this.close.emit();
  }
  toggleShowAll() {
    this.showAll = !this.showAll;
  }
  logout() {
    this.toastComponent.showToast('Success', 'Logout Successfully.', 1);
    setTimeout(() => {
      console.log('Logging out...');
      localStorage.removeItem('token');
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    }, 1000);
  }
}
