import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() applyFilter = new EventEmitter<any>();

  filter = {
    fromDate: '',
    toDate: '',
    status: 'Active',
  };

  close() {
    this.closeModal.emit();
  }

  resetDateRange() {
    this.filter.fromDate = '';
    this.filter.toDate = '';
  }

  resetStatus() {
    this.filter.status = 'Active';
  }

  resetAll() {
    this.resetDateRange();
    this.resetStatus();
  }

  apply() {
    this.applyFilter.emit(this.filter);
    this.close();
  }
}
