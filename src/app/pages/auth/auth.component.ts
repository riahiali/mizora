import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest, RegisterRequest } from '../../models/user.model';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-left">
        <div class="brand-section">
          <div class="logo">
            <a routerLink="/" class="logo-link">
              <img src="/assets/images/mizora-logo.jpg" alt="Mizora" class="logo-image">
            </a>
          </div>
          <p class="tagline">Dress It. Tech It. Live It.</p>
        </div>
      </div>

      <div class="auth-right">
        <div class="auth-form-container">
          <div class="auth-tabs">
            <button 
              class="tab-btn" 
              [class.active]="isLogin"
              (click)="setMode(true)">
              Sign In
            </button>
            <button 
              class="tab-btn" 
              [class.active]="!isLogin"
              (click)="setMode(false)">
              Sign Up
            </button>
          </div>

          <form class="auth-form" (ngSubmit)="onSubmit()" #authForm="ngForm">
            <div class="form-group" *ngIf="!isLogin">
              <label for="fullName" class="form-label">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                class="form-input"
                [(ngModel)]="registerData.fullName"
                required
                #fullName="ngModel"
                placeholder="Enter your full name"
              />
              <div class="error-message" *ngIf="fullName.invalid && fullName.touched">
                Full name is required
              </div>
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                class="form-input"
                [(ngModel)]="loginData.email"
                required
                email
                #email="ngModel"
                placeholder="Enter your email"
              />
              <div class="error-message" *ngIf="email.invalid && email.touched">
                Please enter a valid email address
              </div>
            </div>

            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <div class="password-input-container">
                <input
                  [type]="showPassword ? 'text' : 'password'"
                  id="password"
                  name="password"
                  class="form-input"
                  [(ngModel)]="loginData.password"
                  required
                  minlength="6"
                  #password="ngModel"
                  placeholder="Enter your password"
                />
                <button 
                  type="button" 
                  class="toggle-password"
                  (click)="togglePasswordVisibility()"
                  [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path *ngIf="!showPassword" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle *ngIf="!showPassword" cx="12" cy="12" r="3"></circle>
                    <path *ngIf="showPassword" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line *ngIf="showPassword" x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                </button>
              </div>
              <div class="error-message" *ngIf="password.invalid && password.touched">
                Password must be at least 6 characters long
              </div>
            </div>

            <div class="error-message" *ngIf="errorMessage">
              {{ errorMessage }}
            </div>

            <button
              type="submit"
              class="btn btn-primary auth-btn"
              [disabled]="authForm.invalid || loading"
            >
              <span *ngIf="loading" class="spinner"></span>
              {{ isLogin ? 'Sign In' : 'Sign Up' }}
            </button>
          </form>

          <div class="auth-footer">
            <p *ngIf="isLogin">
              Don't have an account? 
              <a href="#" (click)="setMode(false); $event.preventDefault()">Sign Up</a>
            </p>
            <p *ngIf="!isLogin">
              Already have an account? 
              <a href="#" (click)="setMode(true); $event.preventDefault()">Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Main container */
    .auth-container {
      min-height: 100vh;
      display: flex;
    }

    /* Left side with brand */
    .auth-left {
      flex: 1;
      background: linear-gradient(135deg, #1e88e5 0%, #0d47a1 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .brand-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
      max-width: 400px;
      height: 100%;
    }

    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;
    }

    .logo-image {
      max-width: 500px;
      height: auto;
    }

    .tagline {
      font-size: 1.25rem;
      font-weight: 400;
      margin: 0;
      opacity: 0.9;
    }

    /* Right side with form */
    .auth-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
    }

    .auth-form-container {
      width: 100%;
      max-width: 400px;
      padding: 2rem;
    }

    /* Tabs */
    .auth-tabs {
      display: flex;
      margin-bottom: 2rem;
      gap: 1rem;
      border-bottom: 1px solid #eee;
    }

    .tab-btn {
      flex: 1;
      padding: 1rem 0;
      background: none;
      border: none;
      font-size: 1.125rem;
      font-weight: 600;
      color: #666;
      cursor: pointer;
      border-bottom: 3px solid transparent;
      transition: all 0.3s ease;
    }

    .tab-btn.active {
      color: #1e88e5;
      border-bottom: 3px solid #1e88e5;
    }

    /* Form elements */
    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
    }

    /* Password input container */
    .password-input-container {
      position: relative;
    }

    .form-input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: all 0.3s ease;
      padding-right: 40px; /* Space for toggle button */
    }

    .form-input:focus {
      outline: none;
      border-color: #1e88e5;
      box-shadow: 0 0 0 2px rgba(30, 136, 229, 0.2);
    }

    /* Password toggle button */
    .toggle-password {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;
      color: #666;
    }

    .toggle-password:hover {
      color: #1e88e5;
    }

    .toggle-password svg {
      display: block;
    }

    /* Error messages */
    .error-message {
      color: #e53935;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    /* Submit button */
    .auth-btn {
      width: 100%;
      padding: 1rem;
      background: #1e88e5;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
      margin-top: 1rem;
      position: relative;
    }

    .auth-btn:hover {
      background: #1565c0;
    }

    .auth-btn:disabled {
      background: #90caf9;
      cursor: not-allowed;
    }

    /* Loading spinner */
    .spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s ease-in-out infinite;
      margin-right: 8px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Footer links */
    .auth-footer {
      text-align: center;
      margin-top: 1.5rem;
      color: #666;
    }

    .auth-footer a {
      color: #1e88e5;
      text-decoration: none;
      font-weight: 500;
    }

    .auth-footer a:hover {
      text-decoration: underline;
    }

    /* Responsive styles */
    @media (max-width: 768px) {
      .auth-container {
        flex-direction: column;
      }

      .auth-left {
        padding: 2rem 1rem;
        min-height: 200px;
      }

      .auth-right {
        padding: 1rem;
      }

      .logo h1 {
        font-size: 2rem;
      }

      .tagline {
        font-size: 1rem;
      }
    }
  `]
})
export class AuthComponent implements OnInit {
  isLogin = true;
  loading = false;
  errorMessage = '';
  showPassword = false;

  loginData: LoginRequest = {
    email: '',
    password: ''
  };

  registerData: RegisterRequest = {
    fullName: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/']);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  setMode(isLogin: boolean): void {
    this.isLogin = isLogin;
    this.errorMessage = '';
    
    if (isLogin) {
      this.registerData.email = this.loginData.email;
    } else {
      this.loginData.email = this.registerData.email;
    }
  }

  async onSubmit(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';

    try {
      let authResponse;
      if (this.isLogin) {
        authResponse = await this.authService.login(this.loginData);
      } else {
        this.registerData.email = this.loginData.email;
        this.registerData.password = this.loginData.password;
        authResponse = await this.authService.register(this.registerData);
      }

      if (authResponse.user.isAdmin) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
    } catch (error) {
      this.errorMessage = 'Authentication failed. Please try again.';
    } finally {
      this.loading = false;
    }
  }
}