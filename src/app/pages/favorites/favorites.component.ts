import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FavoritesService } from '../../services/favorites.service';
import { FavoriteItem } from '../../models/product.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  template: `
    <div class="favorites-page">
      <div class="container">
        <div class="page-header">
          <h1>My Favorites</h1>
          <p *ngIf="favorites.length > 0">{{ favorites.length }} item(s) in your favorites</p>
        </div>

        <div class="favorites-content" *ngIf="favorites.length > 0">
          <div class="favorites-actions">
            <button class="btn btn-outline clear-btn" (click)="clearFavorites()">
              Clear All Favorites
            </button>
          </div>

          <div class="favorites-grid">
            <app-product-card 
              *ngFor="let favorite of favorites" 
              [product]="favorite.product">
            </app-product-card>
          </div>
        </div>

        <div class="empty-favorites" *ngIf="favorites.length === 0">
          <div class="empty-favorites-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>
          <h2>No favorites yet</h2>
          <p>Start adding products to your favorites to see them here</p>
          <a routerLink="/products" class="btn btn-primary">Browse Products</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .favorites-page {
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

    .favorites-actions {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 2rem;
    }

    .clear-btn {
      color: var(--danger);
      border-color: var(--danger);
    }

    .clear-btn:hover {
      background: var(--danger);
      color: var(--white);
    }

    .favorites-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .empty-favorites {
      text-align: center;
      padding: 4rem 0;
    }

    .empty-favorites-icon {
      color: var(--gray);
      margin-bottom: 2rem;
    }

    .empty-favorites h2 {
      font-size: 2rem;
      font-weight: 600;
      color: var(--dark-gray);
      margin-bottom: 1rem;
    }

    .empty-favorites p {
      color: var(--gray);
      margin-bottom: 2rem;
    }

    @media (max-width: 768px) {
      .favorites-actions {
        justify-content: center;
      }
    }
  `]
})
export class FavoritesComponent implements OnInit {
  favorites: FavoriteItem[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.favoritesService.favorites$.subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  clearFavorites(): void {
    if (confirm('Are you sure you want to clear all favorites?')) {
      this.favoritesService.clearFavorites();
    }
  }
}