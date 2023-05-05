import { Component, Inject, OnDestroy } from '@angular/core';
import { ChansonService } from './../../services/chanson.service';
import { AlbumService } from '../../../album/services/album.service';
import { Chanson } from '../../models/chanson';
import { Album } from '../../../album/models/album';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import mongoose from 'mongoose';

export interface ChansonFormData {
  isCreateForm: boolean;
  chanson: Chanson;
}

@Component({
  selector: 'app-chanson-form',
  templateUrl: './chanson-form.component.html',
  styleUrls: ['./chanson-form.component.css']
})
export class ChansonFormComponent implements OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  chansonForm = this.fb.group({
    id: [0, [Validators.required]],
    name: ['', [Validators.required]],
    featuring: [''],
    album_id: [0, [Validators.required]],
  });

  albums: Album[] = [];

    constructor(public dialogRef: MatDialogRef<ChansonFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ChansonFormData, private fb: FormBuilder, private chansonService: ChansonService, private albumService: AlbumService, private _snackBar: MatSnackBar) {

        console.log(data.chanson);

        if(!data.isCreateForm){
          this.setChansonForm(data.chanson);
        }

        this.albumService.get().subscribe(albums => {
          this.albums = albums;
        });
      }

      ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
      }
    
      setChansonForm(chanson: Chanson) {
        this.chansonForm.setValue({
          id: chanson.id,
          name: chanson.name,
          featuring: chanson.featuring,
          album_id: chanson.album_id
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
        if(this.chansonForm.valid){ 
          if(this.data.isCreateForm){
            this.chansonForm.value.id = Math.floor(Math.random() * 100 + Math.random() * 100) ;
            this.chansonService.create({...this.chansonForm.value} as unknown as Chanson)
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
              this._snackBar.open(result, '', {
                duration: 2000,
                panelClass: ['bg-success']
              });
    
              this.dialogRef.close(true);
            });
          }else{
            this.chansonService.update({...this.chansonForm.value} as unknown as Chanson)
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
