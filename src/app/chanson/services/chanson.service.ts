import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chanson } from '../models/chanson';

@Injectable({
  providedIn: 'root'
})
export class ChansonService {

  constructor(private http: HttpClient) { }

  get(): Observable<Chanson[]> {
    return this.http.get<Chanson[]>(environment.albumApiBaseUrl+"/chanson");
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(environment.albumApiBaseUrl+"/chanson/"+id);
  }

  update(chanson: Chanson): Observable<string>{
    return this.http.put<string>(environment.albumApiBaseUrl+"/chanson/"+chanson.id, chanson);
  }

  create(chanson: Chanson): Observable<string>{
    return this.http.post<string>(environment.albumApiBaseUrl+"/chanson", chanson);
  }

  getById(id: number): Observable<Chanson>{
    return this.http.get<Chanson>(environment.albumApiBaseUrl+"/chanson/"+id);
  }
}
