import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignalRService } from '../../services/signalr.service';
import { signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
@Component({
  selector: 'app-chathub',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ListboxModule,
  ],
  templateUrl: './chathub.component.html',
  styleUrls: ['./chathub.component.css'],
})
export class ChatHubComponent implements OnInit {
  user: string = 'Nizar';
  message: string = '';
  messages = signal<string[]>([]);

  constructor(private signalRService: SignalRService) {}

  ngOnInit(): void {
    this.signalRService.startConnection();

    this.signalRService.receiveMessages((msg: string) => {
      this.messages.set([...this.messages(), msg]);
    });
  }

  send(): void {
    if (this.message.trim()) {
      this.signalRService.sendMessage(this.user, this.message);
      this.message = '';
    }
  }
}
