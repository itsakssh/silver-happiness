import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-add-playlist',
  standalone: true,
  imports: [CommonModule, FormsModule, BreadcrumbComponent, RouterLink],
  templateUrl: './add-playlist.component.html',
  styleUrls: ['./add-playlist.component.scss'],
})
export class AddPlaylistComponent {
  playlistName: string = '';
  duration: number = 100;
  tags: string = '';
  description: string = '';
  status: boolean = false;

  //   {
  //     "playlist_name": "Chill Vibes",
  //     "playlist_duration": 120,
  //     "playlist_tag": "Relax, Chill",
  //     "playlist_desc": "A playlist for relaxing and unwinding after a long day.",
  //     "playlist_status": "active"
  // }

  constructor(private router: Router, private apiService: ApiService) {}

  async onSubmit() {
    const data = {
      playlist_name: this.playlistName,
      playlist_duration: this.duration,
      playlist_tag: this.tags,
      playlist_desc: this.description,
      playlist_status: this.status ? 'Active' : 'Inactive',
    };

    const res: any = await this.apiService.addPlaylist(data);
    console.log(res);
    if (res && res.status==200) {
      this.router.navigate(['/setup/playlist']);
    }
  }
}
