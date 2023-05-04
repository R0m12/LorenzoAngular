import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Album } from '../../models/album';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.css']
})
export class AlbumCardComponent implements OnInit {

  @Input() selectedAlbum!: Album;
  @Output() received: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    if(this.selectedAlbum){
      this.received.emit(true);
    }
  }
}
