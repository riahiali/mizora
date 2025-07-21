import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { Product, ProductCategory } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <div class="hero-text">
              <div class="hero-images">
                <img src="/assets/images/fashion-model1.jpg" alt="Fashion Model" class="hero-image">
                <img src="/assets/images/fashion-model2.jpg" alt="Fashion Model" class="hero-image">
              </div>
            </div>
            <div class="hero-banner">
              <div class="sale-banner">
                <h1>SUMMER SALE</h1>
                <div class="discount-badge">35% OFF</div>
                <p>Visit our website for more details</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Service Features -->
      <section class="features-section">
        <div class="container">
          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
              </div>
              <h3>Nationwide Delivery</h3>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <h3>Fast Delivery</h3>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3>Online Customer Support</h3>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"/>
                  <path d="M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"/>
                </svg>
              </div>
              <h3>Easy Return Policy</h3>
            </div>
          </div>
        </div>
      </section>

      <!-- Product Categories -->
      <section class="categories-section">
        <div class="container">
          <div class="section-header">
            <h2>Shop by Category</h2>
            <p>Discover our wide range of products</p>
          </div>
          <div class="categories-grid">
            <div class="category-card" *ngFor="let category of categories">
              <div class="category-image">
                <img [src]="category.image" [alt]="category.name">
              </div>
              <div class="category-info">
                <h3>{{ category.name }}</h3>
                <p>{{ category.productCount }} Products</p>
                <a [routerLink]="['/products']" [queryParams]="{category: category.slug}" class="btn btn-outline">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- New Arrivals -->
      <section class="products-section">
        <div class="container">
          <div class="section-header">
            <h2>New Arrivals</h2>
            <p>Check out our latest products</p>
          </div>
          <div class="products-grid">
            <app-product-card 
              *ngFor="let product of newArrivals" 
              [product]="product">
            </app-product-card>
          </div>
        </div>
      </section>

      <!-- Trending Products -->
      <section class="products-section">
        <div class="container">
          <div class="section-header">
            <h2>Trending</h2>
            <p>Popular products this week</p>
          </div>
          <div class="products-grid">
            <app-product-card 
              *ngFor="let product of trendingProducts" 
              [product]="product">
            </app-product-card>
          </div>
        </div>
      </section>


      <!-- Deal of the Day -->
      <section class="deal-section">
        <div class="container">
          <div class="deal-card" *ngIf="dealOfTheDay">
            <div class="deal-image">
              <img [src]="dealOfTheDay.images[0]" [alt]="dealOfTheDay.name">
            </div>
            <div class="deal-info">
              <h3>Deal Of The Day</h3>
              <h2>{{ dealOfTheDay.name }}</h2>
              <div class="deal-price">
                <span class="current-price">\DT{{ dealOfTheDay.price }}</span>
                <span class="original-price" *ngIf="dealOfTheDay.originalPrice">\DT{{ dealOfTheDay.originalPrice }}</span>
              </div>
              <a [routerLink]="['/products', dealOfTheDay.id]" class="btn btn-secondary">
                ADD TO CART
              </a>
              <div class="deal-timer">
                <div class="timer-item">
                  <span class="timer-number">360</span>
                  <span class="timer-label">DAYS</span>
                </div>
                <div class="timer-item">
                  <span class="timer-number">24</span>
                  <span class="timer-label">HOURS</span>
                </div>
                <div class="timer-item">
                  <span class="timer-number">59</span>
                  <span class="timer-label">MINUTES</span>
                </div>
                <div class="timer-item">
                  <span class="timer-number">00</span>
                  <span class="timer-label">SECONDS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Newsletter -->
      <section class="newsletter-section">
        <div class="container">
          <div class="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Get the latest news and exclusive offers</p>
            <div class="newsletter-form">
              <input type="email" placeholder="Enter your email" class="newsletter-input">
              <button class="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
    }

    .hero-section {
      background: linear-gradient(135deg, var(--light-gray) 0%, #f0f4f8 100%);
      padding: 3rem 0;
      margin-bottom: 4rem;
    }

    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      align-items: center;
    }

    .hero-images {
      display: flex;
      gap: 1rem;
    }

    .hero-image {
      width: 200px;
      height: 280px;
      object-fit: cover;
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-md);
    }

    .hero-banner {
      text-align: center;
    }

    .sale-banner {
      background: linear-gradient(135deg, #00bcd4 0%, #0097a7 100%);
      color: var(--white);
      padding: 3rem 2rem;
      border-radius: var(--border-radius-xl);
      position: relative;
      overflow: hidden;
    }

    .sale-banner::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 20px,
        rgba(255, 255, 255, 0.1) 20px,
        rgba(255, 255, 255, 0.1) 40px
      );
      animation: slide 20s linear infinite;
    }

    @keyframes slide {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    .sale-banner h1 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
      z-index: 1;
      position: relative;
    }

    .discount-badge {
      background: var(--primary-yellow);
      color: var(--primary-blue);
      padding: 0.5rem 1.5rem;
      border-radius: 25px;
      font-size: 1.5rem;
      font-weight: 700;
      display: inline-block;
      margin-bottom: 1rem;
      z-index: 1;
      position: relative;
    }

    .sale-banner p {
      font-size: 1.125rem;
      z-index: 1;
      position: relative;
    }

    .features-section {
      padding: 3rem 0;
      background: var(--white);
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .feature-item {
      text-align: center;
      padding: 2rem;
      border-radius: var(--border-radius-lg);
      background: var(--light-gray);
      transition: var(--transition);
    }

    .feature-item:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-md);
    }

    .feature-icon {
      width: 64px;
      height: 64px;
      background: var(--primary-blue);
      color: var(--white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
    }

    .categories-section {
      padding: 4rem 0;
      background: var(--light-gray);
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-header h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--primary-blue);
      margin-bottom: 0.5rem;
    }

    .section-header p {
      font-size: 1.125rem;
      color: var(--gray);
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
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
      aspect-ratio: 1;
      overflow: hidden;
    }

    .category-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);
    }

    .category-card:hover .category-image img {
      transform: scale(1.05);
    }

    .category-info {
      padding: 1.5rem;
      text-align: center;
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
    }

    .products-section {
      padding: 4rem 0;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .deal-section {
      padding: 4rem 0;
      background: var(--light-gray);
    }

    .deal-card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
      background: var(--white);
      border-radius: var(--border-radius-xl);
      overflow: hidden;
      box-shadow: var(--shadow-md);
    }

    .deal-image {
      aspect-ratio: 1;
      overflow: hidden;
    }

    .deal-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .deal-info {
      padding: 2rem;
    }

    .deal-info h3 {
      color: var(--primary-blue);
      font-size: 1.125rem;
      margin-bottom: 0.5rem;
    }

    .deal-info h2 {
      font-size: 2rem;
      font-weight: 700;
      color: var(--dark-gray);
      margin-bottom: 1rem;
    }

    .deal-price {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .deal-price .current-price {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary-blue);
    }

    .deal-price .original-price {
      font-size: 1.25rem;
      color: var(--gray);
      text-decoration: line-through;
    }

    .deal-timer {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .timer-item {
      text-align: center;
      background: var(--light-gray);
      padding: 1rem;
      border-radius: var(--border-radius);
      min-width: 80px;
    }

    .timer-number {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-blue);
    }

    .timer-label {
      display: block;
      font-size: 0.75rem;
      color: var(--gray);
      margin-top: 0.25rem;
    }

    .newsletter-section {
      padding: 4rem 0;
      background: var(--primary-blue);
      color: var(--white);
    }

    .newsletter-content {
      text-align: center;
    }

    .newsletter-content h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .newsletter-content p {
      font-size: 1.125rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .newsletter-form {
      display: flex;
      gap: 1rem;
      max-width: 500px;
      margin: 0 auto;
    }

    .newsletter-input {
      flex: 1;
      padding: 1rem;
      border: none;
      border-radius: var(--border-radius);
      font-size: 1rem;
    }

    .newsletter-input:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
    }

    @media (max-width: 768px) {
      .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .hero-images {
        justify-content: center;
      }

      .sale-banner h1 {
        font-size: 2rem;
      }

      .deal-card {
        grid-template-columns: 1fr;
      }

      .newsletter-form {
        flex-direction: column;
      }

      .section-header h2 {
        font-size: 2rem;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  categories: ProductCategory[] = [];
  newArrivals: Product[] = [];
  trendingProducts: Product[] = [];
  bestSellers: Product[] = [];
  dealOfTheDay: Product | null = null;

  constructor(private productService: ProductService) {}

  async ngOnInit(): Promise<void> {
    try {
      await this.loadData();
    } catch (error) {
      console.error('Error loading home data:', error);
    }
  }

  private async loadData(): Promise<void> {
    try {
      // Load categories
      this.categories = await this.productService.getCategories();

      // Load products
      const allProducts = await this.productService.getProducts();
      
      // Filter products by type
      this.newArrivals = allProducts.filter(p => p.isNew).slice(0, 6);
      this.trendingProducts = allProducts.filter(p => p.rating >= 4.5).slice(0, 6);
      this.bestSellers = allProducts.sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 6);
      this.dealOfTheDay = allProducts.find(p => p.isSale) || null;

      // If no categories loaded, create sample data
      if (this.categories.length === 0) {
        this.categories = this.getSampleCategories();
      }

     
    } catch (error) {
      console.error('Error loading data:', error);
      // Fallback to sample data
      this.categories = this.getSampleCategories();
      const sampleProducts = this.getSampleProducts();
      this.newArrivals = sampleProducts.slice(0, 6);
      this.trendingProducts = sampleProducts.slice(6, 12);
      this.dealOfTheDay = sampleProducts[0];
    }
  }

  private getSampleCategories(): ProductCategory[] {
    return [
      {
        id: '1',
        name: "Men's Fashion",
        slug: 'mens-fashion',
        description: 'Latest trends in men\'s clothing',
        image: '/assets/images/mens-fashion.jpg',
        productCount: 45
      },
      {
        id: '2',
        name: "Women's Fashion",
        slug: 'womens-fashion',
        description: 'Stylish women\'s clothing',
        image: '/assets/images/womens-fashion.jpg',
        productCount: 62
      },
      {
        id: '3',
        name: 'High Tech',
        slug: 'high-tech',
        description: 'Latest gadgets and electronics',
        image: '/assets/images/high-tech.jpg',
        productCount: 28
      },
      {
        id: '4',
        name: 'Accessories',
        slug: 'accessories',
        description: 'Complete your look',
        image: '/assets/images/accessories.jpg',
        productCount: 38
      }
    ];
  }

  private getSampleProducts(): Product[] {
    return [
      {
        id: '1',
        name: 'Relaxed Short Full Sleeve',
        description: 'Comfortable short sleeve shirt for everyday wear',
        price: 45,
        originalPrice: 60,
        category: 'Shirts',
        images: ['/assets/images/placeholder.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Blue', 'White', 'Black'],
        inStock: true,
        stockQuantity: 15,
        rating: 4.5,
        reviewCount: 23,
        isNew: true,
        isSale: false,
        tags: ['casual', 'comfort'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: 'Girls Full Embrac Design',
        description: 'Beautiful embroidered design for girls',
        price: 65,
        originalPrice: 85,
        category: 'Dresses',
        images: ['/assets/images/placeholder.jpg'],
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Pink', 'White', 'Purple'],
        inStock: true,
        stockQuantity: 8,
        rating: 4.8,
        reviewCount: 45,
        isNew: false,
        isSale: true,
        discount: 24,
        tags: ['elegant', 'embroidered'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        name: 'Running & Trekking Shoe',
        description: 'High-performance running shoes',
        price: 85,
        originalPrice: 120,
        category: 'Shoes',
        images: ['/assets/images/placeholder.jpg'],
        sizes: ['7', '8', '9', '10', '11'],
        colors: ['Black', 'White', 'Grey'],
        inStock: true,
        stockQuantity: 12,
        rating: 4.6,
        reviewCount: 78,
        isNew: false,
        isSale: false,
        tags: ['sports', 'running'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        name: 'Pocket Watch Leather',
        description: 'Classic leather pocket watch',
        price: 45,
        originalPrice: 65,
        category: 'Watches',
        images: ['/assets/images/placeholder.jpg'],
        sizes: ['One Size'],
        colors: ['Brown', 'Black'],
        inStock: true,
        stockQuantity: 5,
        rating: 4.2,
        reviewCount: 12,
        isNew: true,
        isSale: false,
        tags: ['classic', 'leather'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '5',
        name: 'Sports Clan Women\'s',
        description: 'Comfortable sports wear for women',
        price: 55,
        originalPrice: 75,
        category: 'Sports',
        images: ['/assets/images/placeholder.jpg'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Blue', 'Pink', 'Black'],
        inStock: true,
        stockQuantity: 20,
        rating: 4.7,
        reviewCount: 34,
        isNew: false,
        isSale: true,
        discount: 27,
        tags: ['sports', 'women'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '6',
        name: 'Men\'s Leather Reversible',
        description: 'Reversible leather belt for men',
        price: 35,
        originalPrice: 50,
        category: 'Accessories',
        images: ['/assets/images/placeholder.jpg'],
        sizes: ['32', '34', '36', '38', '40'],
        colors: ['Brown', 'Black'],
        inStock: true,
        stockQuantity: 18,
        rating: 4.4,
        reviewCount: 56,
        isNew: false,
        isSale: false,
        tags: ['leather', 'reversible'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }
}