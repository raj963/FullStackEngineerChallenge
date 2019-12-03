import { Injectable } from '@angular/core';

import { IEmployee } from '../shared/interfaces';

@Injectable()
export class TrackByService {
  
  customer(index: number, customer: IEmployee) {
    return customer._id;
  }
  
}