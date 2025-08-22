import { Component } from '@angular/core';
import { WalletComponent } from './wallet/wallet.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WalletComponent],
  template: '<app-wallet />',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'angular-tour-of-heroes';
}
