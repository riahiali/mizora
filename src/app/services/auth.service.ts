import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private baseUrl = 'http://localhost:3000/api';

  constructor() {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in production, replace with actual API call
      if (credentials.email && credentials.password) {
        const mockUser: User = {
          id: '1',
          fullName: 'Demo User',
          email: credentials.email,
          isAdmin: credentials.email === 'admin@mizora.com',
          createdAt: new Date()
        };
        
        const mockResponse: AuthResponse = {
          user: mockUser,
          token: 'mock-jwt-token-' + Date.now()
        };
        
        localStorage.setItem('token', mockResponse.token);
        localStorage.setItem('user', JSON.stringify(mockResponse.user));
        this.currentUserSubject.next(mockResponse.user);
        
        return mockResponse;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    }
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration - in production, replace with actual API call
      if (userData.email && userData.password && userData.fullName) {
        const mockUser: User = {
          id: '2',
          fullName: userData.fullName,
          email: userData.email,
          isAdmin: false,
          createdAt: new Date()
        };
        
        const mockResponse: AuthResponse = {
          user: mockUser,
          token: 'mock-jwt-token-' + Date.now()
        };
        
        localStorage.setItem('token', mockResponse.token);
        localStorage.setItem('user', JSON.stringify(mockResponse.user));
        this.currentUserSubject.next(mockResponse.user);
        
        return mockResponse;
      } else {
        throw new Error('Invalid registration data');
      }
    } catch (error) {
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  get isAdmin(): boolean {
    return this.currentUserValue?.isAdmin || false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getAuthHeaders(): Headers {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    
    const token = this.getToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  }
}