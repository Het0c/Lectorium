import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {
  books: any[] = [];
  errorMessage: string = ''; // Asignando un valor predeterminado

  constructor(private bookService: BookService) { }

  ngOnInit(): void { }

  searchBooks(query: string): void {
    this.bookService.searchBooks(query).subscribe(
      data => this.books = data.items,
      error => this.errorMessage = error
    );
  }
}