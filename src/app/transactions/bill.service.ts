import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private httpClient: HttpClient) { }
  // backend server instance
  apiServer = 'http://localhost:4000';

  processPayment(user_id,bill, state, disco, meter, amount, email, ref) {
    const billData = {
      user_id ,bill, state, disco, meter, amount, email, ref
    };
    return this.httpClient.post(`${this.apiServer}/transaction/transactions`, billData);
  }
}
