import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: any[] = [];
  errorMessage: string = ''; // Asignando un valor predeterminado

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.searchBooks('bestsellers').subscribe(
      data => this.books = data.items,
      error => this.errorMessage = error
    );
  }
}
