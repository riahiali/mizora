import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="product-card">
      <div class="product-image">
        <img [src]="product.images[0] || '/assets/images/placeholder.jpg'" [alt]="product.name">
        
        <div class="product-badges">
          <span class="badge new" *ngIf="product.isNew">NEW</span>
          <span class="badge sale" *ngIf="product.isSale">SALE</span>
          <span class="badge discount" *ngIf="product.discount">-{{ product.discount }}%</span>
        </div>

        <div class="product-actions">
          <button class="action-btn favorite-btn" 
                  [class.active]="isFavorite" 
                  (click)="toggleFavorite()"
                  title="Add to Favorites">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          
          <button class="action-btn quick-view-btn" 
                  (click)="quickView()"
                  title="Quick View">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="product-info">
        <div class="product-category">{{ product.category }}</div>
        <h3 class="product-name">
          <a [routerLink]="['/products', product.id]">{{ product.name }}</a>
        </h3>
        
        <div class="product-rating">
          <div class="stars">
            <span class="star" 
                  *ngFor="let star of [1,2,3,4,5]" 
                  [class.filled]="star <= product.rating">
              ★
            </span>
          </div>
          <span class="rating-count">({{ product.reviewCount }})</span>
        </div>

        <div class="product-price">
          <span class="current-price">{{ product.price }}\ د.ت</span>
          <span class="original-price" *ngIf="product.originalPrice">\د.ت{{ product.originalPrice }}</span>
        </div>

        <div class="product-actions-bottom">
          <button class="btn btn-primary add-to-cart-btn" 
                  (click)="quickAddToCart()"
                  [disabled]="!product.inStock">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-6.018"/>
            </svg>
            {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-card {
      background: var(--white);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-sm);
      overflow: hidden;
      transition: var(--transition);
      position: relative;
    }
    :host {
  position: relative;
  z-index: 50;
}
    .product-card:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-4px);
    }

    .product-image {
      position: relative;
      overflow: hidden;
      aspect-ratio: 1;
    }

    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);
    }

    .product-card:hover .product-image img {
      transform: scale(1.05);
    }

    .product-badges {
      position: absolute;
      top: 0.75rem;
      left: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      z-index: 2;
    }

    .badge {
      padding: 0.25rem 0.5rem;
      border-radius: var(--border-radius);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .badge.new {
      background: var(--success);
      color: var(--white);
    }

    .badge.sale {
      background: var(--danger);
      color: var(--white);
    }

    .badge.discount {
      background: var(--primary-yellow);
      color: var(--primary-blue);
    }

    .product-actions {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      opacity: 0;
      transform: translateX(10px);
      transition: var(--transition);
    }

    .product-card:hover .product-actions {
      opacity: 1;
      transform: translateX(0);
    }

    .action-btn {
      width: 36px;
      height: 36px;
      border: none;
      border-radius: 50%;
      background: var(--white);
      color: var(--gray);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-sm);
      transition: var(--transition);
    }

    .action-btn:hover {
      background: var(--primary-blue);
      color: var(--white);
    }

    .action-btn.active {
      background: var(--danger);
      color: var(--white);
    }

    .product-info {
      padding: 1rem;
    }

    .product-category {
      font-size: 0.75rem;
      color: var(--gray);
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }

    .product-name {
      margin: 0 0 0.5rem 0;
      font-size: 1rem;
      font-weight: 600;
    }

    .product-name a {
      text-decoration: none;
      color: var(--dark-gray);
      transition: var(--transition);
    }

    .product-name a:hover {
      color: var(--primary-blue);
    }

    .product-rating {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }

    .stars {
      display: flex;
      gap: 0.125rem;
    }

    .star {
      color: #ddd;
      font-size: 0.875rem;
    }

    .star.filled {
      color: var(--primary-yellow);
    }

    .rating-count {
      font-size: 0.75rem;
      color: var(--gray);
    }

    .product-price {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .current-price {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--primary-blue);
    }

    .original-price {
      font-size: 0.875rem;
      color: var(--gray);
      text-decoration: line-through;
    }

    .product-actions-bottom {
      display: flex;
      gap: 0.5rem;
    }

    .add-to-cart-btn {
      flex: 1;
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
    }

    .add-to-cart-btn:disabled {
      background: var(--gray);
      cursor: not-allowed;
    }

    .add-to-cart-btn:disabled:hover {
      background: var(--gray);
      transform: none;
    }

    @media (max-width: 768px) {
      .product-actions {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `]
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  
  isFavorite = false;

  constructor(
    private cartService: CartService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.isFavorite = this.favoritesService.isFavorite(this.product.id);
    
    this.favoritesService.favorites$.subscribe(() => {
      this.isFavorite = this.favoritesService.isFavorite(this.product.id);
    });
  }

  toggleFavorite(): void {
    this.favoritesService.toggleFavorite(this.product);
  }

  quickAddToCart(): void {
    if (this.product.inStock) {
      
      const cartItem = {
        id: this.product.id,
        productId: this.product.id,
        product: this.product,
        quantity: 1,
        addedAt: new Date()
      };
      this.cartService.addToCart(cartItem);
    }
  }

  quickView(): void {
    // Implement quick view modal
    console.log('Quick view for product:', this.product.name);
  }
}