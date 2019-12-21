import { Component, OnInit, ViewChild, ElementRef,AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { Validators, FormControl } from '@angular/forms';
import { Chat } from 'src/app/models/chat.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit,AfterViewChecked {

  @ViewChild('chatss', {static: false}) chatss: ElementRef
  user: any;
  chats: any[] = [];
  messageControl: any;
  info: any =  {}
  constructor(
    private router: Router,
    private chatService: ChatService
  ) {
    let user = JSON.parse(sessionStorage.getItem('user'))
    if(user){
      this.user = user;
    }else{
      this.router.navigate([''])
    }

    this.messageControl = new FormControl('', [
      Validators.required,
    ]);
   }

  ngOnInit() {
    console.log(this.user)
    this.getChats()
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 

scrollToBottom(){
try {
  this.chatss.nativeElement.scrollTop = this.chatss.nativeElement.scrollHeight

} catch (error) {
  
}
}
  getChats() {
    this.chatService.getmessages('yuMDbOhNgfDuZ5oB7V5R').subscribe((chatsnapshot) => {
      let data: any  =  chatsnapshot.payload.data();
      this.info = chatsnapshot.payload.data();
      let chats = []
        data.messages.map((element, indx) => {
          chats.push({
            id: element.id,
            message: element.message,
            owner: element.owner
          })
          console.log(this.chats)
        });
      this.chats = chats
    })
  }

  setChat(){
    console.log(this.user.uid)
    this.chats.push({
      id: this.chats.length,
      message: this.messageControl.value,
      owner: this.user.uid
    })

    let info : Chat = {
      messages: this.chats,
      owner: this.user.uid
    }
    this.info.messages = this.chats;
    console.log('here: ', info)
    console.log(this.info)
    this.chatService.setChat('yuMDbOhNgfDuZ5oB7V5R',info)
  }
}
