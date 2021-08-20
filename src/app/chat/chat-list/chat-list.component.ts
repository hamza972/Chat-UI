import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { MChatRoom, MUser } from '../models';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  @Input() users: MUser[] = []
  @Input() chatRoomsList: MChatRoom[] = []
  @Output() setSelectedUser: EventEmitter<any> = new EventEmitter<any>();

  model: any = {};
  constructor() { }

  ngOnInit() {
    
  }

  search: OperatorFunction<string, readonly MUser[]> = (text$: Observable<string>) =>{
    const res = text$.pipe(
      map(term => term.length < 1 ? []
        : this.users.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
    console.log(this.setSelectedUser);
    return res
  }
  
  formatter(x: MUser){
    // console.log(this.setSelectedUser);
    // this.setSelectedUser.emit(x);
    return x.name
  };

  onChange(){
    if(this.model && this.model.id){
      this.setSelectedUser.emit(this.model)
      this.model =  null
    }
  }

}
