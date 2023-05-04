import { Component, Inject, OnDestroy } from '@angular/core';
import { AlbumService } from './../../services/album.service';
import { Album } from '../../models/album';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface AlbumFormData {
  isCreateForm: boolean;
  album: Album;
}

@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.css']
})
export class AlbumFormComponent implements OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  albumForm = this.fb.group({
    id: [0, [Validators.required]],
    name: ['', [Validators.required]],
    dateOfRelease: ['', [Validators.required]]
  });

    constructor(public dialogRef: MatDialogRef<AlbumFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: AlbumFormData, private fb: FormBuilder, private albumService: AlbumService, private _snackBar: MatSnackBar) {

        if(!data.isCreateForm){
          this.setAlbumForm(data.album);
        }
      }

      ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
      }
    
      setAlbumForm(album: Album) {
        this.albumForm.setValue({
          id: album.id,
          name: album.name,
          dateOfRelease: album.dateOfRelease,
        });
      }
    
      get title(){
        if(this.data.isCreateForm){
          return 'Formulaire de création';
        }
        return 'Formulaire de modification';
      }
    
      get submitBtnName(){
        if(this.data.isCreateForm){
          return 'Ajouter';
        }
        return 'Modifier';
      }

      onSubmit(){
        if(this.albumForm.valid){ 
          if(this.data.isCreateForm){
            this.albumForm.value.id = Date.now() + Math.random();
            this.albumService.create(this.albumForm.value as Album)
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
              this._snackBar.open(result, '', {
                duration: 2000,
                panelClass: ['bg-success']
              });
    
              this.dialogRef.close(true);
            });
          }else{
            this.albumService.update(this.albumForm.value as Album)
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
              this._snackBar.open(result, '', {
                duration: 2000,
                panelClass: ['bg-success']
              });
              this.dialogRef.close(true);
            });
          }
        }
      }
}
