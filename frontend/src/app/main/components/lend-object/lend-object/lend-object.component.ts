import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../models/user.model';
import { LendObject } from '../../../models/lend-object.model';
import { MatDialog } from '@angular/material';
import { InfoLendObjectComponent } from '../info-lend-object/info-lend-object.component';
import { DialogDataServiceService } from '../../../services/dialog-data-service.service';


@Component({
  selector: 'app-lend-object',
  templateUrl: './lend-object.component.html',
  styleUrls: ['./lend-object.component.css']
})
export class LendObjectComponent implements OnInit {
  @Input() public information: boolean;
  @Input() public selected: boolean;
  @Input() public selectable: boolean;
  public _obj: LendObject;
  @Output() private sendObject: EventEmitter<LendObject>;

  constructor(
    private dialodata: DialogDataServiceService,
    public dialog: MatDialog) {
    this.sendObject = this.sendObject = new EventEmitter();
  }
  @Input() set lendObject(obj: LendObject) {
    this._obj = obj;
  }
  ngOnInit() {
  }

  get name() {
    return this._obj.name;
  }

  public select(): void {
    // when viewing information
    if (this.information) {
      this.openDialog();
    } else {
      // when deleting
      if (this.selectable) {
        this.sendObject.emit(this._obj);
      }
    }
  }


  public deselect(): void {
    this.selected = false;
  }

  get description() {
    return this._obj.description;
  }

  get owner() {
    return this._obj.owner;
  }

  get type(): string {
    return this._obj.type;
  }

  get isAvailable(): boolean {
    return this._obj.isAvailable();
  }

  get isTempAvailable(): boolean {
    return this._obj.isTempAvailable();
  }

  get isUsed(): boolean {
    return this._obj.isUsed();
  }

  get isHeavilyUsed(): boolean {
    return this._obj.isHeavilyUsed();
  }

  get isVeryHeavilyUsed(): boolean {
    return this._obj.isVeryHeavilyUsed();
  }

  get waiting(): number {
    return this._obj.waiting;
  }

  get expired(): boolean {
    return this._obj.expired;
  }

  private openDialog(): void {
    if (this.information) {
    this.dialodata.data = this._obj;
    const dialogRef = this.dialog.open(InfoLendObjectComponent, {
      width: '480px',
      data: {
        object: this._obj
      }
    });
  }
}


}
