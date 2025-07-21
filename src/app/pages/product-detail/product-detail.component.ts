import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartItem, CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';
import { CurrencyService } from '../../services/currency.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="product-detail-page" *ngIf="product">
      <div class="container">
        <div class="product-detail">
          <div class="product-images">
            <div class="main-image">
              <img [src]="selectedImage" [alt]="product.name">
            </div>
            <div class="thumbnail-images" *ngIf="product.images.length > 1">
              <img 
                *ngFor="let image of product.images" 
                [src]="image" 
                [alt]="product.name"
                [class.active]="image === selectedImage"
                (click)="selectImage(image)">
            </div>
          </div>

          <div class="product-info">
            <div class="product-category">{{ product.category }}</div>
            <h1 class="product-name">{{ product.name }}</h1>
            
            <div class="product-rating">
              <div class="stars">
                <span class="star" 
                      *ngFor="let star of [1,2,3,4,5]" 
                      [class.filled]="star <= product.rating">
                  ★
                </span>
              </div>
              <span class="rating-count">({{ product.reviewCount }} reviews)</span>
            </div>

            <div class="product-price">
              <span class="current-price">{{ currencyService.formatPrice(product.price) }}</span>
              <span class="original-price" *ngIf="product.originalPrice">{{ currencyService.formatPrice(product.originalPrice) }}</span>
              <span class="discount" *ngIf="product.discount">{{ product.discount }}% OFF</span>
            </div>

            <div class="product-description">
              <p>{{ product.description }}</p>
            </div>

            <div class="product-options">
              <div class="option-group" *ngIf="product.sizes.length > 0">
                <label>Size:</label>
                <div class="size-options">
                  <button 
                    *ngFor="let size of product.sizes"
                    class="size-btn"
                    [class.active]="selectedSize === size"
                    (click)="selectedSize = size">
                    {{ size }}
                  </button>
                </div>
              </div>

              <div class="option-group" *ngIf="product.colors.length > 0">
                <label>Color:</label>
                <div class="color-options">
                  <button 
                    *ngFor="let color of product.colors"
                    class="color-btn"
                    [class.active]="selectedColor === color"
                    (click)="selectedColor = color">
                    {{ color }}
                  </button>
                </div>
              </div>

              <div class="option-group">
                <label>Quantity:</label>
                <div class="quantity-selector">
                  <button (click)="decreaseQuantity()" [disabled]="quantity <= 1">-</button>
                  <span>{{ quantity }}</span>
                  <button (click)="increaseQuantity()" [disabled]="quantity >= product.stockQuantity">+</button>
                </div>
              </div>
            </div>

            <div class="product-actions">
              <button 
                class="btn btn-primary add-to-cart-btn"
                (click)="addToCart()"
                [disabled]="!product.inStock">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-6.018"/>
                </svg>
                {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
              </button>

              <button 
                class="btn btn-outline favorite-btn"
                (click)="toggleFavorite()"
                [class.active]="isFavorite">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
              </button>
            </div>

            <div class="product-stock" *ngIf="product.inStock">
              <p>{{ product.stockQuantity }} items in stock</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="loading" *ngIf="loading">
      <div class="spinner"></div>
      <p>Loading product...</p>
    </div>
  `,
  styles: [`
    .product-detail-page {
      padding: 2rem 0;
      min-height: 80vh;
    }

    .product-detail {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: start;
    }

    .product-images {
      position: sticky;
      top: 2rem;
    }

    .main-image {
      aspect-ratio: 1;
      overflow: hidden;
      border-radius: var(--border-radius-lg);
      margin-bottom: 1rem;
    }

    .main-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .thumbnail-images {
      display: flex;
      gap: 0.5rem;
      overflow-x: auto;
    }

    .thumbnail-images img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: var(--border-radius);
      cursor: pointer;
      opacity: 0.7;
      transition: var(--transition);
    }

    .thumbnail-images img.active,
    .thumbnail-images img:hover {
      opacity: 1;
      border: 2px solid var(--primary-blue);
    }

    .product-info {
      padding: 1rem 0;
    }

    .product-category {
      font-size: 0.875rem;
      color: var(--gray);
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }

    .product-name {
      font-size: 2rem;
      font-weight: 700;
      color: var(--dark-gray);
      margin-bottom: 1rem;
    }

    .product-rating {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .stars {
      display: flex;
      gap: 0.125rem;
    }

    .star {
      color: #ddd;
      font-size: 1rem;
    }

    .star.filled {
      color: var(--primary-yellow);
    }

    .rating-count {
      font-size: 0.875rem;
      color: var(--gray);
    }

    .product-price {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .current-price {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary-blue);
    }

    .original-price {
      font-size: 1.25rem;
      color: var(--gray);
      text-decoration: line-through;
    }

    .discount {
      background: var(--danger);
      color: var(--white);
      padding: 0.25rem 0.5rem;
      border-radius: var(--border-radius);
      font-size: 0.75rem;
      font-weight: 600;
    }

    .product-description {
      margin-bottom: 2rem;
      line-height: 1.6;
      color: var(--gray);
    }

    .product-options {
      margin-bottom: 2rem;
    }

    .option-group {
      margin-bottom: 1.5rem;
    }

    .option-group label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--dark-gray);
    }

    .size-options,
    .color-options {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .size-btn,
    .color-btn {
      padding: 0.5rem 1rem;
      border: 2px solid #E9ECEF;
      background: var(--white);
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: var(--transition);
    }

    .size-btn.active,
    .color-btn.active {
      border-color: var(--primary-blue);
      background: var(--primary-blue);
      color: var(--white);
    }

    .quantity-selector {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .quantity-selector button {
      width: 40px;
      height: 40px;
      border: 2px solid #E9ECEF;
      background: var(--white);
      border-radius: var(--border-radius);
      cursor: pointer;
      font-size: 1.25rem;
      font-weight: 600;
      transition: var(--transition);
    }

    .quantity-selector button:hover:not(:disabled) {
      border-color: var(--primary-blue);
      color: var(--primary-blue);
    }

    .quantity-selector button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .quantity-selector span {
      font-size: 1.125rem;
      font-weight: 600;
      min-width: 2rem;
      text-align: center;
    }

    .product-actions {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .add-to-cart-btn {
      flex: 2;
    }

    .favorite-btn {
      flex: 1;
    }

    .favorite-btn.active {
      background: var(--danger);
      border-color: var(--danger);
      color: var(--white);
    }

    .product-stock {
      color: var(--success);
      font-size: 0.875rem;
    }

    .loading {
      text-align: center;
      padding: 4rem 0;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid var(--primary-blue);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .product-detail {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .product-images {
        position: static;
      }

      .product-name {
        font-size: 1.5rem;
      }

      .product-actions {
        flex-direction: column;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading = false;
  selectedImage = '';
  selectedSize = '';
  selectedColor = '';
  quantity = 1;
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private favoritesService: FavoritesService,
    public currencyService: CurrencyService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      await this.loadProduct(id);
    }
  }

  private async loadProduct(id: string): Promise<void> {
    this.loading = true;
    try {
      this.product = await this.productService.getProduct(id);
      if (this.product) {
        this.selectedImage = this.product.images[0] || '/assets/images/placeholder.jpg';
        this.selectedSize = this.product.sizes[0] || '';
        this.selectedColor = this.product.colors[0] || '';
        this.isFavorite = this.favoritesService.isFavorite(this.product.id);
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      this.loading = false;
    }
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stockQuantity) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
  if (this.product && this.product.inStock) {
    const cartItem: CartItem = {
      id: this.generateCartItemId(), // You need to implement this
      productId: this.product.id,
      product: this.product,
      quantity: this.quantity,
      selectedSize: this.selectedSize,
      selectedColor: this.selectedColor,
      addedAt: new Date()
    };
    this.cartService.addToCart(cartItem);
  }
}

private generateCartItemId(): string {
  return 'cart-item-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

  toggleFavorite(): void {
    if (this.product) {
      this.favoritesService.toggleFavorite(this.product);
      this.isFavorite = this.favoritesService.isFavorite(this.product.id);
    }
  }
}