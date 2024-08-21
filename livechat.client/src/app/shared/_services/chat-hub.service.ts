import { inject, Injectable, OnInit, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { CoreFacade } from '../../core/core.facade';

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

    async sendMessage(user: string, message: string): Promise<void> {
        return this.connection.invoke("SendMessage", user, message)
            .then(() => {
                var div = document.createElement("div");
                div.className = 'current-user-message';
                div.textContent = `${message}`;
                document.getElementById("chat-content")?.appendChild(div);
            })
            .catch(error => console.error("Error occured while sending a message: ", error));
    }

    registerOnServerEvents(): void {
        this.connection.on("ReceiveMessage", (user: string, message: string) => {
            if (this.currentUser === user) { return; }

            var div = document.createElement("div");
            div.className = 'end-user-message';
            div.textContent = `${message}`;
            document.getElementById("chat-content")?.appendChild(div);
        });
    }

    async endSession(): Promise<void> {
        if (this.connection) {
            this.connection.stop();
        }
    }
}