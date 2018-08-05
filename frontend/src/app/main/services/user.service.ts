import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { LendObject, ShareType } from '../models/lend-object.model';
import { Request } from '../models/request.model';
import { BehaviorSubject } from '../../../../node_modules/rxjs/BehaviorSubject';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Observable } from '../../../../node_modules/rxjs/Observable';
import { map } from '../../../../node_modules/rxjs/operators';

@Injectable()
export class UserService {

  private _users: User[];
  private _objects: LendObject[];
  private _requests: Request[];
  private _users$ = new Observable<User[]>();
  private readonly _appUrl = '/API/users';
  constructor(private http: HttpClient) {
    this._users = [
      new User('temp', 'Hu Ocean', 'Li', 'Nonnemeerstraat 19-24', {lat: 51.043526, lng: 3.713618}),
      new User('temp', 'Angela', 'Merkel', 'ReichsStrasse 19-24', {lat: 51.03526, lng: 3.73618}),
      new User('temp', 'Francois', 'Hollande', 'oooH de Champ de lise 19-24',  {lat: 51.04326, lng: 3.71618}),
      new User('temp', 'Ragnar', 'LothBrok', 'Plunderstreet 4', {lat: 59.334591, lng: 18.063240}),
      new User('temp', 'Gimli', 'Son of Gloin', 'MiddleEarthstreet 4', {lat: -36.848461, lng: 174.763336}),
      new User('temp', 'Mark', 'Rutte', '4 Wetstraat',  {lat: 52.314224, lng: 4.941841}),
      new User('temp', 'Barack', 'Obama', 'CIA bunker BD911',  {lat: 39.063 , lng: -77.889}),
      new User('temp', 'Donald', 'Trump', 'CIA bunker BD911', {lat: 39.064, lng: -77.8}),
    ];
    this._objects = [
      new LendObject('Hammer' , 'A brand new spankin hammer', ShareType.Tool, this._users[1], this._users[2]),
      new LendObject('Sikkel' , 'A brand new sikkel', ShareType.Tool, this._users[1], this._users[2]),
      new LendObject('car' , 'A brand new spankin car', ShareType.Tool, this._users[1], this._users[2]),
      new LendObject('brush' , 'A brand new spankin brush', ShareType.Tool, this._users[1], this._users[2]),

      new LendObject('car' , 'BMW burgoise', ShareType.Transport, this._users[5], this._users[2]),
      new LendObject('car' , 'ferari', ShareType.Transport, this._users[5], this._users[2]),
      new LendObject('car' , 'Porsche', ShareType.Transport, this._users[1], undefined),
      new LendObject('car' , 'VW', ShareType.Transport, this._users[1], this._users[5]),

      new LendObject('dog walks' , '5km walk with your dog', ShareType.Service, this._users[0], this._users[2]),
      new LendObject('dog walks' , '5km walk with your dog', ShareType.Service, this._users[0], undefined),
      new LendObject('car wash' , '1hour wash of your car', ShareType.Service, this._users[2], this._users[0]),
      new LendObject('archery practice' , 'try to get shot', ShareType.Service, this._users[1], this._users[0])
    ];
    this._objects[1].addUser(this._users[1]);
    this._objects[1].addUser(this._users[2]);
    this._objects[1].addUser(this._users[3]);
    this._objects[1].addUser(this._users[4]);
    this._objects[1].addUser(this._users[5]);

    this._objects[2].addUser(this._users[1]);
    this._objects[2].addUser(this._users[2]);
    this._objects[2].addUser(this._users[3]);

    this._objects[3].addUser(this._users[1]);
    this._objects[3].addUser(this._users[2]);
    this._objects[3].addUser(this._users[3]);
    this._objects[3].addUser(this._users[4]);
    this._objects[3].addUser(this._users[5]);
    this._objects[3].addUser(this._users[1]);
    this._objects[3].addUser(this._users[2]);
    this._objects[3].addUser(this._users[3]);
    this._objects[3].addUser(this._users[4]);
    this._objects[3].addUser(this._users[5]);

    this._objects[8].addUser(this._users[5]);

  this._requests = [
    new Request(this._users[0], this._users[1], this._objects[0]),
    new Request(this._users[0], this._users[1], this._objects[1]),
    new Request(this._users[1], this._users[0], this._objects[3]),
    new Request(this._users[1], this._users[0], this._objects[4]),
    new Request(this._users[1], this._users[0], this._objects[5]),
  ];

  // get actual users
  this._users$ = this.http
    .get(this._appUrl)
    .pipe(
      map((list: any[]): User[] => list.map(user => User.fromJSON(user, true)))
    );
  }

  get users(): Observable<User[]> {
    return this._users$;
  }



  getUserByName(firstname: string, lastname?: string): User {
    return this._users.find(user => lastname ?
        user.firstname.toLowerCase === firstname.toLowerCase && user.lastname.toLowerCase === lastname.toLowerCase
        : user.firstname.toLowerCase === firstname.toLowerCase);
  }

  addNewUser(user: User) {
    this._users = [...this._users, user];
  }

  addObjectToUser(object: LendObject, currentuser: User) {
    this._users.find(user => user.id === currentuser.id).lending.push(object);
  }

  removeObject(user: User, object: LendObject) {
    const userIndex = this._users.findIndex(u => u.id === user.id);
    // geen idee hoe;
  }

}
