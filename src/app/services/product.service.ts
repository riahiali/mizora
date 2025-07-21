import { Injectable } from '@angular/core';
import { Product, ProductCategory } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  private categories: ProductCategory[] = [];

  constructor(private authService: AuthService) {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    // Load from localStorage or initialize with sample data
    const savedProducts = localStorage.getItem('products');
    const savedCategories = localStorage.getItem('categories');

    if (savedProducts) {
      this.products = JSON.parse(savedProducts);
    } else {
      this.products = this.getSampleProducts();
      this.saveProducts();
    }

    if (savedCategories) {
      this.categories = JSON.parse(savedCategories);
    } else {
      this.categories = this.getSampleCategories();
      this.saveCategories();
    }
  }

  private saveProducts(): void {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  private saveCategories(): void {
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  async getProducts(filters?: any): Promise<Product[]> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let filteredProducts = [...this.products];

      if (filters) {
        if (filters.category) {
          filteredProducts = filteredProducts.filter(p => 
            p.category.toLowerCase().includes(filters.category.toLowerCase())
          );
        }
        if (filters.search) {
          filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            p.description.toLowerCase().includes(filters.search.toLowerCase())
          );
        }
        if (filters.minPrice) {
          filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice);
        }
        if (filters.maxPrice) {
          filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice);
        }
      }

      return filteredProducts;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProduct(id: string): Promise<Product> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const product = this.products.find(p => p.id === id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  async getCategories(): Promise<ProductCategory[]> {
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const categoriesWithCounts = this.categories.map(category => ({
      ...category,
      productCount: this.products.filter(p => 
        p.category.toLowerCase() === category.name.toLowerCase()
      ).length
    }));

    console.log('Categories with image paths:', categoriesWithCounts); // Debug log
    return categoriesWithCounts;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}


  async createProduct(productData: Partial<Product>): Promise<Product> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newProduct: Product = {
        id: Date.now().toString(),
        name: productData.name || '',
        description: productData.description || '',
        price: productData.price || 0,
        originalPrice: productData.originalPrice,
        category: productData.category || '',
        images: productData.images || ['/assets/images/placeholder.jpg'],
        sizes: productData.sizes || ['S', 'M', 'L', 'XL'],
        colors: productData.colors || ['Black', 'White'],
        inStock: productData.inStock !== undefined ? productData.inStock : true,
        stockQuantity: productData.stockQuantity || 0,
        rating: productData.rating || 0,
        reviewCount: productData.reviewCount || 0,
        isNew: productData.isNew || false,
        isSale: productData.isSale || false,
        discount: productData.discount,
        tags: productData.tags || [],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      this.products.push(newProduct);
      this.saveProducts();
      
      return newProduct;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

   async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = this.products.findIndex(p => p.id === id);
      if (index === -1) {
        throw new Error('Product not found');
      }

      this.products[index] = {
        ...this.products[index],
        ...productData,
        updatedAt: new Date()
      };

      this.saveProducts();
      return this.products[index];
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const index = this.products.findIndex(p => p.id === id);
      if (index === -1) {
        throw new Error('Product not found');
      }

      this.products.splice(index, 1);
      this.saveProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  async createCategory(categoryData: Partial<ProductCategory>): Promise<ProductCategory> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newCategory: ProductCategory = {
        id: Date.now().toString(),
        name: categoryData.name || '',
        slug: categoryData.slug || categoryData.name?.toLowerCase().replace(/\s+/g, '-') || '',
        description: categoryData.description || '',
        image: categoryData.image || '/assets/images/placeholder.jpg',
        productCount: 0
      };

      this.categories.push(newCategory);
      this.saveCategories();
      
      return newCategory;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  async searchProducts(query: string): Promise<Product[]> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const searchTerm = query.toLowerCase();
      return this.products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
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

  private getSampleCategories(): ProductCategory[] {
    return [
      {
        id: '1',
        name: "Men's Fashion",
        slug: 'mens-fashion',
        description: 'Latest trends in men\'s clothing',
        image: '/assets/images/mens-fashion.jpg',
        productCount: 0
      },
      {
        id: '2',
        name: "Women's Fashion",
        slug: 'womens-fashion',
        description: 'Stylish women\'s clothing',
        image: '/assets/images/womens-fashion.jpg',
        productCount: 0
      },
      {
        id: '3',
        name: 'High Tech',
        slug: 'high-tech',
        description: 'Latest gadgets and electronics',
        image: '/assets/images/high-tech.jpg',
        productCount: 0
      },
      {
        id: '4',
        name: 'Accessories',
        slug: 'accessories',
        description: 'Complete your look',
        image: '/assets/images/accessories.jpg',
        productCount: 0
      }
    ];
  }
}