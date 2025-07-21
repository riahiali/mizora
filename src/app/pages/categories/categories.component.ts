import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductCategory } from '../../models/product.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="categories-page">
      <div class="container">
        <div class="page-header">
          <h1>Categories</h1>
          <p>Browse our product categories</p>
        </div>

        <!-- Loading State -->
        <div *ngIf="loading" class="loading-container">
          <div class="custom-spinner"></div>
          <p>Loading Categories...</p>
        </div>

        <!-- Categories Grid -->
        <div class="categories-grid" *ngIf="!loading && categories.length > 0">
          <div class="category-card" *ngFor="let category of categories">
            <div class="category-image">
              <img [src]="category.image" [alt]="category.name">
              <div class="category-overlay">
                <a [routerLink]="['/products']" [queryParams]="{category: category.slug}" class="btn btn-primary">
                  Browse {{ category.name }}
                </a>
              </div>
            </div>
            <div class="category-info">
              <h3>{{ category.name }}</h3>
              <p>{{ category.description }}</p>
              <div class="category-stats">
                <span class="product-count">{{ category.productCount }} Products</span>
              </div>
            </div>
          </div>
        </div>

        <!-- No Categories State -->
        <div class="no-categories" *ngIf="!loading && categories.length === 0">
          <div class="empty-state-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="9" cy="9" r="2"/>
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
            </svg>
          </div>
          <h2>No categories found</h2>
          <p>Categories will appear here once they are added</p>
          <button class="btn btn-primary" (click)="loadCategories()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
              <path d="M3 21v-5h5"/>
            </svg>
            Retry
          </button>
        </div>

        <!-- Error State -->
        <div class="error-state" *ngIf="!loading && error">
          <div class="error-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
          <h2>Failed to load categories</h2>
          <p>{{ error }}</p>
          <button class="btn btn-primary" (click)="loadCategories()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
              <path d="M3 21v-5h5"/>
            </svg>
            Try Again
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .categories-page {
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
      font-size: 1.125rem;
      color: var(--gray);
    }
    .loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
}

.custom-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #3b82f6; /* blue-500 */
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-container p {
  color: #3b82f6; /* blue-500 */
  font-weight: 600;
  font-size: 1.125rem; /* 18px */
}

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      animation: fadeIn 0.5s ease-in-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .category-card {
      background: var(--white);
      border-radius: var(--border-radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: var(--transition);
    }

    .category-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-md);
    }

    .category-image {
      position: relative;
      aspect-ratio: 4/3;
      overflow: hidden;
    }

    .category-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);
    }

    .category-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(9, 57, 92, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: var(--transition);
    }

    .category-card:hover .category-overlay {
      opacity: 1;
    }

    .category-card:hover .category-image img {
      transform: scale(1.05);
    }

    .category-info {
      padding: 1.5rem;
    }

    .category-info h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--primary-blue);
      margin-bottom: 0.5rem;
    }

    .category-info p {
      color: var(--gray);
      margin-bottom: 1rem;
      line-height: 1.5;
    }

    .category-stats {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .product-count {
      font-size: 0.875rem;
      color: var(--primary-blue);
      font-weight: 500;
    }

    /* Loading State Styles */
    .loading {
      text-align: center;
      padding: 4rem 0;
      animation: fadeIn 0.3s ease-in-out;
    }

    .spinner {
      width: 48px;
      height: 48px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid var(--primary-blue);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1.5rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loading p {
      color: var(--gray);
      font-size: 1rem;
      margin: 0;
    }

    /* Empty State Styles */
    .no-categories {
      text-align: center;
      padding: 4rem 0;
      color: var(--gray);
      animation: fadeIn 0.5s ease-in-out;
    }

    .empty-state-icon {
      color: var(--light-gray);
      margin-bottom: 1.5rem;
    }

    .no-categories h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--dark-gray);
      margin-bottom: 1rem;
    }

    .no-categories p {
      margin-bottom: 2rem;
      font-size: 1rem;
    }

    /* Error State Styles */
    .error-state {
      text-align: center;
      padding: 4rem 0;
      color: var(--gray);
      animation: fadeIn 0.5s ease-in-out;
    }

    .error-icon {
      color: var(--danger);
      margin-bottom: 1.5rem;
    }

    .error-state h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--danger);
      margin-bottom: 1rem;
    }

    .error-state p {
      margin-bottom: 2rem;
      font-size: 1rem;
    }

    /* Button Styles */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: var(--border-radius);
      font-size: 1rem;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
      transition: var(--transition);
    }

    .btn-primary {
      background: var(--primary-blue);
      color: var(--white);
    }

    .btn-primary:hover {
      background: #07304A;
      transform: translateY(-1px);
    }

    .btn-primary:active {
      transform: translateY(0);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .categories-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .page-header h1 {
        font-size: 2rem;
      }

      .loading,
      .no-categories,
      .error-state {
        padding: 3rem 1rem;
      }
    }

    /* CSS Variables (add these to your global styles if not already present) */
    :root {
      --primary-blue: #09395C;
      --white: #ffffff;
      --gray: #6c757d;
      --dark-gray: #343a40;
      --light-gray: #f8f9fa;
      --danger: #dc3545;
      --border-radius: 8px;
      --border-radius-lg: 12px;
      --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
      --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
      --transition: all 0.3s ease;
    }
  `]
})
export class CategoriesComponent implements OnInit {
  categories: ProductCategory[] = [];
  loading = true; // Start with loading true
  error: string | null = null;

  constructor(private productService: ProductService) {}

  async ngOnInit(): Promise<void> {
    await this.loadCategories();
  }

  async loadCategories(): Promise<void> {
    this.loading = true;
    this.error = null;
    
    try {
      // Add a minimum loading time to show the spinner
      const [categoriesResult] = await Promise.all([
        this.productService.getCategories(),
        new Promise(resolve => setTimeout(resolve, 800)) // Minimum 800ms loading time
      ]);
      
      this.categories = categoriesResult;
    } catch (error) {
      console.error('Error loading categories:', error);
      this.error = error instanceof Error ? error.message : 'Failed to load categories. Please try again.';
      this.categories = [];
    } finally {
      this.loading = false;
    }
  }
}

