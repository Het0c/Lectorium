import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../models/book.model';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPage implements OnInit {
  searchResults: any[] = []; 
  searchQuery: any;
  openLibraryService: any;
  navCtrl: any;

  constructor(private route: ActivatedRoute) {} 

  ngOnInit() {
    
}}