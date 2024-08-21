import { inject, Injectable, OnInit, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { CoreFacade } from '../../core/core.facade';
import { BASE64_IMAGE } from '../../chat-room/_constants/chat.constants';

@Injectable({
    providedIn: 'root',
})
export class ChatHubService {
    readonly connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7291/chat', {
            withCredentials: false,
        })
        .configureLogging(signalR.LogLevel.Information)
        .build();

    currentUser: string = '';
    image = BASE64_IMAGE;

    coreFacade = inject(CoreFacade);

    constructor() {
        this.coreFacade.currentUser$.subscribe((user) => {
            if (user) {
                this.currentUser = user;
            }
        })
    }

    async startSession(): Promise<void> {
        try {
            if (this.connection.state !== signalR.HubConnectionState.Connected) {
                await this.connection.start();
            }

            console.log("Connection is established");
        }
        catch (error) {
            console.error("Error occured while connection startup: ", error);
        }
    }

    async sendMessage(user: string, message: string, isImage: boolean): Promise<void> {
        return this.connection.invoke("SendMessage", user, message, isImage)
            .then(() => {
                this.createHTMLElement(user, message, isImage);
            })
            .catch(error => console.error("Error occured while sending a message: ", error));
    }

    registerOnServerEvents(): void {
        this.connection.on("ReceiveMessage", (user: string, message: string, isImage: boolean) => {
            if (this.currentUser === user) { return; }

            this.createHTMLElement(user, message, isImage);
        });
    }

    async endSession(): Promise<void> {
        if (this.connection) {
            this.connection.stop();
        }
    }

    private createHTMLElement(user: string, message: string, isImage: boolean): void {
        var div = document.createElement('div');
        div.id = this.currentUser === user ? 'current-user-message' : 'end-user-message';

        if (isImage) {
            div.textContent = `${user}:`;
            var img = document.createElement('img');
            img.src = this.image;
            div.appendChild(img);
        }
        else {
            div.textContent = `${user}: ${message}`;
        }

        if(this.currentUser === user) {
            //add copy & delete buttons
        }

        document.getElementById('chat-content')?.appendChild(div);
    }
}