import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DataTablesModule } from 'angular-datatables'; // Import DataTablesModule
import { DataTablesResponse } from '../../../data-tables-response.model';
@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    SidebarComponent,
    BreadcrumbComponent,
    CommonModule,
    FormsModule,
    RouterLink,
    DataTablesModule,
  ],
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PlaylistComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  isEditModal: boolean = false;
  playlists: any[] = [];
  playlistId!: number;

  selectedPlaylists: any = {};

  //filter logic here
  isFilterOpen: boolean = false;
  searchTerm: string = '';
  appliedFilters = { status: 'ALL', fromDate: '', toDate: '' };

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  applyFilter(filter: any) {
    this.appliedFilters = filter;
  }

  filteredplaylists() {
    return this.playlists.filter((playlist) => {
      if (this.searchTerm) {
        return playlist.playlist_name
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      }
      return true;
    });
  }

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (
        dataTablesParameters: any,
        callback: (response: DataTablesResponse) => void
      ) => {
        this.apiService.getPlaylist(dataTablesParameters).subscribe(
          (res: DataTablesResponse) => {
            this.playlists = res.data;
            callback({
              draw: dataTablesParameters.draw,
              recordsTotal: res.recordsTotal,
              recordsFiltered: res.recordsFiltered,
              data: res.data,
            });
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
      },
      columns: [
        { title: 'Playlist Name', data: 'playlist_name' },
        { title: 'Duration', data: 'playlist_duration' },
        { title: 'Description', data: 'playlist_desc' },
        { title: 'Tags', data: 'playlist_tag' },
        { title: 'Status', data: 'playlist_status' },
        {
          title: 'Action',
          data: null,
          defaultContent: '',
          orderable: false,
          render: (data: any, type: any, row: any) => {
            return `
              <button class="btn-edit" data-id="${row.playlist_id}">
                <img src="../../../assets/icons/edit.svg" class="w-5 h-5" alt="Edit">
              </button>
            `;
          },
        },
      ],
    };

    this.dtTrigger.next(null);
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
    $('#playlistTable').on('click', '.btn-edit', (event) => {
      const id = $(event.currentTarget).data('id');
      this.getPlaylistByIdHandler(id);
    });
  }
  async getPlaylistByIdHandler(id: number): Promise<void> {
    try {
      const playlist = await this.apiService.getPlaylistById(id);
      if (playlist) {
        this.selectedPlaylists = playlist.data;
        this.isEditModal = true;
      }
    } catch (error) {
      console.error('Error fetching network:', error);
    }
    console.warn('@@ NEW DATA API', this.selectedPlaylists);
  }

  closeEditModal(): void {
    this.isEditModal = false;
    this.selectedPlaylists = {};
  }

  async updatePlayListHandler(): Promise<void> {
    try {
      const res = await this.apiService.updatePlaylist(
        this.selectedPlaylists,
        this.selectedPlaylists.playlist_id
      );
      console.warn('After Update', res);
      if (res?.status === 200) {
        alert('Update Success');
        this.router.navigate(['/setup/playlist']).then(() => {
          window.location.reload();
        });
        console.log('Updated successfully');
        this.closeEditModal();
      } else {
        console.error('Failed to update network');
      }
    } catch (error) {
      console.error('Error updating network:', error);
    }
  }

  async deleteNetworkHandler(id: number): Promise<void> {
    try {
      const res = await this.apiService.deletePlaylist(id);
      console.error('## delete', res);
      if (res.status === 200) {
        alert('Delete Success');
        this.closeEditModal();
        this.router.navigate(['/setup/playlist']).then(() => {
          window.location.reload();
        });
      } else {
        console.error('Failed to delete network');
      }
    } catch (error) {
      console.error('Error deleting network:', error);
    }
  }

  rerender(): void {
    this.dtElement?.dtInstance.then((dtInstance: { destroy: () => void }) => {
      dtInstance.destroy();

      this.dtTrigger.next(null);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
