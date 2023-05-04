import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Chanson } from '../../models/chanson';
import { ChansonService } from '../../services/chanson.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GenericPopupComponent } from 'src/app/shared/components/generic-popup/generic-popup.component';
import { ChansonFormComponent } from '../../components/chanson-form/chanson-form.component';

@Component({
  selector: 'app-chanson-list',
  templateUrl: './chanson-list.component.html',
  styleUrls: ['./chanson-list.component.css']
})
export class ChansonListComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  chanson$!: Observable<Chanson[]>;
  displayedColumns: string[] = ['name', 'featuring', 'album_id', 'update', 'delete'];

  constructor(private chansonService: ChansonService, private dialog: MatDialog, private _snackBar: MatSnackBar, private router: Router){}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
 
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.chanson$ = this.chansonService.get();
  }

  openChansonForm(chanson?: Chanson) {
    const dialogRef = this.dialog.open(ChansonFormComponent, {
      height: '85%',
      width: '60%',
      data: {
        isCreateForm: chanson ? false : true,
        chanson: chanson ? chanson : undefined
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
        message: 'Etes-vous sûr de vouloir supprimer cette chanson ?',
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
          this.chansonService.delete(id)
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

  showChansonDetails(id: number){
    this.router.navigate(['/chanson/'+id])
  }

}
