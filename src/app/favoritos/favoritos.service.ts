import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  // URL de tu API (Asegúrate de que sea la correcta)
  private apiUrl = 'https://mi-backend.com/api'; 

  constructor(private http: HttpClient) {}

  // Obtener los libros favoritos de un usuario
  obtenerFavoritos(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/favoritos/${usuarioId}`);
  }

  // Marcar un libro como favorito
  marcarFavorito(usuarioId: number, libroId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/favoritos`, { usuarioId, libroId });
  }

  // Desmarcar un libro como favorito
  desmarcarFavorito(usuarioId: number, libroId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/favoritos/${usuarioId}/${libroId}`);
  }
}
