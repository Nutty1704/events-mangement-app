import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent {
  events: any[] = [];

  constructor(private dbService: DatabaseService) { 
    this.dbService.getEvents().subscribe({
      next: (result: any) => {this.events = result},
      error: (error: any) => {console.log(error)}
    });
  }

}
