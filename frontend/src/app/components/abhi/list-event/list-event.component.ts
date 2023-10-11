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
      // TODO: redirect to error page
      error: (error: any) => {console.log(error)}
    });
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

  // TODO: modify this function to align with the events
  processCategoryIDs(event: any) {
    return event.categoryIds;
  }

}
