import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  // Método para obtener los favoritos
  getFavoritos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/favoritos`);
  }

  // Método para agregar un libro a favoritos
  addFavorito(libro: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/favoritos`, libro);
  }

  // Método para eliminar un favorito
  removeFavorito(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/favoritos/${id}`);
  }
}
