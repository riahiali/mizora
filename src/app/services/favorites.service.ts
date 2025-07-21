import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FavoriteItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<FavoriteItem[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      this.favoritesSubject.next(JSON.parse(favorites));
    }
  }

  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favoritesSubject.value));
  }

  addToFavorites(product: Product): void {
    const currentFavorites = this.favoritesSubject.value;
    const existingItem = currentFavorites.find(item => item.productId === product.id);

    if (!existingItem) {
      const newItem: FavoriteItem = {
        id: Date.now().toString(),
        productId: product.id,
        product: product,
        addedAt: new Date()
      };
      currentFavorites.push(newItem);
      this.favoritesSubject.next(currentFavorites);
      this.saveFavorites();
    }
  }

  removeFromFavorites(productId: string): void {
    const currentFavorites = this.favoritesSubject.value;
    const filteredFavorites = currentFavorites.filter(item => item.productId !== productId);
    this.favoritesSubject.next(filteredFavorites);
    this.saveFavorites();
  }

  toggleFavorite(product: Product): void {
    if (this.isFavorite(product.id)) {
      this.removeFromFavorites(product.id);
    } else {
      this.addToFavorites(product);
    }
  }

  isFavorite(productId: string): boolean {
    return this.favoritesSubject.value.some(item => item.productId === productId);
  }

  get favoriteCount(): number {
    return this.favoritesSubject.value.length;
  }

  get favorites(): FavoriteItem[] {
    return this.favoritesSubject.value;
  }

  clearFavorites(): void {
    this.favoritesSubject.next([]);
    localStorage.removeItem('favorites');
  }
}