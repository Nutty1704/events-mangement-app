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
      // TODO: redirect to error page
      error: (error: any) => {console.log(error)}
    });
  }

  // TODO: modify this function to align with the events
  processCategoryIDs(event: any) {
    return event.categoryIds;
  }

  getDurationString(event: any) {
    let duration: number = event.duration;

    let hours: number = Math.floor(duration / 60);
    let minutes: number = duration % 60;

    if (hours > 0) {
      return `${hours} hours ${minutes} minutes`;
    } else {
      return `${minutes} minutes`;
    }
  }

}
