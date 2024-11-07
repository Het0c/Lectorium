import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.page.html',
  styleUrls: ['./book-preview.page.scss'],
})
export class BookPreviewPage implements OnInit {

  book: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['book']) {
        this.book = JSON.parse(params['book']);
      }
    });
  }
}
