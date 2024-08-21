import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SEND_IMAGE_TEXT, CHAT_INPUT_PLACEHOLDER } from '../_constants/chat.constants';
import { CoreFacade } from '../../core/core.facade';
import { ChatHubService } from '../../shared/_services/chat-hub.service';
import { useAnimation } from '@angular/animations';


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
    this.chatHubService.sendMessage(this.currentUser, message);
    this.message = '';
  }
}
