import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  visible: boolean = false;
  message: string = '';
  subMessage: string = '';
  statusCode: number = 1;

  showToast(message: string, subMessage: string, statusCode: number) {
    this.message = message;
    this.subMessage = subMessage;
    this.statusCode = statusCode;
    this.visible = true;
    console.warn('Showing Toast', message, subMessage, statusCode);
    setTimeout(() => {
      this.hideToast();
    }, 3000);
  }

  hideToast() {
    this.visible = false;
    console.error('Hiding toast');
  }
}
