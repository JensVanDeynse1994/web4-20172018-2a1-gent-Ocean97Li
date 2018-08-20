import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent } from '@angular/material';
import { LoggedInUserService } from '../../../services/logged-in-user.service';
import { LendObject } from '../../../models/lend-object.model';
import { DialogDataServiceService } from '../../../services/dialog-data-service.service';

@Component({
  selector: 'app-info-lend-object',
  templateUrl: './info-lend-object.component.html',
  styleUrls: ['./info-lend-object.component.css']
})
export class InfoLendObjectComponent implements OnInit {
  private _object: LendObject;
  constructor(
    private dataservice: DialogDataServiceService,
    public dialogRef: MatDialogRef<InfoLendObjectComponent>,
    private loggedInUserService: LoggedInUserService
  ) {
  }

  public orderedlist(object) {
    this._object = this.dataservice.data;
    return this._object.waitinglist.sort((a, b) => {
      if (a.fromdate < b.fromdate) {
        return -1;
      }
      if (a.fromdate > b.fromdate) {
        return 1;
      }
      if (a.fromdate < b.fromdate) {
        return 0;
      }
    });
  }


  /**
   * Getter object
   * @return {LendObject}
   */
  public get object(): LendObject {
    return this._object;
  }

  /**
   * Setter object
   * @param {LendObject} value
   */
  public set object(value: LendObject) {
    this._object = value;
  }


  ngOnInit() {
  }

}
