import { Component } from '@angular/core';

import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-stats-g1',
  templateUrl: './stats-g1.component.html',
  styleUrls: ['./stats-g1.component.css']
})
export class StatsG1Component {
  eventCount: number = 0;
  categoryCount: number = 0;

  constructor(private dbService: DatabaseService) { 
    this.dbService.getRecordStatsG1().subscribe({
      next: (stats: any) => {
        this.eventCount = stats.eventCount
        console.log("event counted");
        this.categoryCount= stats.categoryCount
        console.log("Category counted");
      },
      error: (error: any) => {console.log(error)}
    })
  }
}

