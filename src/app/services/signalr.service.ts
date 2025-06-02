import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5059/chatHub') // adjust URL as needed
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('✅ SignalR connected'))
      .catch((err) => console.error('❌ SignalR connection error: ', err));
  }

  /**
   * Listen for incoming messages from the backend
   */
  receiveMessages(callback: (msg: string) => void) {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  /**
   * Send message to the backend
   */
  sendMessage(user: string, message: string) {
    if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection
        .invoke('SendMessage', user, message)
        .catch((err) => console.error('❌ SendMessage error:', err));
    } else {
      console.error('🚫 Cannot send: not connected');
    }
  }
}
