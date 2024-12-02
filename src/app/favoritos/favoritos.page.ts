import { Component, OnInit } from '@angular/core';
import { FavoritosService } from '../favoritos.service'; //Revisar la ruta de importación :(

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  libros = [
    { id: 1, titulo: 'Libro 1' },
    { id: 2, titulo: 'Libro 2' },
    { id: 3, titulo: 'Libro 3' },
  ];
  favoritos: number[] = [];
  usuarioId = 1; // Este ID debe obtenerse de la sesión del usuario ;)

  constructor(private favoritosService: FavoritosService) {}

  ngOnInit() {
    this.cargarFavoritos();
  }

  cargarFavoritos() {
    this.favoritosService.obtenerFavoritos(this.usuarioId).subscribe((data: any[]) => {
      this.favoritos = data.map(fav => fav.id);
    });
  }

  toggleFavorito(libroId: number) {
    if (this.favoritos.includes(libroId)) {
      this.favoritosService.desmarcarFavorito(this.usuarioId, libroId).subscribe(() => {
        this.favoritos = this.favoritos.filter(id => id !== libroId);
      });
    } else {
      this.favoritosService.marcarFavorito(this.usuarioId, libroId).subscribe(() => {
        this.favoritos.push(libroId);
      });
    }
  }

  esFavorito(libroId: number): boolean {
    return this.favoritos.includes(libroId);
  }
}
