import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="profile-page">
      <div class="container">
        <div class="page-header">
          <h1>My Profile</h1>
          <p>Manage your account information</p>
        </div>

        <div class="profile-content" *ngIf="currentUser">
          <div class="profile-sidebar">
            <div class="profile-avatar">
              <div class="avatar-circle">
                <span>{{ getInitials(currentUser.fullName) }}</span>
              </div>
              <h3>{{ currentUser.fullName }}</h3>
              <p>{{ currentUser.email }}</p>
              <span class="user-badge" *ngIf="currentUser.isAdmin">Admin</span>
            </div>

            <nav class="profile-nav">
              <button 
                class="nav-item"
                [class.active]="activeTab === 'profile'"
                (click)="setActiveTab('profile')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Profile Information
              </button>
              
              <button 
                class="nav-item"
                [class.active]="activeTab === 'orders'"
                (click)="setActiveTab('orders')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-6.018"/>
                </svg>
                Order History
              </button>
              
              <button 
                class="nav-item"
                [class.active]="activeTab === 'settings'"
                (click)="setActiveTab('settings')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
                Settings
              </button>
            </nav>
          </div>

          <div class="profile-main">
            <!-- Profile Information Tab -->
            <div class="tab-content" *ngIf="activeTab === 'profile'">
              <div class="content-header">
                <h2>Profile Information</h2>
                <p>Update your personal information</p>
              </div>

              <form class="profile-form" (ngSubmit)="updateProfile()" #profileForm="ngForm">
                <div class="form-group">
                  <label for="fullName" class="form-label">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    class="form-input"
                    [(ngModel)]="profileData.fullName"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    class="form-input"
                    [(ngModel)]="profileData.email"
                    required
                    readonly
                  />
                  <small class="form-help">Email cannot be changed</small>
                </div>

                <div class="form-group">
                  <label class="form-label">Member Since</label>
                  <p class="member-since">{{ currentUser.createdAt | date:'fullDate' }}</p>
                </div>

                <button type="submit" class="btn btn-primary" [disabled]="!profileForm.valid">
                  Update Profile
                </button>
              </form>
            </div>

            <!-- Order History Tab -->
            <div class="tab-content" *ngIf="activeTab === 'orders'">
              <div class="content-header">
                <h2>Order History</h2>
                <p>View your past orders</p>
              </div>

              <div class="orders-list">
                <div class="empty-state">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-6.018"/>
                  </svg>
                  <h3>No orders yet</h3>
                  <p>Start shopping to see your orders here</p>
                  <a routerLink="/products" class="btn btn-primary">Browse Products</a>
                </div>
              </div>
            </div>

            <!-- Settings Tab -->
            <div class="tab-content" *ngIf="activeTab === 'settings'">
              <div class="content-header">
                <h2>Account Settings</h2>
                <p>Manage your account preferences</p>
              </div>

              <div class="settings-section">
                <h3>Notifications</h3>
                <div class="setting-item">
                  <label class="setting-label">
                    <input type="checkbox" [(ngModel)]="settings.emailNotifications">
                    <span class="checkmark"></span>
                    Email notifications
                  </label>
                  <p class="setting-description">Receive updates about your orders via email</p>
                </div>

                <div class="setting-item">
                  <label class="setting-label">
                    <input type="checkbox" [(ngModel)]="settings.promotionalEmails">
                    <span class="checkmark"></span>
                    Promotional emails
                  </label>
                  <p class="setting-description">Receive special offers and promotions</p>
                </div>
              </div>

              <div class="settings-section">
                <h3>Privacy</h3>
                <div class="setting-item">
                  <label class="setting-label">
                    <input type="checkbox" [(ngModel)]="settings.profileVisibility">
                    <span class="checkmark"></span>
                    Public profile
                  </label>
                  <p class="setting-description">Make your profile visible to other users</p>
                </div>
              </div>

              <div class="danger-zone">
                <h3>Danger Zone</h3>
                <button class="btn btn-outline danger-btn" (click)="logout()">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-page {
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

    .profile-content {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 3rem;
    }

    .profile-sidebar {
      background: var(--white);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-sm);
      padding: 2rem;
      height: fit-content;
      position: sticky;
      top: 2rem;
    }

    .profile-avatar {
      text-align: center;
      margin-bottom: 2rem;
    }

    .avatar-circle {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: var(--primary-blue);
      color: var(--white);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 auto 1rem;
    }

    .profile-avatar h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--dark-gray);
      margin-bottom: 0.25rem;
    }

    .profile-avatar p {
      color: var(--gray);
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }

    .user-badge {
      background: var(--primary-yellow);
      color: var(--primary-blue);
      padding: 0.25rem 0.5rem;
      border-radius: var(--border-radius);
      font-size: 0.75rem;
      font-weight: 600;
    }

    .profile-nav {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      background: none;
      border: none;
      border-radius: var(--border-radius);
      color: var(--gray);
      cursor: pointer;
      transition: var(--transition);
      text-align: left;
      width: 100%;
    }

    .nav-item:hover,
    .nav-item.active {
      background: var(--light-gray);
      color: var(--primary-blue);
    }

    .profile-main {
      background: var(--white);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-sm);
      padding: 2rem;
    }

    .content-header {
      margin-bottom: 2rem;
    }

    .content-header h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--dark-gray);
      margin-bottom: 0.5rem;
    }

    .content-header p {
      color: var(--gray);
    }

    .profile-form {
      max-width: 500px;
    }

    .form-group {
      margin-bottom: 1.5rem;
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

    .form-input[readonly] {
      background: var(--light-gray);
      cursor: not-allowed;
    }

    .form-help {
      font-size: 0.875rem;
      color: var(--gray);
      margin-top: 0.25rem;
    }

    .member-since {
      color: var(--gray);
      font-size: 0.875rem;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 0;
      color: var(--gray);
    }

    .empty-state h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--dark-gray);
      margin: 1rem 0 0.5rem;
    }

    .empty-state p {
      margin-bottom: 2rem;
    }

    .settings-section {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid #E9ECEF;
    }

    .settings-section:last-child {
      border-bottom: none;
    }

    .settings-section h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--dark-gray);
      margin-bottom: 1rem;
    }

    .setting-item {
      margin-bottom: 1rem;
    }

    .setting-label {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      font-weight: 500;
      color: var(--dark-gray);
    }

    .setting-label input[type="checkbox"] {
      width: 18px;
      height: 18px;
      accent-color: var(--primary-blue);
    }

    .setting-description {
      font-size: 0.875rem;
      color: var(--gray);
      margin-top: 0.25rem;
      margin-left: 2rem;
    }

    .danger-zone {
      background: rgba(220, 53, 69, 0.05);
      padding: 1.5rem;
      border-radius: var(--border-radius);
      border: 1px solid rgba(220, 53, 69, 0.2);
    }

    .danger-zone h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--danger);
      margin-bottom: 1rem;
    }

    .danger-btn {
      color: var(--danger);
      border-color: var(--danger);
    }

    .danger-btn:hover {
      background: var(--danger);
      color: var(--white);
    }

    @media (max-width: 768px) {
      .profile-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .profile-sidebar {
        position: static;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  activeTab = 'profile';
  
  profileData = {
    fullName: '',
    email: ''
  };

  settings = {
    emailNotifications: true,
    promotionalEmails: false,
    profileVisibility: false
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.profileData = {
          fullName: user.fullName,
          email: user.email
        };
      }
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  updateProfile(): void {
    // Implement profile update logic
    console.log('Updating profile:', this.profileData);
  }

  logout(): void {
    this.authService.logout();
  }
}