import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

export interface AppSettings {
  whatsappNumber: string;
  storeName: string;
  storeEmail: string;
  storeAddress: string;
  currency: string;
  taxRate: number;
  shippingFee: number;
  freeShippingThreshold: number;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingsSubject = new BehaviorSubject<AppSettings>({
    whatsappNumber: '+1234567890',
    storeName: 'MIZORA',
    storeEmail: 'contact@mizora.com',
    storeAddress: '123 Fashion Street, Style City, SC 12345',
    currency: 'TND',
    taxRate: 0.08,
    shippingFee: 10,
    freeShippingThreshold: 100
  });

  public settings$ = this.settingsSubject.asObservable();

  constructor(private authService: AuthService) {
    this.loadSettings();
  }

  private loadSettings(): void {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        this.settingsSubject.next(parsedSettings);
      } catch (error) {
        console.error('Error parsing saved settings:', error);
        // Use default settings if parsing fails
      }
    }
  }

  private saveSettings(): void {
    localStorage.setItem('appSettings', JSON.stringify(this.settingsSubject.value));
  }

  get settings(): AppSettings {
    return this.settingsSubject.value;
  }

  async updateSettings(settings: Partial<AppSettings>): Promise<void> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedSettings = { ...this.settingsSubject.value, ...settings };
      this.settingsSubject.next(updatedSettings);
      this.saveSettings();
      
      console.log('Settings updated successfully:', updatedSettings);
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }

  getWhatsAppNumber(): string {
    return this.settings.whatsappNumber;
  }

  generateWhatsAppUrl(message: string): string {
    const phoneNumber = this.getWhatsAppNumber().replace('+', '');
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  }
}