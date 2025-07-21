import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'en' | 'fr';

export interface Translations {
  [key: string]: {
    en: string;
    fr: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<Language>('en');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  private translations: Translations = {
    // Navigation
    'nav.home': { en: 'Home', fr: 'Accueil' },
    'nav.products': { en: 'Products', fr: 'Produits' },
    'nav.categories': { en: 'Categories', fr: 'Catégories' },
    'nav.about': { en: 'About', fr: 'À propos' },
    'nav.cart': { en: 'Cart', fr: 'Panier' },
    'nav.favorites': { en: 'Favorites', fr: 'Favoris' },
    'nav.profile': { en: 'Profile', fr: 'Profil' },
    'nav.admin': { en: 'Admin', fr: 'Admin' },
    'nav.login': { en: 'Login', fr: 'Connexion' },
    'nav.logout': { en: 'Logout', fr: 'Déconnexion' },

    // Common
    'common.search': { en: 'Search...', fr: 'Rechercher...' },
    'common.add': { en: 'Add', fr: 'Ajouter' },
    'common.edit': { en: 'Edit', fr: 'Modifier' },
    'common.delete': { en: 'Delete', fr: 'Supprimer' },
    'common.save': { en: 'Save', fr: 'Enregistrer' },
    'common.cancel': { en: 'Cancel', fr: 'Annuler' },
    'common.confirm': { en: 'Confirm', fr: 'Confirmer' },
    'common.loading': { en: 'Loading...', fr: 'Chargement...' },
    'common.price': { en: 'Price', fr: 'Prix' },
    'common.quantity': { en: 'Quantity', fr: 'Quantité' },
    'common.total': { en: 'Total', fr: 'Total' },
    'common.name': { en: 'Name', fr: 'Nom' },
    'common.description': { en: 'Description', fr: 'Description' },
    'common.category': { en: 'Category', fr: 'Catégorie' },
    'common.size': { en: 'Size', fr: 'Taille' },
    'common.color': { en: 'Color', fr: 'Couleur' },
    'common.stock': { en: 'Stock', fr: 'Stock' },
    'common.inStock': { en: 'In Stock', fr: 'En stock' },
    'common.outOfStock': { en: 'Out of Stock', fr: 'Rupture de stock' },
    'common.free': { en: 'Free', fr: 'Gratuit' },
    'common.shopNow': { en: 'Shop Now', fr: 'Acheter maintenant' },
    'common.browseProducts': { en: 'Browse Products', fr: 'Parcourir les produits' },

    // Home page
    'home.hero.title': { en: 'SUMMER SALE', fr: 'SOLDES D\'ÉTÉ' },
    'home.hero.subtitle': { en: 'Visit our website for more details', fr: 'Visitez notre site web pour plus de détails' },
    'home.hero.discount': { en: '35% OFF', fr: '35% DE RÉDUCTION' },
    'home.features.delivery': { en: 'Nationwide Delivery', fr: 'Livraison nationale' },
    'home.features.fast': { en: 'Fast Delivery', fr: 'Livraison rapide' },
    'home.features.support': { en: 'Online Customer Support', fr: 'Support client en ligne' },
    'home.features.return': { en: 'Easy Return Policy', fr: 'Politique de retour facile' },
    'home.categories.title': { en: 'Shop by Category', fr: 'Acheter par catégorie' },
    'home.categories.subtitle': { en: 'Discover our wide range of products', fr: 'Découvrez notre large gamme de produits' },
    'home.newArrivals.title': { en: 'New Arrivals', fr: 'Nouveautés' },
    'home.newArrivals.subtitle': { en: 'Check out our latest products', fr: 'Découvrez nos derniers produits' },
    'home.trending.title': { en: 'Trending', fr: 'Tendances' },
    'home.trending.subtitle': { en: 'Popular products this week', fr: 'Produits populaires cette semaine' },
    'home.bestSellers.title': { en: 'Best Sellers', fr: 'Meilleures ventes' },
    'home.bestSellers.subtitle': { en: 'Our most popular products', fr: 'Nos produits les plus populaires' },
    'home.dealOfTheDay.title': { en: 'Deal Of The Day', fr: 'Offre du jour' },
    'home.dealOfTheDay.addToCart': { en: 'ADD TO CART', fr: 'AJOUTER AU PANIER' },
    'home.dealOfTheDay.days': { en: 'DAYS', fr: 'JOURS' },
    'home.dealOfTheDay.hours': { en: 'HOURS', fr: 'HEURES' },
    'home.dealOfTheDay.minutes': { en: 'MINUTES', fr: 'MINUTES' },
    'home.dealOfTheDay.seconds': { en: 'SECONDS', fr: 'SECONDES' },
    'home.newsletter.title': { en: 'Stay Updated', fr: 'Restez informé' },
    'home.newsletter.subtitle': { en: 'Get the latest news and exclusive offers', fr: 'Recevez les dernières nouvelles et offres exclusives' },
    'home.newsletter.placeholder': { en: 'Enter your email', fr: 'Entrez votre email' },
    'home.newsletter.subscribe': { en: 'Subscribe', fr: 'S\'abonner' },

    // Product page
    'product.addToCart': { en: 'Add to Cart', fr: 'Ajouter au panier' },
    'product.addToFavorites': { en: 'Add to Favorites', fr: 'Ajouter aux favoris' },
    'product.removeFromFavorites': { en: 'Remove from Favorites', fr: 'Retirer des favoris' },
    'product.selectSize': { en: 'Select Size', fr: 'Choisir la taille' },
    'product.selectColor': { en: 'Select Color', fr: 'Choisir la couleur' },
    'product.reviews': { en: 'reviews', fr: 'avis' },
    'product.rating': { en: 'Rating', fr: 'Note' },
    'product.details': { en: 'Product Details', fr: 'Détails du produit' },
    'product.itemsInStock': { en: 'items in stock', fr: 'articles en stock' },
    'product.loadingProduct': { en: 'Loading product...', fr: 'Chargement du produit...' },

    // Cart page
    'cart.title': { en: 'Shopping Cart', fr: 'Panier d\'achat' },
    'cart.itemsInCart': { en: 'item(s) in your cart', fr: 'article(s) dans votre panier' },
    'cart.empty': { en: 'Your cart is empty', fr: 'Votre panier est vide' },
    'cart.emptySubtitle': { en: 'Add some products to get started', fr: 'Ajoutez des produits pour commencer' },
    'cart.continueShopping': { en: 'Continue Shopping', fr: 'Continuer les achats' },
    'cart.checkout': { en: 'Proceed to Checkout', fr: 'Procéder au paiement' },
    'cart.remove': { en: 'Remove', fr: 'Supprimer' },
    'cart.subtotal': { en: 'Subtotal', fr: 'Sous-total' },
    'cart.shipping': { en: 'Shipping', fr: 'Livraison' },
    'cart.tax': { en: 'Tax', fr: 'Taxe' },
    'cart.orderSummary': { en: 'Order Summary', fr: 'Résumé de la commande' },
    'cart.whatsapp': { en: 'Order via WhatsApp', fr: 'Commander via WhatsApp' },
    'cart.clearCart': { en: 'Clear Cart', fr: 'Vider le panier' },

    // Favorites page
    'favorites.title': { en: 'My Favorites', fr: 'Mes favoris' },
    'favorites.empty': { en: 'No favorites yet', fr: 'Aucun favori pour le moment' },
    'favorites.emptySubtitle': { en: 'Start adding products to your favorites to see them here', fr: 'Commencez à ajouter des produits à vos favoris pour les voir ici' },

    // Auth
    'auth.login': { en: 'Login', fr: 'Connexion' },
    'auth.register': { en: 'Register', fr: 'S\'inscrire' },
    'auth.email': { en: 'Email', fr: 'Email' },
    'auth.password': { en: 'Password', fr: 'Mot de passe' },
    'auth.fullName': { en: 'Full Name', fr: 'Nom complet' },
    'auth.signIn': { en: 'Sign In', fr: 'Se connecter' },
    'auth.signUp': { en: 'Sign Up', fr: 'S\'inscrire' },
    'auth.forgotPassword': { en: 'Forgot Password?', fr: 'Mot de passe oublié ?' },
    'auth.noAccount': { en: 'Don\'t have an account?', fr: 'Vous n\'avez pas de compte ?' },
    'auth.hasAccount': { en: 'Already have an account?', fr: 'Vous avez déjà un compte ?' },

    // Admin
    'admin.title': { en: 'Admin Panel', fr: 'Panneau d\'administration' },
    'admin.products': { en: 'Products', fr: 'Produits' },
    'admin.users': { en: 'Users', fr: 'Utilisateurs' },
    'admin.categories': { en: 'Categories', fr: 'Catégories' },
    'admin.settings': { en: 'Settings', fr: 'Paramètres' },
    'admin.addProduct': { en: 'Add New Product', fr: 'Ajouter un nouveau produit' },
    'admin.addCategory': { en: 'Add New Category', fr: 'Ajouter une nouvelle catégorie' },
    'admin.productManagement': { en: 'Product Management', fr: 'Gestion des produits' },
    'admin.userManagement': { en: 'User Management', fr: 'Gestion des utilisateurs' },
    'admin.categoryManagement': { en: 'Category Management', fr: 'Gestion des catégories' },
    'admin.storeSettings': { en: 'Store Settings', fr: 'Paramètres du magasin' },
    'admin.whatsappIntegration': { en: 'WhatsApp Integration', fr: 'Intégration WhatsApp' },
    'admin.whatsappNumber': { en: 'WhatsApp Phone Number', fr: 'Numéro de téléphone WhatsApp' },
    'admin.storeInfo': { en: 'Store Information', fr: 'Informations du magasin' },
    'admin.storeName': { en: 'Store Name', fr: 'Nom du magasin' },
    'admin.storeEmail': { en: 'Store Email', fr: 'Email du magasin' },
    'admin.storeAddress': { en: 'Store Address', fr: 'Adresse du magasin' },
    'admin.pricingShipping': { en: 'Pricing & Shipping', fr: 'Prix et livraison' },
    'admin.currency': { en: 'Currency', fr: 'Devise' },
    'admin.taxRate': { en: 'Tax Rate (%)', fr: 'Taux de taxe (%)' },
    'admin.shippingFee': { en: 'Shipping Fee', fr: 'Frais de livraison' },
    'admin.freeShippingThreshold': { en: 'Free Shipping Threshold', fr: 'Seuil de livraison gratuite' },
    'admin.saveSettings': { en: 'Save Settings', fr: 'Enregistrer les paramètres' },
    'admin.accessDenied': { en: 'Access Denied', fr: 'Accès refusé' },
    'admin.noPermission': { en: 'You don\'t have permission to access this page.', fr: 'Vous n\'avez pas la permission d\'accéder à cette page.' },
    'admin.goHome': { en: 'Go Home', fr: 'Aller à l\'accueil' },

    // Footer
    'footer.about': { en: 'About Us', fr: 'À propos de nous' },
    'footer.contact': { en: 'Contact', fr: 'Contact' },
    'footer.privacy': { en: 'Privacy Policy', fr: 'Politique de confidentialité' },
    'footer.terms': { en: 'Terms of Service', fr: 'Conditions d\'utilisation' },
    'footer.followUs': { en: 'Follow Us', fr: 'Suivez-nous' },
    'footer.newsletter': { en: 'Newsletter', fr: 'Newsletter' },
    'footer.subscribe': { en: 'Subscribe', fr: 'S\'abonner' },

    // Messages
    'message.addedToCart': { en: 'Product added to cart', fr: 'Produit ajouté au panier' },
    'message.removedFromCart': { en: 'Product removed from cart', fr: 'Produit retiré du panier' },
    'message.addedToFavorites': { en: 'Added to favorites', fr: 'Ajouté aux favoris' },
    'message.removedFromFavorites': { en: 'Removed from favorites', fr: 'Retiré des favoris' },
    'message.loginSuccess': { en: 'Login successful', fr: 'Connexion réussie' },
    'message.loginError': { en: 'Login failed', fr: 'Échec de la connexion' },
    'message.registerSuccess': { en: 'Registration successful', fr: 'Inscription réussie' },
    'message.registerError': { en: 'Registration failed', fr: 'Échec de l\'inscription' },
    'message.settingsUpdated': { en: 'Settings updated successfully', fr: 'Paramètres mis à jour avec succès' },
    'message.settingsError': { en: 'Failed to update settings', fr: 'Échec de la mise à jour des paramètres' },

    // Product categories
    'category.mensClothing': { en: 'Men\'s Clothing', fr: 'Vêtements pour hommes' },
    'category.womensClothing': { en: 'Women\'s Clothing', fr: 'Vêtements pour femmes' },
    'category.shoes': { en: 'Shoes', fr: 'Chaussures' },
    'category.accessories': { en: 'Accessories', fr: 'Accessoires' },
    'category.electronics': { en: 'Electronics', fr: 'Électronique' },
    'category.sports': { en: 'Sports', fr: 'Sport' },
    'category.beauty': { en: 'Beauty', fr: 'Beauté' },
    'category.home': { en: 'Home & Garden', fr: 'Maison et jardin' },

    // Product descriptions (sample translations)
    'product.desc.relaxedShirt': { 
      en: 'Comfortable short sleeve shirt for everyday wear', 
      fr: 'Chemise à manches courtes confortable pour un usage quotidien' 
    },
    'product.desc.embracDesign': { 
      en: 'Beautiful embroidered design for girls', 
      fr: 'Magnifique design brodé pour filles' 
    },
    'product.desc.runningShoe': { 
      en: 'High-performance running shoes', 
      fr: 'Chaussures de course haute performance' 
    },
    'product.desc.pocketWatch': { 
      en: 'Classic leather pocket watch', 
      fr: 'Montre de poche en cuir classique' 
    },
    'product.desc.sportsWear': { 
      en: 'Comfortable sports wear for women', 
      fr: 'Vêtements de sport confortables pour femmes' 
    },
    'product.desc.leatherBelt': { 
      en: 'Reversible leather belt for men', 
      fr: 'Ceinture en cuir réversible pour hommes' 
    }
  };

  constructor() {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      this.currentLanguageSubject.next(savedLanguage);
    }
  }

  get currentLanguage(): Language {
    return this.currentLanguageSubject.value;
  }

  setLanguage(language: Language): void {
    this.currentLanguageSubject.next(language);
    localStorage.setItem('selectedLanguage', language);
  }

  translate(key: string): string {
    const translation = this.translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[this.currentLanguage] || translation.en || key;
  }

  // Helper method for components to get translations reactively
  getTranslation(key: string): string {
    return this.translate(key);
  }
}

