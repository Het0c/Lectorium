import { Component } from '@angular/core';
import { NavController } from '@ionic/angular'; 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  // Datos de ejemplo para la sección "Personalized for you"
  personalizedBooks = [
    {
      title: 'The 7 Habits of Highly Effective People',
      author: 'Stephen Covey',
      image: 'assets/images/7_habits.jpg'
    },
    {
      title: 'The Lean Startup',
      author: 'Eric Ries',
      image: 'assets/images/lean_startup.jpg'
    },
    // Agrega más libros si lo deseas
  ];

  // Datos de ejemplo para la sección "Popular in Business & Leadership"
  popularBooks = [
    {
      title: 'The Power of Habit',
      author: 'Charles Duhigg',
      image: 'assets/images/power_of_habit.jpg'
    },
    {
      title: 'The Lean Startup',
      author: 'Eric Ries',
      image: 'assets/images/lean_startup.jpg'
    },
    // Agrega más libros si lo deseas
  ];
  
  constructor(private navCtrl: NavController) {}
  goToCategoria() {
    this.navCtrl.navigateForward('/categoria');
  }
}
