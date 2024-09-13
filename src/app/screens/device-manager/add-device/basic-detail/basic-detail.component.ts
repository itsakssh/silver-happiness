import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-basic-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './basic-detail.component.html',
  styleUrls: ['./basic-detail.component.scss'],
})
export class BasicDetailComponent {
  @Output() basicDetailsChange = new EventEmitter<any>();
  deviceName: any;
  deviceId: any;
  deviceLabel: any;
  deviceManagerName: any;
  orientation: any;
  synchronization: any;
  tag: any;
  keyword: any;
  status: any;
  screenConnection: any;
  enableNotification: any;
  usbDevice: any;
  restartDevice: any;
  restartApp: any;
  autoStartApp: any;
  onSubmit() {
    const deviceData = {
      deviceName: this.deviceName,
      deviceId: this.deviceId,
      deviceLabel: this.deviceLabel,
      deviceManagerName: this.deviceManagerName,
      orientation: this.orientation,
      synchronization: this.synchronization,
      tag: this.tag,
      keyword: this.keyword,
      status: this.status,
      screenConnection: this.screenConnection,
      enableNotification: this.enableNotification,
      usbDevice: this.usbDevice,
      restartDevice: this.restartDevice,
      restartApp: this.restartApp,
      autoStartApp: this.autoStartApp,
    };

    console.log('Basic Form data submitted:', deviceData);
  }
}
