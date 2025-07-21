import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { SettingsService, AppSettings } from '../../services/settings.service';
import { Product, ProductCategory } from '../../models/product.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="admin-page" *ngIf="isAdmin">
      <div class="container">
        <div class="page-header">
          <h1>Admin Panel</h1>
          <p>Manage products and users</p>
        </div>

        <div class="admin-tabs">
          <button 
            class="tab-btn"
            [class.active]="activeTab === 'products'"
            (click)="setActiveTab('products')">
            Products
          </button>
          <button 
            class="tab-btn"
            [class.active]="activeTab === 'users'"
            (click)="setActiveTab('users')">
            Users
          </button>
          <button 
            class="tab-btn"
            [class.active]="activeTab === 'categories'"
            (click)="setActiveTab('categories')">
            Categories
          </button>
          <button 
            class="tab-btn"
            [class.active]="activeTab === 'settings'"
            (click)="setActiveTab('settings')">
            Settings
          </button>
        </div>

        <!-- Products Tab -->
        <div class="tab-content" *ngIf="activeTab === 'products'">
          <div class="content-header">
            <h2>Product Management</h2>
            <button class="btn btn-primary" (click)="showAddProductForm = true">
              Add New Product
            </button>
          </div>

          <!-- Add Product Form -->
          <div class="add-form" *ngIf="showAddProductForm">
            <h3>Add New Product</h3>
            <form (ngSubmit)="addProduct()" #productForm="ngForm">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Product Name</label>
                  <input type="text" class="form-input" [(ngModel)]="newProduct.name" name="name" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Category</label>
                  <input type="text" class="form-input" [(ngModel)]="newProduct.category" name="category" required>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Description</label>
                <textarea class="form-input" [(ngModel)]="newProduct.description" name="description" rows="3" required></textarea>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Price</label>
                  <input type="number" class="form-input" [(ngModel)]="newProduct.price" name="price" step="0.01" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Stock Quantity</label>
                  <input type="number" class="form-input" [(ngModel)]="newProduct.stockQuantity" name="stockQuantity" required>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Product Images</label>
                <div class="image-upload-container">
                  <input type="file" #fileInput class="file-input" multiple accept="image/*" (change)="onImageSelect($event)" id="imageUpload">
                  <label for="imageUpload" class="file-upload-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21,15 16,10 5,21"/>
                    </svg>
                    Choose Images
                  </label>
                  <span class="file-info">{{ selectedFiles.length > 0 ? selectedFiles.length + ' files selected' : 'No files selected' }}</span>
                </div>
                <div class="image-preview" *ngIf="imagePreviewUrls.length > 0">
                  <div class="preview-item" *ngFor="let url of imagePreviewUrls; let i = index">
                    <img [src]="url" alt="Preview">
                    <button type="button" class="remove-btn" (click)="removeImage(i)">×</button>
                  </div>
                </div>
              </div>

              <div class="form-actions">
                <button type="submit" class="btn btn-primary" [disabled]="!productForm.valid">Add Product</button>
                <button type="button" class="btn btn-outline" (click)="cancelAddProduct()">Cancel</button>
              </div>
            </form>
          </div>

          <!-- Edit Product Form -->
          <div class="add-form" *ngIf="showEditProductForm">
            <h3>Edit Product</h3>
            <form (ngSubmit)="updateProduct()" #editProductForm="ngForm">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Product Name</label>
                  <input type="text" class="form-input" [(ngModel)]="editingProduct.name" name="editName" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Category</label>
                  <input type="text" class="form-input" [(ngModel)]="editingProduct.category" name="editCategory" required>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Description</label>
                <textarea class="form-input" [(ngModel)]="editingProduct.description" name="editDescription" rows="3" required></textarea>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Price</label>
                  <input type="number" class="form-input" [(ngModel)]="editingProduct.price" name="editPrice" step="0.01" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Stock Quantity</label>
                  <input type="number" class="form-input" [(ngModel)]="editingProduct.stockQuantity" name="editStockQuantity" required>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Discount (%)</label>
                  <input type="number" class="form-input" [(ngModel)]="editingProduct.discount" name="editDiscount" min="0" max="100" step="1">
                  <small class="form-help">Enter discount percentage (0-100). Leave 0 for no discount.</small>
                </div>
                <div class="form-group">
                  <label class="form-label">Status</label>
                  <select class="form-input" [(ngModel)]="editingProduct.inStock" name="editInStock" (ngModelChange)="onStockStatusChange($event)">
                    <option [value]="true">In Stock</option>
                    <option [value]="false">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Product Images</label>
                <div class="image-upload-container">
                  <input type="file" #editFileInput class="file-input" multiple accept="image/*" (change)="onImageSelect($event)" id="editImageUpload">
                  <label for="editImageUpload" class="file-upload-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21,15 16,10 5,21"/>
                    </svg>
                    Update Images
                  </label>
                  <span class="file-info">{{ selectedFiles.length > 0 ? selectedFiles.length + ' new files selected' : 'No new files selected' }}</span>
                </div>
                <div class="image-preview" *ngIf="imagePreviewUrls.length > 0">
                  <div class="preview-item" *ngFor="let url of imagePreviewUrls; let i = index">
                    <img [src]="url" alt="Preview">
                    <button type="button" class="remove-btn" (click)="removeImage(i)">×</button>
                  </div>
                </div>
              </div>

              <div class="form-actions">
                <button type="submit" class="btn btn-primary" [disabled]="!editProductForm.valid">Update Product</button>
                <button type="button" class="btn btn-outline" (click)="cancelEditProduct()">Cancel</button>
              </div>
            </form>
          </div>

          <!-- Products List -->
          <div class="products-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let product of products">
                  <td>{{ product.name }}</td>
                  <td>{{ product.category }}</td>
                  <td>
                    <div class="price-display">
                      <span class="current-price">{{ product.price.toFixed(2) }} د.ت</span>
                      <span class="original-price" *ngIf="product.originalPrice">{{ product.originalPrice.toFixed(2) }} د.ت</span>
                      <span class="discount-badge" *ngIf="product.discount && product.discount > 0">-{{ product.discount }}%</span>
                    </div>
                  </td>
                  <td>{{ product.stockQuantity }}</td>
                  <td>
                    <span class="status" [class.in-stock]="getInStockStatus(product)" [class.out-of-stock]="!getInStockStatus(product)">
                      {{ getInStockStatus(product) ? 'In Stock' : 'Out of Stock' }}
                    </span>
                  </td>
                  <td>
                    <div class="actions">
                      <button class="btn-icon edit" (click)="editProduct(product)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button class="btn-icon delete" (click)="deleteProduct(product.id)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="3,6 5,6 21,6"/>
                          <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Users Tab -->
        <div class="tab-content" *ngIf="activeTab === 'users'">
          <div class="content-header">
            <h2>User Management</h2>
          </div>

          <div class="users-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let user of users">
                  <td>{{ user.fullName }}</td>
                  <td>{{ user.email }}</td>
                  <td>
                    <span class="role" [class.admin]="user.isAdmin" [class.user]="!user.isAdmin">
                      {{ user.isAdmin ? 'Admin' : 'User' }}
                    </span>
                  </td>
                  <td>{{ user.createdAt | date:'shortDate' }}</td>
                  <td>
                    <div class="actions">
                      <button class="btn-icon delete" (click)="deleteUser(user.id)" [disabled]="user.id === currentUser?.id">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="3,6 5,6 21,6"/>
                          <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Categories Tab -->
        <div class="tab-content" *ngIf="activeTab === 'categories'">
          <div class="content-header">
            <h2>Category Management</h2>
            <button class="btn btn-primary" (click)="showAddCategoryForm = true">
              Add New Category
            </button>
          </div>

          <!-- Add Category Form -->
          <div class="add-form" *ngIf="showAddCategoryForm">
            <h3>Add New Category</h3>
            <form (ngSubmit)="addCategory()" #categoryForm="ngForm">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Category Name</label>
                  <input type="text" class="form-input" [(ngModel)]="newCategory.name" name="name" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Slug</label>
                  <input type="text" class="form-input" [(ngModel)]="newCategory.slug" name="slug" required>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Description</label>
                <textarea class="form-input" [(ngModel)]="newCategory.description" name="description" rows="2" required></textarea>
              </div>

              <div class="form-actions">
                <button type="submit" class="btn btn-primary" [disabled]="!categoryForm.valid">Add Category</button>
                <button type="button" class="btn btn-outline" (click)="cancelAddCategory()">Cancel</button>
              </div>
            </form>
          </div>

          <!-- Categories List -->
          <div class="categories-grid">
            <div class="category-card" *ngFor="let category of categories">
              <h4>{{ category.name }}</h4>
              <p>{{ category.description }}</p>
              <div class="category-stats">
                <span>{{ category.productCount }} products</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Settings Tab -->
        <div class="tab-content" *ngIf="activeTab === 'settings'">
          <div class="content-header">
            <h2>Store Settings</h2>
          </div>

          <div class="settings-form">
            <form (ngSubmit)="updateSettings()" #settingsForm="ngForm">
              <div class="form-section">
                <h3>WhatsApp Integration</h3>
                <div class="form-group">
                  <label class="form-label">WhatsApp Phone Number</label>
                  <input type="text" class="form-input" [(ngModel)]="appSettings.whatsappNumber" name="whatsappNumber" placeholder="+1234567890" required>
                  <small class="form-help">Include country code (e.g., +1234567890)</small>
                </div>
              </div>

              <div class="form-section">
                <h3>Store Information</h3>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Store Name</label>
                    <input type="text" class="form-input" [(ngModel)]="appSettings.storeName" name="storeName" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Store Email</label>
                    <input type="email" class="form-input" [(ngModel)]="appSettings.storeEmail" name="storeEmail" required>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Store Address</label>
                  <textarea class="form-input" [(ngModel)]="appSettings.storeAddress" name="storeAddress" rows="2" required></textarea>
                </div>
              </div>

              <div class="form-section">
                <h3>Pricing & Shipping</h3>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Currency</label>
                    <select class="form-input" [(ngModel)]="appSettings.currency" name="currency" required>
                      <option value="TND">TND (د.ت)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Tax Rate (%)</label>
                    <input type="number" class="form-input" [(ngModel)]="appSettings.taxRate" name="taxRate" step="0.01" min="0" max="1">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Shipping Fee</label>
                    <input type="number" class="form-input" [(ngModel)]="appSettings.shippingFee" name="shippingFee" step="0.01" min="0">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Free Shipping Threshold</label>
                    <input type="number" class="form-input" [(ngModel)]="appSettings.freeShippingThreshold" name="freeShippingThreshold" step="0.01" min="0">
                  </div>
                </div>
              </div>

              <div class="form-actions">
                <button type="submit" class="btn btn-primary" [disabled]="!settingsForm.valid">Save Settings</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="access-denied" *ngIf="!isAdmin">
      <div class="container">
        <div class="denied-content">
          <h1>Access Denied</h1>
          <p>You don't have permission to access this page.</p>
          <a routerLink="/" class="btn btn-primary">Go Home</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-page {
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

    .admin-tabs {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      border-bottom: 2px solid var(--light-gray);
    }

    .tab-btn {
      padding: 1rem 2rem;
      background: none;
      border: none;
      font-size: 1rem;
      font-weight: 500;
      color: var(--gray);
      cursor: pointer;
      transition: var(--transition);
      position: relative;
    }

    .tab-btn.active {
      color: var(--primary-blue);
    }

    .tab-btn.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--primary-blue);
    }

    .content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .content-header h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--dark-gray);
    }

    .add-form {
      background: var(--light-gray);
      padding: 2rem;
      border-radius: var(--border-radius-lg);
      margin-bottom: 2rem;
    }

    .add-form h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--dark-gray);
      margin-bottom: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--dark-gray);
    }

    .form-input {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #E9ECEF;
      border-radius: var(--border-radius);
      font-size: 1rem;
      transition: var(--transition);
    }

    .form-input:focus {
      outline: none;
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 3px rgba(9, 57, 92, 0.1);
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .image-upload-container {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .file-input {
      display: none;
    }

    .file-upload-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background: var(--primary-blue);
      color: var(--white);
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: var(--transition);
    }

    .file-upload-btn:hover {
      background: #07304A;
    }

    .file-info {
      font-size: 0.875rem;
      color: var(--gray);
    }

    .image-preview {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .preview-item {
      position: relative;
      border-radius: var(--border-radius);
      overflow: hidden;
      background: var(--light-gray);
    }

    .preview-item img {
      width: 100%;
      height: 100px;
      object-fit: cover;
    }

    .remove-btn {
      position: absolute;
      top: 0.25rem;
      right: 0.25rem;
      width: 24px;
      height: 24px;
      background: rgba(220, 53, 69, 0.9);
      color: var(--white);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);
    }

    .remove-btn:hover {
      background: var(--danger);
    }

    .settings-form {
      background: var(--white);
      padding: 2rem;
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-sm);
    }

    .form-section {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid #E9ECEF;
    }

    .form-section:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }

    .form-section h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--dark-gray);
      margin-bottom: 1rem;
    }

    .form-help {
      display: block;
      font-size: 0.75rem;
      color: var(--gray);
      margin-top: 0.25rem;
    }

    .products-table,
    .users-table {
      background: var(--white);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-sm);
      overflow: hidden;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #E9ECEF;
    }

    th {
      background: var(--light-gray);
      font-weight: 600;
      color: var(--dark-gray);
    }

    .price-display {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .current-price {
      font-weight: 600;
      color: var(--primary-blue);
    }

    .original-price {
      font-size: 0.875rem;
      color: var(--gray);
      text-decoration: line-through;
    }

    .discount-badge {
      display: inline-block;
      background: var(--danger);
      color: var(--white);
      padding: 0.125rem 0.375rem;
      border-radius: var(--border-radius);
      font-size: 0.75rem;
      font-weight: 600;
      width: fit-content;
    }

    .status {
      padding: 0.25rem 0.5rem;
      border-radius: var(--border-radius);
      font-size: 0.75rem;
      font-weight: 600;
    }

    .status.in-stock {
      background: rgba(40, 167, 69, 0.1);
      color: var(--success);
    }

    .status.out-of-stock {
      background: rgba(220, 53, 69, 0.1);
      color: var(--danger);
    }

    .role {
      padding: 0.25rem 0.5rem;
      border-radius: var(--border-radius);
      font-size: 0.75rem;
      font-weight: 600;
    }

    .role.admin {
      background: var(--primary-yellow);
      color: var(--primary-blue);
    }

    .role.user {
      background: var(--light-gray);
      color: var(--gray);
    }

    .actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn-icon {
      width: 32px;
      height: 32px;
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);
    }

    .btn-icon.edit {
      background: rgba(23, 162, 184, 0.1);
      color: var(--info);
    }

    .btn-icon.edit:hover {
      background: var(--info);
      color: var(--white);
    }

    .btn-icon.delete {
      background: rgba(220, 53, 69, 0.1);
      color: var(--danger);
    }

    .btn-icon.delete:hover:not(:disabled) {
      background: var(--danger);
      color: var(--white);
    }

    .btn-icon:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .category-card {
      background: var(--white);
      padding: 1.5rem;
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-sm);
    }

    .category-card h4 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--dark-gray);
      margin-bottom: 0.5rem;
    }

    .category-card p {
      color: var(--gray);
      margin-bottom: 1rem;
    }

    .category-stats {
      font-size: 0.875rem;
      color: var(--primary-blue);
      font-weight: 500;
    }

    .access-denied {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 80vh;
    }

    .denied-content {
      text-align: center;
    }

    .denied-content h1 {
      font-size: 2rem;
      font-weight: 700;
      color: var(--danger);
      margin-bottom: 1rem;
    }

    .denied-content p {
      color: var(--gray);
      margin-bottom: 2rem;
    }

    @media (max-width: 768px) {
      .admin-tabs {
        flex-direction: column;
      }

      .content-header {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .products-table,
      .users-table {
        overflow-x: auto;
      }
    }
  `]
})
export class AdminComponent implements OnInit {
  isAdmin = false;
  currentUser: User | null = null;
  activeTab = 'products';
  
  products: Product[] = [];
  users: User[] = [];
  categories: ProductCategory[] = [];
  
  showAddProductForm = false;
  showAddCategoryForm = false;
  showEditProductForm = false;
  
  // Image handling properties
  selectedFiles: File[] = [];
  imagePreviewUrls: string[] = [];
  
  // Settings
  appSettings: AppSettings = {
    whatsappNumber: '+21693140134',
    storeName: 'MIZORA',
    storeEmail: 'contact@mizora.com',
    storeAddress: '123 Fashion Street, Style City, SC 12345',
    currency: 'TND',
    taxRate: 0.08,
    shippingFee: 7,
    freeShippingThreshold: 100
  };
  
  newProduct: Partial<Product> = {
    name: '',
    description: '',
    price: 0,
    category: '',
    stockQuantity: 0,
    images: [],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White'],
    inStock: true,
    rating: 0,
    reviewCount: 0,
    isNew: true,
    isSale: false,
    discount: 0,
    tags: []
  };

  editingProduct: Partial<Product> = {};

  newCategory: Partial<ProductCategory> = {
    name: '',
    slug: '',
    description: '',
    image: '/assets/images/placeholder.jpg'
  };

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private settingsService: SettingsService
  ) {}

  async ngOnInit(): Promise<void> {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isAdmin = user?.isAdmin || false;
    });

    this.settingsService.settings$.subscribe(settings => {
      this.appSettings = settings;
    });

    if (this.isAdmin) {
      await this.loadData();
    }
  }

  private async loadData(): Promise<void> {
    try {
      const [products, categories] = await Promise.all([
        this.productService.getProducts(),
        this.productService.getCategories()
      ]);
      
      this.products = products;
      this.categories = categories;
      
      // Load mock users
      this.loadUsers();
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
  }

  private loadUsers(): void {
    // Load users from localStorage or create mock users
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      try {
        this.users = JSON.parse(savedUsers);
      } catch (error) {
        console.error('Error parsing saved users:', error);
        this.users = this.getMockUsers();
        this.saveUsers();
      }
    } else {
      this.users = this.getMockUsers();
      this.saveUsers();
    }
  }

  private saveUsers(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  private getMockUsers(): any[] {
    return [
      {
        id: '1',
        fullName: 'Admin User',
        email: 'admin@mizora.com',
        isAdmin: true,
        createdAt: new Date('2024-01-01')
      },
      {
        id: '2',
        fullName: 'John Doe',
        email: 'john@example.com',
        isAdmin: false,
        createdAt: new Date('2024-02-15')
      },
      {
        id: '3',
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        isAdmin: false,
        createdAt: new Date('2024-03-10')
      },
      {
        id: '4',
        fullName: 'Mike Johnson',
        email: 'mike@example.com',
        isAdmin: false,
        createdAt: new Date('2024-04-05')
      }
    ];
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  // Helper method to ensure proper boolean handling for inStock status
  getInStockStatus(product: Product): boolean {
    // Handle both string and boolean values
    if (typeof product.inStock === 'string') {
      return product.inStock === 'true';
    }
    return Boolean(product.inStock);
  }

  // Handle select change to ensure proper boolean conversion
  onStockStatusChange(value: any): void {
    // Convert string values to boolean
    if (typeof value === 'string') {
      this.editingProduct.inStock = value === 'true';
    } else {
      this.editingProduct.inStock = Boolean(value);
    }
  }

  async addProduct(): Promise<void> {
    try {
      // For now, use placeholder images since we don't have a real upload service
      // In a real application, you would upload the images to a server first
      const imageUrls = this.selectedFiles.length > 0 
        ? this.imagePreviewUrls.map((url, index) => `/assets/images/product-${Date.now()}-${index}.jpg`)
        : ['/assets/images/placeholder.jpg'];
      
      // Add uploaded image URLs to the product
      this.newProduct.images = imageUrls;
      
      await this.productService.createProduct(this.newProduct);
      await this.loadData();
      this.cancelAddProduct();
      
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  }

  cancelAddProduct(): void {
    this.showAddProductForm = false;
    this.selectedFiles = [];
    this.imagePreviewUrls = [];
    this.newProduct = {
      name: '',
      description: '',
      price: 0,
      category: '',
      stockQuantity: 0,
      images: [],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'White'],
      inStock: true,
      rating: 0,
      reviewCount: 0,
      isNew: true,
      isSale: false,
      tags: []
    };
  }

  onImageSelect(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFiles = Array.from(files);
      this.imagePreviewUrls = [];
      
      // Create preview URLs
      for (let file of this.selectedFiles) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviewUrls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.imagePreviewUrls.splice(index, 1);
  }

  editProduct(product: Product): void {
    this.editingProduct = { ...product };
    // Ensure inStock is properly set as boolean
    this.editingProduct.inStock = this.getInStockStatus(product);
    this.showEditProductForm = true;
    this.showAddProductForm = false;
    
    // Load existing images for preview
    this.imagePreviewUrls = [...(product.images || [])];
    this.selectedFiles = [];
  }

  async updateProduct(): Promise<void> {
    try {
      // Ensure inStock is properly set as boolean
      this.editingProduct.inStock = Boolean(this.editingProduct.inStock);
      
      // Calculate original price if discount is applied
      if (this.editingProduct.discount && this.editingProduct.discount > 0) {
        this.editingProduct.isSale = true;
        this.editingProduct.originalPrice = this.editingProduct.price! / (1 - this.editingProduct.discount / 100);
      } else {
        this.editingProduct.isSale = false;
        this.editingProduct.originalPrice = undefined;
        this.editingProduct.discount = 0;
      }

      // Handle image updates
      if (this.selectedFiles.length > 0) {
        const imageUrls = this.selectedFiles.map((file, index) => 
          `/assets/images/product-${Date.now()}-${index}.jpg`
        );
        this.editingProduct.images = [...this.imagePreviewUrls.filter(url => !url.startsWith('blob:')), ...imageUrls];
      } else {
        this.editingProduct.images = this.imagePreviewUrls.filter(url => !url.startsWith('blob:'));
      }

      await this.productService.updateProduct(this.editingProduct.id!, this.editingProduct);
      await this.loadData();
      this.cancelEditProduct();
      
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  }

  cancelEditProduct(): void {
    this.showEditProductForm = false;
    this.editingProduct = {};
    this.selectedFiles = [];
    this.imagePreviewUrls = [];
  }

  async deleteProduct(productId: string): Promise<void> {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await this.productService.deleteProduct(productId);
        await this.loadData();
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again.');
      }
    }
  }

  async deleteUser(userId: string): Promise<void> {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const index = this.users.findIndex(user => user.id === userId);
        if (index !== -1) {
          this.users.splice(index, 1);
          this.saveUsers();
          alert('User deleted successfully!');
        } else {
          alert('User not found.');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please try again.');
      }
    }
  }

  async addCategory(): Promise<void> {
    try {
      await this.productService.createCategory(this.newCategory);
      await this.loadData();
      this.cancelAddCategory();
      alert('Category added successfully!');
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category. Please try again.');
    }
  }

  cancelAddCategory(): void {
    this.showAddCategoryForm = false;
    this.newCategory = {
      name: '',
      slug: '',
      description: '',
      image: '/assets/images/placeholder.jpg'
    };
  }

  async updateSettings(): Promise<void> {
    try {
      await this.settingsService.updateSettings(this.appSettings);
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Failed to update settings. Please try again.');
    }
  }
}