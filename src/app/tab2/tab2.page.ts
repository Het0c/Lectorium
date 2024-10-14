import { Component } from '@angular/core';
import { ChatgptService } from '../services/chatgpt.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}

}


export class chatBot {
  userPrompt: string = '';
  response: string = '';

  constructor(private chatgptService: ChatgptService) {}

  sendMessage() {
    this.chatgptService.sendMessage(this.userPrompt).subscribe(
      (res: any) => {
        this.response = res.choices[0].message.content;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
