import { Injectable } from '@angular/core';
import { LendObject } from '../models/lend-object.model';

@Injectable()
export class DialogDataServiceService {
  public data: LendObject;
  constructor() { }
}
