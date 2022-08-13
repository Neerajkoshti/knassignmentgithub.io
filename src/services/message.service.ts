import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
const API_URL = `http://localhost:3000/message`;
@Injectable()
export class MessageService {
  constructor(private http: HttpClient) {}
  public getAll() {
    return this.http
      .get(`${API_URL}?_sort=id&_order=desc`)
      .pipe(map((response) => response));
  }
  public create(document: {}) {
    return this.http.post(API_URL, document).pipe(map((response) => response));
  }
  public sendOtp(doc: {}) {
    return this.http
      .post(`http://localhost:8000/send-otp`, { doc: doc })
      .pipe(map((response) => response));
  }
}
