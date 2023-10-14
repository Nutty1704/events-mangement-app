import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-display-category',
  templateUrl: './display-category.component.html',
  styleUrls: ['./display-category.component.css']
})
export class DisplayCategoryComponent {
  category: any;

  constructor(private dbService: DatabaseService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.dbService.getCategory(id).subscribe({
        next: (result: any) => {this.category = result},
        error: (error: any) => {this.router.navigate(['/invalid-data'])},
      });
    });
  }
}

