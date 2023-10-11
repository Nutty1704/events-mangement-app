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
    this.eventCount = this.dbService.getEventCount();
    this.categoryCount = this.dbService.getCategoryCount();
    this.addCount = this.dbService.getAddCount();
    this.deleteCount = this.dbService.getDeleteCount();
    this.updateCount = this.dbService.getUpdateCount();
  }

}
