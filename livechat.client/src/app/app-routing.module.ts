import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './shared/_enums/routes.enum';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutes.ChatRoom,
  },
  {
    path: AppRoutes.ChatRoom,
    loadChildren: () => import('../app/chat-room/chat-room.module').then((m) => m.ChatRoomModule), //lazy loading the route
  },
  {
    path: '**',
    redirectTo: AppRoutes.ChatRoom,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
