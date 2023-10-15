import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {

  name: string = "";
  description: string="";
  image:string="";
  categoryId: string = "";
  categories: any[] = [];
  message: string = "";

  constructor(private dbService: DatabaseService, private router: Router) {
    dbService.getCategories().subscribe({
      next: (result: any) => {this.categories = result},
      error: (err: any) => { }
    })
  }

  updateCategory() {
    if (this.categoryId !== "") {
      this.dbService.updateCategory(this.categoryId, this.name, this.description, this.image).subscribe({
        next: (result: any) => {this.router.navigate(['/list-categories'])},
        error: (err: any) => {this.router.navigate(['invalid-data'])}
      });
    } else {
      this.message = "Please select a category to update.";
    }
  }

  selectCategory(id: string) {
    this.categoryId = id;

    for (let c of this.categories) {
      if (c.id == id) {
        this.name = c.name;
        this.description = c.description;
        this.image = c.image;
        break;
      }
    }
    
    this.message = "Selected Category: " + this.categoryId;
  }
}