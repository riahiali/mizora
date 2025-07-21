import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currentCurrency = 'TND';

  constructor(private settingsService: SettingsService) {
    this.settingsService.settings$.subscribe(settings => {
      this.currentCurrency = settings.currency;
    });
  }

  formatPrice(amount: number): string {
    switch (this.currentCurrency) {
      case 'TND':
        return `${amount.toFixed(2)} د.ت`;
      case 'USD':
        return `$${amount.toFixed(2)}`;
      case 'EUR':
        return `€${amount.toFixed(2)}`;
      case 'GBP':
        return `£${amount.toFixed(2)}`;
      default:
        return `${amount.toFixed(2)} ${this.currentCurrency}`;
    }
  }

  getCurrencySymbol(): string {
    switch (this.currentCurrency) {
      case 'TND':
        return 'د.ت';
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      default:
        return this.currentCurrency;
    }
  }

  getCurrentCurrency(): string {
    return this.currentCurrency;
  }
}

