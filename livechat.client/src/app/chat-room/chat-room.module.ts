import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomPageComponent } from './chat-room-page/chat-room-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChatRoomPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ChatRoomPageComponent,
      },
    ]),
    SharedModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
  ]
})
export class ChatRoomModule { }
