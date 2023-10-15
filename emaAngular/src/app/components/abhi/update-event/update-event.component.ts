import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent {

  name: string = "";
  capacity: number = 0;
  eventId: string = "";
  message = "";
  events: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) {
    dbService.getEvents().subscribe({
      next: (result: any) => {this.events = result},
      error: (error: any) => {console.log(error)}
    })
  }

  updateEvent() {
    if (this.eventId !== "") {
      this.dbService.updateEvent(this.eventId, this.name, this.capacity).subscribe({
        next: (result: any) => {this.router.navigate(['/list-events'])},
        error: (error: any) => {this.router.navigate(['/invalid-data'])}
      });
    } else {
      this.message = "Please select an event to update.";
    }
  }

  selectEvent(id: string, name: string, capacity: number) {
    this.eventId = id;
    this.name = name;
    this.capacity = capacity;
    this.message = "Selected Event: " + id;
  }

}
