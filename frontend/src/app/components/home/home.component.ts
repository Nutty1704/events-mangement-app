import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  eventCount: number = 0;
  categoryCount: number = 0;
  addCount: number = 0;
  deleteCount: number = 0;
  updateCount: number = 0;

  constructor(private dbService: DatabaseService) { 
    this.eventCount = this.dbService.getCategoryCount();
    this.categoryCount = this.dbService.getCategoryCount();

    this.dbService.getRecordStats().subscribe({
      next: (stats: any) => {
        this.addCount = stats.recordsCreated
        this.deleteCount = stats.recordsDeleted
        this.updateCount = stats.recordsUpdated
      },
      error: (error: any) => {console.log(error)}
    })
  }

}
