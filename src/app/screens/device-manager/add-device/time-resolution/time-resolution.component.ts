import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-time-resolution',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './time-resolution.component.html',
  styleUrls: ['./time-resolution.component.scss'],
})
export class TimeResolutionComponent {
  @Output() timeDetailsChange = new EventEmitter<any>();

  startTime: string = '';
  endTime: string = '';
  screenDimensionUnit: string = 'percentage';
  left: string = '';
  top: string = '';
  width: string = '';
  height: string = '';
  deviceLatency: string = '1 ms';
  volumeSetting: number = 70;

  onSubmit() {
    const timeData = {
      startTime: this.startTime,
      endTime: this.endTime,
      screenDimensionUnit: this.screenDimensionUnit,
      left: this.left,
      top: this.top,
      width: this.width,
      height: this.height,
      deviceLatency: this.deviceLatency,
      volumeSetting: this.volumeSetting,
    };

    // Emit the form data to the parent component
    this.timeDetailsChange.emit(timeData);

    console.log('Time/Resolution form submitted:', timeData);
  }
}
