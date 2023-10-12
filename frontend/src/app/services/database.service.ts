import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
}

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  constructor(private http: HttpClient) { }

  addEvent(data: any) {
    return this.http.post('/abhijit/api/v1/add-event', data, httpOptions);
  }

  getEvents() {
    return this.http.get('/abhijit/api/v1/events');
  }

  // TODO
  getEvent(id: String) {
    let events: any[] = [];
    this.getEvents().subscribe({
      next: (result: any) => {events = result},
      error: (error: any) => {console.log(error)}
    });

    let event: any = events.find((event) => event.id == id);
    return event;
  }
  

  deleteEvent(id: number) {
    let body: any = {eventId: id};
    return this.http.delete('/abhijit/api/v1/delete-event', {body: body, headers: httpOptions.headers})
  }


  updateEvent(id: string, name: string, capacity: number) {
    let body: any = {eventId: id, name: name, capacity: capacity};
    return this.http.put('/abhijit/api/v1/update-event', body, httpOptions);
  }

  // TODO: implement this
  getEventCount() {
    return 10;
  }

  // TODO: implement this
  getCategoryCount() {
    return 10;
  }

  getRecordStats() {
    return this.http.get('/abhijit/api/v1/get-stats');
  }

}
