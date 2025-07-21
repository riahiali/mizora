export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  images: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isSale: boolean;
  discount?: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product; // Reference to the full product
  quantity: number;
  addedAt: Date;
  selectedSize?: string;
  selectedColor?: string;
}

export interface FavoriteItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: Date;
}