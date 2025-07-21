import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="about-page">
      <div class="container">
        <!-- Hero Section -->
        <section class="about-hero">
          <div class="hero-content">
            <h1>About MIZORA</h1>
            <p class="hero-subtitle">Dress It. Tech It. Live It.</p>
            <p class="hero-description">
              We're passionate about bringing you the latest in fashion, technology, and lifestyle products. 
              Our mission is to make quality products accessible to everyone, everywhere.
            </p>
          </div>
        </section>

        <!-- Story Section -->
        <section class="story-section">
          <div class="section-content">
            <div class="story-text">
              <h2>Our Story</h2>
              <p>
                Founded with a vision to revolutionize online shopping, MIZORA has grown from a small startup 
                to a trusted e-commerce platform serving customers worldwide. We believe that shopping should 
                be convenient, enjoyable, and accessible to everyone.
              </p>
              <p>
                Our team is dedicated to curating the best products across fashion, technology, and lifestyle 
                categories, ensuring that every item meets our high standards of quality and value.
              </p>
            </div>
            <div class="story-image">
              <img src="/assets/images/our-story.jpg" alt="Our Story">
            </div>
          </div>
        </section>

        <!-- Values Section -->
        <section class="values-section">
          <h2>Our Values</h2>
          <div class="values-grid">
            <div class="value-card">
              <div class="value-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3>Quality First</h3>
              <p>We carefully select every product to ensure it meets our high standards of quality and durability.</p>
            </div>

            <div class="value-card">
              <div class="value-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3>Customer Focused</h3>
              <p>Our customers are at the heart of everything we do. We strive to exceed expectations every day.</p>
            </div>

            <div class="value-card">
              <div class="value-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <h3>Innovation</h3>
              <p>We embrace new technologies and trends to provide the best shopping experience possible.</p>
            </div>

            <div class="value-card">
              <div class="value-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <h3>Reliability</h3>
              <p>You can count on us for fast shipping, secure payments, and excellent customer service.</p>
            </div>
          </div>
        </section>

      

        <!-- Contact Section -->
        <section class="contact-section">
          <div class="contact-content">
            <h2>Get In Touch</h2>
            <p>Have questions or feedback? We'd love to hear from you!</p>
            
            <div class="contact-info">
              <div class="contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>info&#64;mizora.com</span>
              </div>
              
              <div class="contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>+1 (555) 123-4567</span>
              </div>
              
              <div class="contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>123 Commerce Street, Business District, NY 10001</span>
              </div>
            </div>

            <div class="social-links">
              <a href="#" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .about-page {
      padding: 2rem 0;
    }

    .about-hero {
      text-align: center;
      padding: 4rem 0;
      background: linear-gradient(135deg, var(--light-gray) 0%, #f0f4f8 100%);
      margin-bottom: 4rem;
      border-radius: var(--border-radius-xl);
    }

    .hero-content h1 {
      font-size: 3rem;
      font-weight: 700;
      color: var(--primary-blue);
      margin-bottom: 1rem;
    }

    .hero-subtitle {
      font-size: 1.5rem;
      color: var(--primary-yellow);
      font-weight: 600;
      margin-bottom: 1.5rem;
    }

    .hero-description {
      font-size: 1.125rem;
      color: var(--gray);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .story-section {
      margin-bottom: 4rem;
    }

    .section-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
    }

    .story-text h2 {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary-blue);
      margin-bottom: 1.5rem;
    }

    .story-text p {
      color: var(--gray);
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .story-image {
      border-radius: var(--border-radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-md);
    }

    .story-image img {
      width: 100%;
      height: 280px;
      object-fit: cover;
    }

    .values-section {
      margin-bottom: 4rem;
      text-align: center;
    }

    .values-section h2 {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary-blue);
      margin-bottom: 3rem;
    }

    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .value-card {
      background: var(--white);
      padding: 2rem;
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-sm);
      transition: var(--transition);
    }

    .value-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-md);
    }

    .value-icon {
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

    .value-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--dark-gray);
      margin-bottom: 1rem;
    }

    .value-card p {
      color: var(--gray);
      line-height: 1.5;
    }

    .team-section {
      margin-bottom: 4rem;
      text-align: center;
    }

    .team-section h2 {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary-blue);
      margin-bottom: 3rem;
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .team-member {
      background: var(--white);
      padding: 2rem;
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-sm);
    }

    .member-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto 1rem;
    }

    .member-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .team-member h4 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--dark-gray);
      margin-bottom: 0.25rem;
    }

    .member-role {
      color: var(--primary-blue);
      font-weight: 500;
      margin-bottom: 1rem;
    }

    .member-bio {
      color: var(--gray);
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .contact-section {
      background: var(--light-gray);
      padding: 3rem;
      border-radius: var(--border-radius-xl);
      text-align: center;
    }

    .contact-content h2 {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary-blue);
      margin-bottom: 1rem;
    }

    .contact-content > p {
      color: var(--gray);
      margin-bottom: 2rem;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--gray);
    }

    .contact-item svg {
      color: var(--primary-blue);
      flex-shrink: 0;
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }

    .social-link {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--primary-blue);
      color: var(--white);
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: var(--transition);
    }

    .social-link:hover {
      background: var(--primary-yellow);
      color: var(--primary-blue);
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2rem;
      }

      .hero-subtitle {
        font-size: 1.25rem;
      }

      .section-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .contact-info {
        align-items: flex-start;
      }
    }
  `]
})
export class AboutComponent {}