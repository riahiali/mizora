import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';
import { ProductService } from '../../services/product.service';
import { LanguageService, Language } from '../../services/language.service';
import { User } from '../../models/user.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <!-- Logo -->
          <div class="logo">
            <a routerLink="/" class="logo-link">
              <img src="/assets/images/mizora-logo.jpg" alt="Mizora" class="logo-image">
            </a>
          </div>

          <!-- Search Bar -->
          <div class="search-container">
            <input
              type="text"
              [placeholder]="languageService.translate('common.search') + '...'"
              class="search-input"
              [(ngModel)]="searchQuery"
              (keyup.enter)="onSearch()"
            />
            <button class="search-btn" (click)="onSearch()">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </div>

          <!-- Navigation -->
          <nav class="nav">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
              {{ languageService.translate('nav.home') }}
            </a>
            <a routerLink="/categories" routerLinkActive="active">
              {{ languageService.translate('nav.categories') }}
            </a>
            <a routerLink="/products" routerLinkActive="active">
              {{ languageService.translate('nav.products') }}
            </a>
            <a routerLink="/about" routerLinkActive="active">
              {{ languageService.translate('nav.about') }}
            </a>
          </nav>

          <!-- Actions -->
          <div class="header-actions">
            <!-- Language Selector -->
            <div class="language-selector" (click)="toggleLanguageMenu()">
              <span>{{ currentLanguage === 'fr' ? 'FRANÇAIS' : 'ENGLISH' }}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 9l-7 7-7-7"/>
              </svg>
              <div class="language-dropdown" [class.show]="showLanguageMenu">
                <button class="language-option" 
                        [class.active]="currentLanguage === 'en'"
                        (click)="selectLanguage('en')">
                  <span class="flag">🇺🇸</span>
                  English
                </button>
                <button class="language-option" 
                        [class.active]="currentLanguage === 'fr'"
                        (click)="selectLanguage('fr')">
                  <span class="flag">🇫🇷</span>
                  Français
                </button>
              </div>
            </div>

            <!-- User Account -->
            <div class="user-menu" *ngIf="currentUser; else loginButton">
              <div class="user-avatar" (click)="toggleUserMenu()">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div class="user-dropdown" [class.show]="showUserMenu">
                <div class="user-info">
                  <p class="user-name">{{ currentUser.fullName }}</p>
                  <p class="user-email">{{ currentUser.email }}</p>
                </div>
                <hr>
                <a routerLink="/profile" class="dropdown-item">{{ languageService.translate('nav.profile') }}</a>
                <a routerLink="/orders" class="dropdown-item">Orders</a>
                <a routerLink="/admin" class="dropdown-item" *ngIf="currentUser.isAdmin">{{ languageService.translate('nav.admin') }}</a>
                <hr>
                <button class="dropdown-item logout-btn" (click)="logout()">{{ languageService.translate('nav.logout') }}</button>
              </div>
            </div>

            <ng-template #loginButton>
              <a routerLink="/auth" class="login-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </a>
            </ng-template>

            <!-- Favorites -->
            <a routerLink="/favorites" class="icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span class="badge" *ngIf="favoriteCount > 0">{{ favoriteCount }}</span>
            </a>

            <!-- Cart -->
            <a routerLink="/cart" class="icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-6.018"/>
              </svg>
              <span class="badge" *ngIf="cartItemCount > 0">{{ cartItemCount }}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: var(--white);
      box-shadow: var(--shadow-sm);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: 2rem;
      padding: 1rem 0;
    }

    .logo-link {
      text-decoration: none;
    }

    .logo-image {
      height: 60px;
      width: auto;
      object-fit: contain;
    }

    .search-container {
      flex: 1;
      max-width: 400px;
      position: relative;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 1rem;
      padding-right: 3rem;
      border: 2px solid #E9ECEF;
      border-radius: 25px;
      font-size: 0.875rem;
      transition: var(--transition);
    }

    .search-input:focus {
      outline: none;
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 3px rgba(9, 57, 92, 0.1);
    }

    .search-btn {
      position: absolute;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--gray);
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      transition: var(--transition);
    }

    .search-btn:hover {
      background: var(--light-gray);
      color: var(--primary-blue);
    }

    .nav {
      display: flex;
      gap: 2rem;
    }

    .nav a {
      text-decoration: none;
      color: var(--dark-gray);
      font-weight: 500;
      padding: 0.5rem 0;
      position: relative;
      transition: var(--transition);
    }

    .nav a:hover,
    .nav a.active {
      color: var(--primary-blue);
    }

    .nav a.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--primary-blue);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .language-selector {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.75rem;
      color: var(--gray);
      cursor: pointer;
      padding: 0.5rem;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    .language-selector:hover {
      background: var(--light-gray);
    }

    .language-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      background: var(--white);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-lg);
      min-width: 150px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: var(--transition);
      z-index: 1000;
      overflow: hidden;
    }

    .language-dropdown.show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .language-option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
      padding: 0.75rem 1rem;
      background: none;
      border: none;
      color: var(--dark-gray);
      cursor: pointer;
      transition: var(--transition);
      font-size: 0.875rem;
    }

    .language-option:hover {
      background: var(--light-gray);
    }

    .language-option.active {
      background: var(--primary-blue);
      color: var(--white);
    }

    .flag {
      font-size: 1rem;
    }

    .user-menu {
      position: relative;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--primary-blue);
      color: var(--white);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: var(--transition);
    }

    .user-avatar:hover {
      background: #07304A;
    }

    .user-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      background: var(--white);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-lg);
      min-width: 200px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: var(--transition);
      z-index: 1000;
    }

    .user-dropdown.show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .user-info {
      padding: 1rem;
    }

    .user-name {
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .user-email {
      font-size: 0.875rem;
      color: var(--gray);
    }

    .user-dropdown hr {
      margin: 0;
      border: none;
      height: 1px;
      background: #E9ECEF;
    }

    .dropdown-item {
      display: block;
      width: 100%;
      padding: 0.75rem 1rem;
      color: var(--dark-gray);
      text-decoration: none;
      border: none;
      background: none;
      text-align: left;
      cursor: pointer;
      transition: var(--transition);
    }

    .dropdown-item:hover {
      background: var(--light-gray);
    }

    .logout-btn {
      color: var(--danger);
    }

    .login-btn {
      color: var(--gray);
      padding: 0.5rem;
      border-radius: 50%;
      transition: var(--transition);
    }

    .login-btn:hover {
      background: var(--light-gray);
      color: var(--primary-blue);
    }

    .icon-btn {
      position: relative;
      color: var(--gray);
      padding: 0.5rem;
      border-radius: 50%;
      transition: var(--transition);
      text-decoration: none;
    }

    .icon-btn:hover {
      background: var(--light-gray);
      color: var(--primary-blue);
    }

    .badge {
      position: absolute;
      top: 0;
      right: 0;
      background: var(--primary-yellow);
      color: var(--primary-blue);
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.125rem 0.375rem;
      border-radius: 10px;
      min-width: 18px;
      text-align: center;
    }

    @media (max-width: 768px) {
      .header-content {
        gap: 1rem;
      }

      .nav {
        display: none;
      }

      .search-container {
        max-width: 200px;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null;
  showUserMenu = false;
  showLanguageMenu = false;
  searchQuery = '';
  cartItemCount = 0;
  favoriteCount = 0;
  currentLanguage: Language = 'en';

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private favoritesService: FavoritesService,
    private productService: ProductService,
    public languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.reduce((count, item) => count + item.quantity, 0);
    });

    this.favoritesService.favorites$.subscribe(favorites => {
      this.favoriteCount = favorites.length;
    });

    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });

    // Close menus when clicking outside
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".user-menu")) {
        this.showUserMenu = false;
      }
      if (!target.closest(".language-selector")) {
        this.showLanguageMenu = false;
      }
    });
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
    this.showLanguageMenu = false; // Close language menu
  }

  toggleLanguageMenu(): void {
    this.showLanguageMenu = !this.showLanguageMenu;
    this.showUserMenu = false; // Close user menu
  }

  selectLanguage(language: Language): void {
    this.languageService.setLanguage(language);
    this.showLanguageMenu = false;
  }

  logout(): void {
    this.authService.logout();
    this.showUserMenu = false;
  }

  async onSearch(): Promise<void> {
    if (this.searchQuery.trim()) {
      try {
        const products = await this.productService.searchProducts(this.searchQuery);
        // Handle search results (navigate to search results page or show dropdown)
        console.log('Search results:', products);
      } catch (error) {
        console.error('Search error:', error);
      }
    }
  }
}