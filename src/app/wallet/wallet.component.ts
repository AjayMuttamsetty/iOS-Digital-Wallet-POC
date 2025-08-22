import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="wallet-container">
      <div class="wallet-card">
        <div class="wallet-header">
          <h1>✈️ Boarding Pass</h1>
          <p>Add your boarding pass to Apple Wallet</p>
        </div>
        
        <div class="wallet-content">
          <div class="pass-preview">
            <div class="pass-icon">🎫</div>
            <div class="pass-details">
              <h3>Flight Details</h3>
              <p>Your boarding pass is ready to be added to your wallet</p>
            </div>
          </div>
          
          <button 
            class="wallet-button" 
            (click)="addToWallet()"
            [disabled]="isLoading">
            <span class="button-icon">📱</span>
            <span class="button-text">
              {{ isLoading ? 'Adding...' : (isMobile ? (isIOS ? 'Add to Apple Wallet' : 'Add to Wallet') : 'Download Pass') }}
            </span>
          </button>
          
          <button 
            *ngIf="!isMobile"
            class="test-button" 
            (click)="testPassFile()"
            style="margin-top: 15px; background: #28a745; padding: 12px 20px; border-radius: 25px; border: none; color: white; cursor: pointer;">
            🧪 Test Pass File
          </button>
          
          <div class="wallet-info">
            <p *ngIf="isMobile">📱 Tap the button above to add to your wallet</p>
            <p *ngIf="!isMobile">📱 Open this page on your iPhone to add to Apple Wallet</p>
            <p>💳 Works with Apple Wallet app</p>
          </div>
          
          <div *ngIf="showSuccess" class="success-message">
            <p *ngIf="isMobile">✅ Boarding pass added successfully!</p>
            <p *ngIf="isMobile">Check your Apple Wallet app</p>
            <p *ngIf="!isMobile">📱 To add to Apple Wallet:</p>
            <p *ngIf="!isMobile">1. Open this page on your iPhone</p>
            <p *ngIf="!isMobile">2. Tap "Add to Wallet" button</p>
            <p *ngIf="!isMobile">3. The pass will open in Apple Wallet</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .wallet-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .wallet-card {
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      padding: 40px;
      max-width: 500px;
      width: 100%;
      text-align: center;
    }
    
    .wallet-header h1 {
      color: #333;
      margin: 0 0 10px 0;
      font-size: 2.5rem;
      font-weight: 700;
    }
    
    .wallet-header p {
      color: #666;
      margin: 0 0 30px 0;
      font-size: 1.1rem;
    }
    
    .wallet-content {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
    
    .pass-preview {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 25px;
      background: #f8f9fa;
      border-radius: 15px;
      border: 2px dashed #dee2e6;
    }
    
    .pass-icon {
      font-size: 3rem;
      background: #007aff;
      color: white;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .pass-details h3 {
      margin: 0 0 10px 0;
      color: #333;
      font-size: 1.3rem;
    }
    
    .pass-details p {
      margin: 0;
      color: #666;
      font-size: 1rem;
    }
    
    .wallet-button {
      background: #007aff;
      color: white;
      border: none;
      padding: 18px 30px;
      border-radius: 50px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      box-shadow: 0 8px 20px rgba(0, 122, 255, 0.3);
    }
    
    .wallet-button:hover:not(:disabled) {
      background: #0056cc;
      transform: translateY(-2px);
      box-shadow: 0 12px 25px rgba(0, 122, 255, 0.4);
    }
    
    .wallet-button:active:not(:disabled) {
      transform: translateY(0);
    }
    
    .wallet-button:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
    
    .button-icon {
      font-size: 1.2rem;
    }
    
    .wallet-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .wallet-info p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
    
    .success-message {
      background: #d4edda;
      border: 1px solid #c3e6cb;
      border-radius: 10px;
      padding: 20px;
      color: #155724;
    }
    
    .success-message p {
      margin: 0 0 8px 0;
      font-weight: 600;
    }
    
    .success-message p:last-child {
      margin-bottom: 0;
      font-weight: normal;
      font-size: 0.9rem;
    }
    
    @media (max-width: 600px) {
      .wallet-card {
        padding: 30px 20px;
      }
      
      .wallet-header h1 {
        font-size: 2rem;
      }
      
      .pass-preview {
        flex-direction: column;
        text-align: center;
      }
      
      .pass-icon {
        width: 60px;
        height: 60px;
        font-size: 2rem;
      }
    }
  `]
})
export class WalletComponent implements OnInit {
  isLoading = false;
  isMobile = false;
  showSuccess = false;

  ngOnInit() {
    this.checkDevice();
  }

  private checkDevice() {
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  get isIOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  addToWallet() {
    this.isLoading = true;
    
    if (this.isMobile) {
        alert('isMobile');
      // For mobile devices, use the proper approach
      this.addToMobileWallet();
    } else {
      // For desktop, show instructions
      alert('isDesktop');
      this.showDesktopInstructions();
      this.isLoading = false;
    }
  }

  private addToMobileWallet() {
    if (this.isIOS) {
      // For iOS devices, use the most effective method
      this.addToIOSWallet();
    } else {
      // For Android and other mobile devices
      this.addToAndroidWallet();
    }
  }

  private addToIOSWallet() {
    // For iOS, the most reliable method is to directly link to the .pkpass file
    // This will automatically trigger the Apple Wallet app to open and add the pass
    
    // Method 1: Try opening the .pkpass file directly in a new window
    const passUrl = window.location.origin + '/BoardingPass.pkpass';
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = passUrl;
    link.style.display = 'none';
    link.target = '_blank';
    
    // Add the link to the DOM and click it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message after a delay
    setTimeout(() => {
      this.isLoading = false;
      this.showSuccess = true;
      
      setTimeout(() => {
        this.showSuccess = false;
      }, 5000);
    }, 2000);
  }

  private addToAndroidWallet() {
    // For Android, try to open the .pkpass file directly
    // This will either open in a compatible app or download the file
    const passUrl = window.location.origin + '/BoardingPass.pkpass';

    alert(passUrl);
    
    // Try to open in new window/tab first
    const newWindow = window.open(passUrl, '_blank');
    
    if (!newWindow) {
      // Fallback to direct download
      this.fallbackToDirectDownload();
    }
    
    // Show success message after a delay
    setTimeout(() => {
      this.isLoading = false;
      this.showSuccess = true;
      
      setTimeout(() => {
        this.showSuccess = false;
      }, 5000);
    }, 2000);
  }

  private fallbackToDirectDownload() {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/BoardingPass.pkpass';
    link.download = 'BoardingPass.pkpass';
    link.type = 'application/vnd.apple.pkpass';
    
    // Try to open in new window/tab first (this often triggers the wallet app on iOS)
    const newWindow = window.open('/BoardingPass.pkpass', '_blank');
    
    if (!newWindow) {
      // Fallback to direct download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    // Show success after a delay
    setTimeout(() => {
      this.isLoading = false;
      this.showSuccess = true;
      
      setTimeout(() => {
        this.showSuccess = false;
      }, 5000);
    }, 1000);
  }

  private showDesktopInstructions() {
    this.showSuccess = true;
    // Override success message for desktop
    setTimeout(() => {
      this.showSuccess = false;
    }, 8000);
  }

  testPassFile() {
    // Test if the .pkpass file is accessible with correct MIME type
    fetch('/BoardingPass.pkpass')
      .then(response => {
        console.log('Response headers:', response.headers);
        console.log('Content-Type:', response.headers.get('Content-Type'));
        alert(`Pass file test:\nStatus: ${response.status}\nContent-Type: ${response.headers.get('Content-Type')}\n\nCheck console for full headers.`);
      })
      .catch(error => {
        console.error('Error testing pass file:', error);
        alert('Error testing pass file. Check console for details.');
      });
  }

  private showSuccessMessage() {
    // You can implement a toast or success message here
    console.log('Boarding pass added successfully!');
  }
}
