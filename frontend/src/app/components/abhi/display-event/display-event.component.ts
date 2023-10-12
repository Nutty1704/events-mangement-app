import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-display-event',
  templateUrl: './display-event.component.html',
  styleUrls: ['./display-event.component.css']
})
export class DisplayEventComponent {

  event: any;

  constructor(private dbService: DatabaseService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.dbService.getEvent(id).subscribe({
        next: (result: any) => {this.event = result; console.log(result);},
        error: (error: any) => {this.router.navigate(['/invalid-data'])},
      });
    });
  }
}
