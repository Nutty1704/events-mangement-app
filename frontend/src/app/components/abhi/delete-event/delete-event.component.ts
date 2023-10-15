import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent {

  events: any[] = [];

  constructor(private dbService: DatabaseService) {
    this.getEvents();
  }

  deleteEvent(id: number) {
    this.dbService.deleteEvent(id).subscribe({
      next: (result: any) => {this.getEvents()},
      error: (error: any) => {console.log(error)}
    });
  }

  getEvents() {
    this.dbService.getEvents().subscribe({
      next: (result: any) => {this.events = result},
      error: (error: any) => {console.log(error)}
    });
  }
}
