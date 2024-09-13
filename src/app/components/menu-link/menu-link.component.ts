import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-menu-link',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-link.component.html',
  styleUrls: ['./menu-link.component.scss'],
})
export class MenuLinkComponent {
  @Input() linkData: any;
  isSubMenuOpen = false;

  constructor(private cdr: ChangeDetectorRef) {}

  toggleSubMenu(event: Event) {
    if (this.linkData.subMenuItems) {
      event.preventDefault();
      this.isSubMenuOpen = !this.isSubMenuOpen;
      this.cdr.detectChanges();
    }
  }
}
