import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  get(): Observable<Album[]> {
    return this.http.get<Album[]>(environment.albumApiBaseUrl+"/album");
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(environment.albumApiBaseUrl+"/album/"+id);
  }

  update(album: Album): Observable<string>{
    return this.http.put<string>(environment.albumApiBaseUrl+"/album/"+album.id, album);
  }

  create(album: Album): Observable<string>{
    return this.http.post<string>(environment.albumApiBaseUrl+"/album", album);
  }

  getById(id: number): Observable<Album>{
    return this.http.get<Album>(environment.albumApiBaseUrl+"/album/"+id);
  }
}
