import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Chat } from '../models/chat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private af: AngularFirestore
  ) { }


  public  getmessages(id){
    return  this.af.collection('chats').doc(id).snapshotChanges();
  }

  public  setChat(id, data:Chat) {
    console.log('info_ ',data)
    return  this.af.collection('chats').doc(id).set(data).then(
      e => console.log(e)
    )
  }
}
