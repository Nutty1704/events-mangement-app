import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { UpperCasePipe } from '@angular/common';


@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent {
  records: any[] = [];

  constructor(private dbService: DatabaseService) {
    this.getRecords();
  }

  getRecords() {
    this.dbService.getCategories().subscribe({
      next: (data: any) => {
        this.records = data;
      },
      error: (err:any) => { }
    })
  }

}