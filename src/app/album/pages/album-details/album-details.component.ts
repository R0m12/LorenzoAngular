import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {

  albumId: number | undefined;
  album$: Observable<Album> | undefined;

  constructor(private route: ActivatedRoute, private albumService: AlbumService, private location: Location){
    route.params.subscribe(params => {
      this.albumId = params['id'];
    })

    // this.albumId = +this.route.snapshot.paramMap.get('id') as number;
  }
  ngOnInit(): void {
    if(this.albumId){
      this.album$ = this.albumService.getById(this.albumId);
    }
  }

  goBack(){
    this.location.back();
  }

  showReceivedValue(value: boolean){
    console.log(value);
  }
}
