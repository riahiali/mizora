import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { SettingsService, AppSettings } from '../../services/settings.service';
import { CurrencyService } from '../../services/currency.service';
import { LanguageService } from '../../services/language.service';
import { CartItem } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="cart-page">
      <div class="container">
        <div class="page-header">
          <h1>Shopping Cart</h1>
          <p *ngIf="cartItems.length > 0">{{ cartItems.length }} item(s) in your cart</p>
        </div>

        <div class="cart-content" *ngIf="cartItems.length > 0">
          <div class="cart-items">
            <div class="cart-item" *ngFor="let item of cartItems">
              <div class="item-image">
                <img [src]="item.product.images[0] || '/assets/images/placeholder.jpg'" [alt]="item.product.name">
              </div>
              
              <div class="item-details">
                <h3 class="item-name">{{ item.product.name }}</h3>
                <p class="item-category">{{ item.product.category }}</p>
                <div class="item-options">
      
                </div>
              </div>

              <div class="item-price">
                <span class="price">{{ item.product.price }}\د.ت</span>
              </div>

              <div class="item-quantity">
                <button (click)="updateQuantity(item.product.id, item.quantity - 1)" [disabled]="item.quantity <= 1">-</button>
                <span>{{ item.quantity }}</span>
                <button (click)="updateQuantity(item.product.id, item.quantity + 1)">+</button>
              </div>

              <div class="item-total">
                <span class="total">{{ currencyService.formatPrice(item.product.price * item.quantity) }}</span>
              </div>

              <div class="item-actions">
                <button class="remove-btn" (click)="removeItem(item.product.id)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3,6 5,6 21,6"/>
                    <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="cart-summary">
            <div class="summary-card">
              <h3>Order Summary</h3>
                            <div class="summary-row">
                <span>Subtotal:</span>
                <span>{{ currencyService.formatPrice(cartService.getCartTotal()) }}</span>
              </div>
              
              <div class="summary-row">
                <span>Shipping:</span>
                <span>{{ appSettings.freeShippingThreshold > 0 && cartService.getCartTotal() >= appSettings.freeShippingThreshold ? (
                  languageService.translate("common.free")
                ) : (
                  currencyService.formatPrice(appSettings.shippingFee)
                ) }}</span>
              </div>
              
              <div class="summary-row">
                <span>Tax ({{ appSettings.taxRate * 100 }}%):</span>
                <span>{{ currencyService.formatPrice(cartService.getCartTotal() * appSettings.taxRate) }}</span>
              </div>
              
              <div class="summary-row total">
                <span>Total:</span>
                <span>{{ currencyService.formatPrice(cartService.getCartTotal() * (1 + appSettings.taxRate) + (appSettings.freeShippingThreshold > 0 && cartService.getCartTotal() >= appSettings.freeShippingThreshold ? 0 : appSettings.shippingFee)) }}</span>
              </div>
              <button class="btn btn-primary whatsapp-btn" (click)="proceedToWhatsApp()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Order via WhatsApp
              </button>

              <button class="btn btn-outline clear-btn" (click)="clearCart()">
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        <div class="empty-cart" *ngIf="cartItems.length === 0">
          <div class="empty-cart-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-6.018"/>
            </svg>
          </div>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started</p>
          <a routerLink="/products" class="btn btn-primary">Shop Now</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-page {
      padding: 2rem 0;
      min-height: 80vh;
    }

    .page-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .page-header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--primary-blue);
      margin-bottom: 0.5rem;
    }

    .page-header p {
      color: var(--gray);
    }

    .cart-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 3rem;
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .cart-item {
      display: grid;
      grid-template-columns: 100px 1fr auto auto auto auto;
      gap: 1rem;
      align-items: center;
      background: var(--white);
      padding: 1.5rem;
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-sm);
    }

    .item-image {
      width: 100px;
      height: 100px;
      border-radius: var(--border-radius);
      overflow: hidden;
    }

    .item-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .item-details {
      flex: 1;
    }

    .item-name {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--dark-gray);
      margin-bottom: 0.25rem;
    }

    .item-category {
      font-size: 0.875rem;
      color: var(--gray);
      margin-bottom: 0.5rem;
    }

    .item-options {
      display: flex;
      gap: 1rem;
    }

    .option {
      font-size: 0.875rem;
      color: var(--gray);
    }

    .item-price .price {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--primary-blue);
    }

    .item-quantity {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .item-quantity button {
      width: 32px;
      height: 32px;
      border: 1px solid #E9ECEF;
      background: var(--white);
      border-radius: var(--border-radius);
      cursor: pointer;
      font-weight: 600;
      transition: var(--transition);
    }

    .item-quantity button:hover:not(:disabled) {
      border-color: var(--primary-blue);
      color: var(--primary-blue);
    }

    .item-quantity button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .item-quantity span {
      min-width: 2rem;
      text-align: center;
      font-weight: 600;
    }

    .item-total .total {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary-blue);
    }

    .remove-btn {
      background: none;
      border: none;
      color: var(--danger);
      cursor: pointer;
      padding: 0.5rem;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    .remove-btn:hover {
      background: rgba(220, 53, 69, 0.1);
    }

    .cart-summary {
      position: sticky;
      top: 2rem;
      height: fit-content;
    }

    .summary-card {
      background: var(--white);
      padding: 2rem;
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-sm);
    }

    .summary-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--dark-gray);
      margin-bottom: 1.5rem;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
    }

    .summary-row:not(.total) {
      border-bottom: 1px solid #E9ECEF;
    }

    .summary-row.total {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--primary-blue);
      margin-bottom: 2rem;
    }

    .checkout-btn {
      width: 100%;
      margin-bottom: 1rem;
    }

    .clear-btn {
      width: 100%;
    }

    .empty-cart {
      text-align: center;
      padding: 4rem 0;
    }

    .empty-cart-icon {
      color: var(--gray);
      margin-bottom: 2rem;
    }

    .empty-cart h2 {
      font-size: 2rem;
      font-weight: 600;
      color: var(--dark-gray);
      margin-bottom: 1rem;
    }

    .empty-cart p {
      color: var(--gray);
      margin-bottom: 2rem;
    }

    @media (max-width: 768px) {
      .cart-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .cart-item {
        grid-template-columns: 80px 1fr;
        gap: 1rem;
      }

      .item-price,
      .item-quantity,
      .item-total,
      .item-actions {
        grid-column: 1 / -1;
        justify-self: start;
      }

      .item-quantity {
        justify-self: center;
      }

      .item-total {
        justify-self: end;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  appSettings!: AppSettings;

  constructor(
    public cartService: CartService,
    private settingsService: SettingsService,
    public currencyService: CurrencyService,
    public languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });

    this.settingsService.settings$.subscribe(settings => {
      this.appSettings = settings;
    });
  }

  updateQuantity(itemId: string, quantity: number): void {
    this.cartService.updateQuantity(itemId, quantity);
  }

  removeItem(itemId: string): void {
    this.cartService.removeFromCart(itemId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  proceedToWhatsApp(): void {
    const message = this.cartService.generateWhatsAppOrderMessage();
    const whatsappUrl = this.settingsService.generateWhatsAppUrl(message);
    window.open(whatsappUrl, '_blank');
  }
}