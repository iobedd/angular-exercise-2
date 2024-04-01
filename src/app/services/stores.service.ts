import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Store } from '../models/store';

@Injectable({
  providedIn: 'root'
})

export class StoresService {

  private apiUrl = 'https://localhost:44313/api/Stores'

  constructor(private http: HttpClient) {
  }

  getAllStores(): Observable<Store[]>{
    return this.http.get<Store[]>(this.apiUrl);
  }
  
  createStore(store: Store): Observable<Store>{
    return this.http.post<Store>(this.apiUrl, store);
  }

  deleteStore(id?: string): Observable<any> {
    return this.http.delete(this.apiUrl + "/"+ id);
  }

  updateStore(store: Store): Observable<Store>{
    return this.http.put<Store>(this.apiUrl, store);
  }
}
