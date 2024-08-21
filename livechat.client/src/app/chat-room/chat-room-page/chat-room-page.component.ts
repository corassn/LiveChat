import { Component, inject, OnDestroy, OnInit, output, signal } from '@angular/core';
import { SEND_IMAGE_TEXT, CHAT_INPUT_PLACEHOLDER, BASE64_IMAGE } from '../_constants/chat.constants';
import { CoreFacade } from '../../core/core.facade';
import { ChatHubService } from '../../shared/_services/chat-hub.service';

@Component({
  selector: 'chat-room-page',
  templateUrl: './chat-room-page.component.html',
  styleUrl: './chat-room-page.component.scss'
})
export class ChatRoomPageComponent implements OnInit, OnDestroy {
  message: string = '';
  sendImageText = SEND_IMAGE_TEXT;
  inputPlaceholder = CHAT_INPUT_PLACEHOLDER;
  currentUser: string = '';

  coreFacade = inject(CoreFacade);
  chatHubService = inject(ChatHubService)

  ngOnInit(): void {
    this.coreFacade.currentUser$.subscribe((user) => {
      if (user) {
        this.currentUser = user;
        this.chatHubService.registerOnServerEvents();
        this.chatHubService.startSession();
      }
    })
  }

  ngOnDestroy(): void {
    this.chatHubService.endSession();
  }

  send(message: string): void {
    this.coreFacade.setLoading(true);

    setTimeout(() => {
      this.chatHubService.sendMessage(this.currentUser, message, false);
      this.message = '';
      this.coreFacade.setLoading(false);
    }, 1000);
  }

  sendImage(): void {
    this.coreFacade.setLoading(true);

    setTimeout(() => {
      this.chatHubService.sendMessage(this.currentUser, '', true);
      this.coreFacade.setLoading(false);
    }, 1000);
  }

  copy(): void {
    console.log('copy');
  }

  delete(): void {
    console.log('delete');
  }
}
