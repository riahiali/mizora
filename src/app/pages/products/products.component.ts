import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { Product, ProductCategory } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ProductCardComponent],
  template: `
    <div class="products-page" (click)="onPageClick($event)">
      <div class="container">
        <div class="page-header">
          <h1>Products</h1>
          <p>Discover our amazing collection</p>
        </div>

        <div class="products-filters">
          <div class="filter-bar">
            <div class="filter-group search-group">
              <input
                type="text"
                placeholder="Search products..."
                class="search-input"
                [(ngModel)]="searchQuery"
                (input)="onSearch()"
                (focus)="onInputFocus()"
                (blur)="onInputBlur()"
              />
              <span class="search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </span>
            </div>
            
            <div class="filter-group">
              <div class="custom-dropdown" (click)="toggleCategoryDropdown()" (blur)="onDropdownBlur()" tabindex="0">
                <div class="dropdown-selected" *ngIf="selectedCategoryName">{{ selectedCategoryName }}</div>
                <div class="dropdown-selected" *ngIf="!selectedCategoryName">All Categories</div>
                <span class="dropdown-arrow"></span>
                <div class="dropdown-list" *ngIf="showCategoryDropdown" (click)="$event.stopPropagation()">
                  <div class="dropdown-item" *ngFor="let category of categories" (click)="selectCategory(category)">
                    {{ category.name }}
                  </div>
                </div>
              </div>
            </div>

            <div class="filter-group">
              <div class="custom-dropdown" (click)="toggleSortDropdown()" (blur)="onDropdownBlur()" tabindex="0">
                <div class="dropdown-selected" *ngIf="sortBy">{{ getSortLabel(sortBy) }}</div>
                <div class="dropdown-selected" *ngIf="!sortBy">Sort By</div>
                <span class="dropdown-arrow"></span>
                <div class="dropdown-list" *ngIf="showSortDropdown" (click)="$event.stopPropagation()">
                  <div class="dropdown-item" *ngFor="let option of sortOptions" (click)="selectSort(option.value)">
                    {{ option.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="products-grid-wrapper">
          <div class="products-grid" *ngIf="products.length > 0">
            <app-product-card 
              *ngFor="let product of products" 
              [product]="product">
            </app-product-card>
          </div>

          <div class="no-products" *ngIf="products.length === 0 && !loading">
            <p>No products found</p>
          </div>

          <div *ngIf="loading" class="loading-container">
            <div class="custom-spinner"></div>
            <p>Loading products...</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .products-page {
      padding: 2rem 0;
      min-height: 80vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
      position: relative; /* Establish a root stacking context */
      z-index: 0;
    }

    .container {
      position: relative;
      z-index: 10;
    }

    .page-header {
      text-align: center;
      margin-bottom: 3rem;
      padding: 1.5rem;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 15px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    }

    .page-header h1 {
      font-size: 2.75rem;
      font-weight: 700;
      color: var(--primary-blue);
      margin-bottom: 0.75rem;
      font-family: 'Poppins', sans-serif;
      line-height: 1.2;
    }

    .page-header p {
      font-size: 1.25rem;
      color: var(--gray-600);
      font-family: 'Open Sans', sans-serif;
    }

    .products-filters {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 2.5rem;
      flex-wrap: wrap;
      padding: 1.5rem;
      background: #ffffff;
      border-radius: 15px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
      transition: transform 0.3s ease;
      position: relative;
      z-index: 1500; /* High z-index for filters */
    }

    .products-filters:hover {
      transform: translateY(-2px);
    }

    .filter-bar {
      display: flex;
      gap: 1.5rem;
      width: 100%;
      flex-wrap: wrap;
    }

    .filter-group {
      flex: 1;
      min-width: 250px;
      position: relative;
    }

    .search-group {
      display: flex;
      align-items: center;
    }

    .search-input {
      width: 100%;
      padding: 0.875rem 2rem;
      border: 2px solid var(--light-gray);
      border-radius: 30px;
      font-size: 1rem;
      background-color: #fff;
      color: var(--gray-800);
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
      outline: none;
    }

    .search-input:focus {
      border-color: var(--primary-blue);
      box-shadow: 0 0 10px rgba(9, 57, 92, 0.15);
    }

    .search-input::placeholder {
      color: var(--gray-500);
    }

    .search-icon {
      position: absolute;
      right: 1rem;
      color: var(--gray-600);
      pointer-events: none;
      transition: color 0.3s ease;
    }

    .search-input:focus + .search-icon {
      color: var(--primary-blue);
    }

    .custom-dropdown {
      position: relative;
      width: 100%;
    }

    .dropdown-selected {
      width: 100%;
      padding: 0.875rem 2rem;
      border: 2px solid var(--light-gray);
      border-radius: 30px;
      font-size: 1rem;
      background-color: #fff;
      color: var(--gray-800);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: 'Poppins', sans-serif;
      transition: border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
      box-shadow: none;
    }

    .dropdown-selected:hover {
      border-color: var(--gray-400);
      background-color: #f9fafb;
    }

    .dropdown-selected:focus-within {
      border-color: var(--primary-blue);
      box-shadow: 0 0 10px rgba(9, 57, 92, 0.15);
    }

    .dropdown-list {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #ffffff;
      border: 1px solid var(--light-gray);
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
      margin-top: 4px;
      max-height: 250px;
      overflow-y: auto;
      z-index: 2000; /* Ensure it stays above everything */
      padding: 0;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-5px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .dropdown-item {
      padding: 0.75rem 1.5rem;
      cursor: pointer;
      font-family: 'Poppins', sans-serif;
      color: var(--gray-800);
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .dropdown-item:hover {
      background-color: var(--light-gray);
      color: var(--primary-blue);
    }

    .dropdown-arrow {
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid var(--gray-600);
      transition: transform 0.3s ease, border-top-color 0.3s ease;
    }

    .dropdown-selected:hover .dropdown-arrow {
      border-top-color: var(--primary-blue);
    }

    .custom-dropdown:focus-within .dropdown-arrow,
    .custom-dropdown:hover .dropdown-arrow {
      transform: rotate(180deg);
    }

    .products-grid-wrapper {
      position: relative;
      z-index: 100; /* Lower than dropdown */
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      padding: 0 1rem;
      transition: opacity 0.3s ease;
    }

    .no-products {
      text-align: center;
      padding: 4rem 0;
      color: var(--gray-600);
      font-family: 'Open Sans', sans-serif;
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
      border: 4px solid #3b82f6;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .loading-container p {
      color: #3b82f6;
      font-weight: 600;
      font-size: 1.25rem;
      font-family: 'Poppins', sans-serif;
    }

    @media (max-width: 768px) {
      .products-filters {
        flex-direction: column;
      }

      .filter-group {
        min-width: auto;
      }

      .page-header h1 {
        font-size: 2rem;
      }
    }

    /* CSS Variables for Modern Palette */
    :root {
      --primary-blue: #09395C;
      --gray-800: #1f2937;
      --gray-600: #4b5563;
      --gray-500: #6b7280;
      --gray-400: #9ca3af;
      --light-gray: #e5e7eb;
      --white: #ffffff;
      --shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
    }
  `]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: ProductCategory[] = [];
  loading = false;
  searchQuery = '';
  selectedCategory = '';
  sortBy = '';
  showCategoryDropdown = false;
  showSortDropdown = false;

  sortOptions = [
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Rating' },
    { value: 'newest', label: 'Newest' }
  ];

  constructor(private productService: ProductService) {}

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  private async loadData(): Promise<void> {
    this.loading = true;
    try {
      const [products, categories] = await Promise.all([
        this.productService.getProducts(),
        this.productService.getCategories()
      ]);
      this.products = products;
      this.categories = categories;
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      this.loading = false;
    }
  }

  async onSearch(): Promise<void> {
    if (this.searchQuery.trim()) {
      try {
        this.products = await this.productService.searchProducts(this.searchQuery);
      } catch (error) {
        console.error('Search error:', error);
      }
    } else {
      await this.loadData();
    }
  }

  async onFilterChange(): Promise<void> {
    this.loading = true;
    try {
      const filters: any = {};
      if (this.selectedCategory) filters.category = this.selectedCategory;
      if (this.sortBy) filters.sortBy = this.sortBy;

      this.products = await this.productService.getProducts(filters);
    } catch (error) {
      console.error('Filter error:', error);
    } finally {
      this.loading = false;
    }
  }

  toggleCategoryDropdown(): void {
    this.showCategoryDropdown = !this.showCategoryDropdown;
    if (this.showCategoryDropdown) this.showSortDropdown = false;
  }

  toggleSortDropdown(): void {
    this.showSortDropdown = !this.showSortDropdown;
    if (this.showSortDropdown) this.showCategoryDropdown = false;
  }

  selectCategory(category: ProductCategory): void {
    this.selectedCategory = category.slug;
    this.showCategoryDropdown = false;
    this.onFilterChange();
  }

  selectSort(value: string): void {
    this.sortBy = value;
    this.showSortDropdown = false;
    this.onFilterChange();
  }

  getSortLabel(value: string): string {
    const option = this.sortOptions.find(opt => opt.value === value);
    return option ? option.label : '';
  }

  get selectedCategoryName(): string {
    return this.categories.find(c => c.slug === this.selectedCategory)?.name || '';
  }

  onInputFocus(): void {
    // Optional: Add focus effects if needed
  }

  onInputBlur(): void {
    // Optional: Reset focus effects
  }

  onDropdownBlur(): void {
    setTimeout(() => {
      this.showCategoryDropdown = false;
      this.showSortDropdown = false;
    }, 200);
  }

  onPageClick(event: MouseEvent): void {
    const dropdowns = document.querySelectorAll('.custom-dropdown');
    let isInside = false;
    dropdowns.forEach(dropdown => {
      if (dropdown.contains(event.target as Node)) isInside = true;
    });
    if (!isInside) {
      this.showCategoryDropdown = false;
      this.showSortDropdown = false;
    }
  }
}