import { Component, OnInit } from '@angular/core';
import { FavoritosService } from '../services/favoritos.service'; 

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  favoritos: any[] = []; 

  constructor(private favoritosService: FavoritosService) {}

  ngOnInit() {
    this.cargarFavoritos();
  }

  cargarFavoritos() {
    this.favoritosService.getFavoritos().subscribe((data: any) => {
      this.favoritos = data;
    });
  }
}
