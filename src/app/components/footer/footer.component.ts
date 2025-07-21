import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4>POPULAR CATEGORIES</h4>
            <ul>
              <li><a href="#">Fashion</a></li>
              <li><a href="#">Electronics</a></li>
              <li><a href="#">Cosmetics</a></li>
              <li><a href="#">Health</a></li>
              <li><a href="#">Watches</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>PRODUCTS</h4>
            <ul>
              <li><a href="#">Prices Drop</a></li>
              <li><a href="#">New Products</a></li>
              <li><a href="#">Best Sales</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Sitemap</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>OUR COMPANY</h4>
            <ul>
              <li><a href="#">Delivery</a></li>
              <li><a href="#">Legal Notice</a></li>
              <li><a href="#">Terms And Conditions</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Secure Payment</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>SERVICES</h4>
            <ul>
              <li><a href="#">Prices Drop</a></li>
              <li><a href="#">New Products</a></li>
              <li><a href="#">Best Sales</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Sitemap</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>CONTACT</h4>
            <div class="contact-info">
              <p>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                419 State 414 Rio Beaver Drive, New York(NY) 14825, USA
              </p>
              <p>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                (607) 936-8058
              </p>
              <p>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Example&#64;Gmail.com
              </p>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2025 Mizora All Rights Reserved. Designed and developed by Ali Riahi</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--dark-gray);
      color: var(--white);
      padding: 3rem 0 1rem;
      margin-top: 4rem;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-section h4 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--white);
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
    }

    .footer-section ul li {
      margin-bottom: 0.5rem;
    }

    .footer-section ul li a {
      color: #adb5bd;
      text-decoration: none;
      font-size: 0.875rem;
      transition: var(--transition);
    }

    .footer-section ul li a:hover {
      color: var(--primary-yellow);
    }

    .contact-info p {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      margin-bottom: 1rem;
      font-size: 0.875rem;
      color: #adb5bd;
    }

    .contact-info svg {
      margin-top: 0.125rem;
      flex-shrink: 0;
    }

    .footer-bottom {
      text-align: center;
      padding-top: 2rem;
      border-top: 1px solid #495057;
      color: #adb5bd;
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .footer {
        padding: 2rem 0 1rem;
      }
    }
  `]
})
export class FooterComponent {}