import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent {
  records: any = [];

  constructor(private dbService: DatabaseService) {
    this.getCategories();
  }

  deleteCategory(id: string) {
    this.dbService.deleteCategory(id).subscribe({
      next: (result: any) => {this.getCategories()},
      error: (err: any) => {}
    })
  }

  getCategories() {
    this.dbService.getCategories().subscribe({
      next: (result: any) => {this.records = result},
      error: (err: any) => {}
    })
  }

}
