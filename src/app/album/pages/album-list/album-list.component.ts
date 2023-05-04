import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Album } from '../../models/album';
import { AlbumService } from '../../services/album.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GenericPopupComponent } from 'src/app/shared/components/generic-popup/generic-popup.component';
import { AlbumFormComponent } from '../../components/album-form/album-form.component';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  album$!: Observable<Album[]>;
  displayedColumns: string[] = ['name', 'dateOfRelease', 'update', 'delete'];

  constructor(private albumService: AlbumService, private dialog: MatDialog, private _snackBar: MatSnackBar, private router: Router){}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
 
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.album$ = this.albumService.get();
  }

  openAlbumForm(album?: Album) {
    const dialogRef = this.dialog.open(AlbumFormComponent, {
      height: '85%',
      width: '60%',
      data: {
        isCreateForm: album ? false : true,
        album: album ? album : undefined
      }
    });
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.fetchData();
        }
      });
  }

  delete(id: number) {
    const ref = this.dialog.open(GenericPopupComponent, {
      data: {
        title: 'Confirmation de suppression',
        message: 'Etes-vous sûr de vouloir supprimer cet album ?',
        typeMessage: 'none',
        yesButtonVisible: true,
        noButtonVisible: true,
        cancelButtonVisible: false,
        defaultButton: 'No',
        yesButtonLabel: 'Oui',
        noButtonLabel: 'Non',
      },
    })

    ref.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.albumService.delete(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
              this._snackBar.open(result, '', {
                duration: 2000,
                panelClass: ['bg-success']
              });
              this.fetchData();
            });
        }
      });
  }

  showAlbumDetails(id: number){
    this.router.navigate(['/album/'+id])
  }

}
