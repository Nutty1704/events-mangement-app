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

  getEvent(id: String) {
    return this.http.get(`/abhijit/api/v1/get-event/${id}`);
  }
  

  deleteEvent(id: number) {
    let body: any = {eventId: id};
    return this.http.delete('/abhijit/api/v1/delete-event', {body: body, headers: httpOptions.headers})
  }


  updateEvent(id: string, name: string, capacity: number) {
    let body: any = {eventId: id, name: name, capacity: capacity};
    return this.http.put('/abhijit/api/v1/update-event', body, httpOptions);
  }

  getRecordStatsG1() {
    console.log("get recorded G1")
    return this.http.get('/33048126/api/v1/get-statsG1');
  }

  getRecordStats() {
    return this.http.get('/abhijit/api/v1/get-stats');
  }


  addCategory(data: any) {
    return this.http.post('/33048126/api/v1/add-category', data, httpOptions);
  }

  getCategories() {
    return this.http.get("/33048126/api/v1/categories");
  }

  deleteCategory(id: string) {
    let body: any = {categoryId: id};
    return this.http.delete("/33048126/api/v1/delete-category", {body: body, headers: httpOptions.headers});
  }

  updateCategory(id: string, name: string, description: string, image:string) {
    let body: any = {categoryId: id, name: name, description: description, image: image };
    return this.http.put('/33048126/api/v1/update-category', body, httpOptions);
  }

  getCategory(id: string) {
    return this.http.get(`/33048126/api/v1/get-category/${id}`);
  }

}
