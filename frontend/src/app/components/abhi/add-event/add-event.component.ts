import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {

  name: String = "";
  description: String = "";
  image: String = "";
  startDateTime: Date = new Date();
  duration: number = 1000;
  isActive: String = '';
  capacity: number = 0;
  ticketsAvailable: number = 0;
  categoryIds: String[] = [];

  constructor(private dbService: DatabaseService, private router: Router) {}

  // TODO: not allowing submit if name, startDateTime, duration, or categoryIds are empty
  addEvent() {
    let data = {
      name: this.name,
      description: this.description === "" ? undefined : this.description,
      image: this.image === "" ? undefined : this.image,
      startDateTime: this.startDateTime,
      duration: this.duration,
      isActive: this.isActive !== "",
      capacity: this.capacity,
      ticketsAvailable: this.ticketsAvailable === 0 ? undefined : this.ticketsAvailable,
      categories: this.categoryIds
    }

    // TODO
    // this.dbService.addEvent(data).subscribe((data: any) => {
    //   console.log(data);
    // });

    this.dbService.addEvent(data).subscribe({
      next: (result: any) => {this.router.navigate(['/list-events'])},
      error: (err: any) => {console.log(err)}
    })
  }

}
