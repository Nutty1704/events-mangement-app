import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {

  name: string = "";
  description: string = "";
  image: string = "";
  startDateTime: Date = new Date();
  duration: number = 100;
  isActive: string = '';
  capacity: number = 0;
  ticketsAvailable: number = 0;
  categoryIds: string = "";
  message: string = "";

  constructor(private dbService: DatabaseService, private router: Router) {}

  // TODO: not allowing submit if name, startDateTime, duration, or categoryIds are empty
  addEvent() {
    if (!this.#check_required()) {
      this.message = "Please fill out all required fields: Name, Start Date & Time, Duration, and Category IDs";
    } else {
      let data = {
        name: this.name,
        description: this.description === "" ? undefined : this.description,
        image: this.image === "" ? undefined : this.image,
        startDateTime: new Date(this.startDateTime),
        duration: this.duration,
        isActive: this.isActive !== "",
        capacity: this.capacity,
        ticketsAvailable: this.ticketsAvailable === 0 ? undefined : this.ticketsAvailable,
        categories: this.categoryIds
      };

      this.dbService.addEvent(data).subscribe({
        next: (result: any) => {this.router.navigate(['/list-events'])},
        error: (err: any) => {this.router.navigate(['/invalid-data'])}
      });
    }
  }

  #check_required() {
    if (this.name == "" || this.startDateTime == null || this.duration == 0 || this.categoryIds == "") {
      return false;
    }
    return true;
  }

}
