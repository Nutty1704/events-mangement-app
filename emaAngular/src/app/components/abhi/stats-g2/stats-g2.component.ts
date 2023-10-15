import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-stats-g2',
  templateUrl: './stats-g2.component.html',
  styleUrls: ['./stats-g2.component.css']
})
export class StatsG2Component {
  addCount: number = 0;
  deleteCount: number = 0;
  updateCount: number = 0;

  constructor(private dbService: DatabaseService) { 
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
