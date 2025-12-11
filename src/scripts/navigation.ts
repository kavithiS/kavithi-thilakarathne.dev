/**
 * Navigation functionality for the LakinduQA Portfolio
 * TypeScript implementation of navigation features
 */

import type { NavigationItem, ClickHandler } from '../types/index.js';

/**
 * Navigation manager class
 */
export class NavigationManager {
  private mobileMenuOpen: boolean = false;
  private activeSection: string = '';
  private navigationItems: NavigationItem[] = [];

  constructor() {
    this.init();
  }

  /**
   * Initialize navigation functionality
   */
  private init(): void {
    this.setupEventListeners();
    this.initializeNavigationItems();
    this.updateActiveSection();
  }

  /**
   * Set up navigation event listeners
   */
  private setupEventListeners(): void {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', this.toggleMobileMenu.bind(this));
    }

    // Navigation links smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (event: Event) => {
        this.handleNavClick(event as MouseEvent);
      });
    });

    // Update active section on scroll
    window.addEventListener('scroll', this.updateActiveSection.bind(this));
  }

  /**
   * Initialize navigation items
   */
  private initializeNavigationItems(): void {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach((link: Element) => {
      const htmlLink = link as HTMLAnchorElement;
      const href = htmlLink.getAttribute('href') || '';
      const label = htmlLink.textContent || '';
      const id = href.replace('#', '');

      this.navigationItems.push({
        id,
        label,
        href,
        active: false
      });
    });
  }

  /**
   * Toggle mobile menu
   */
  private toggleMobileMenu(): void {
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    this.mobileMenuOpen = !this.mobileMenuOpen;

    if (mobileMenu) {
      mobileMenu.classList.toggle('active', this.mobileMenuOpen);
    }

    body.classList.toggle('mobile-menu-open', this.mobileMenuOpen);
  }

  /**
   * Handle navigation link clicks
   */
  private handleNavClick: ClickHandler = (event: MouseEvent): void => {
    event.preventDefault();

    const target = event.target as HTMLAnchorElement;
    const href = target.getAttribute('href');

    if (href && href.startsWith('#')) {
      const sectionId = href.substring(1);
      this.scrollToSection(sectionId);
      this.setActiveSection(sectionId);

      // Close mobile menu if open
      if (this.mobileMenuOpen) {
        this.toggleMobileMenu();
      }
    }
  };

  /**
   * Scroll to a specific section with smooth animation
   */
  private scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    
    if (section) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const targetPosition = section.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Set the active navigation section
   */
  private setActiveSection(sectionId: string): void {
    this.activeSection = sectionId;

    // Update navigation items
    this.navigationItems.forEach(item => {
      item.active = item.id === sectionId;
    });

    // Update DOM
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link: Element) => {
      const htmlLink = link as HTMLAnchorElement;
      const href = htmlLink.getAttribute('href');
      
      if (href === `#${sectionId}`) {
        htmlLink.classList.add('active');
      } else {
        htmlLink.classList.remove('active');
      }
    });
  }

  /**
   * Update active section based on scroll position
   */
  private updateActiveSection(): void {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section: Element) => {
      const htmlSection = section as HTMLElement;
      const sectionTop = htmlSection.offsetTop;
      const sectionHeight = htmlSection.offsetHeight;
      const sectionId = htmlSection.id;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        if (this.activeSection !== sectionId) {
          this.setActiveSection(sectionId);
        }
      }
    });
  }

  /**
   * Get current active section
   */
  public getActiveSection(): string {
    return this.activeSection;
  }

  /**
   * Get all navigation items
   */
  public getNavigationItems(): NavigationItem[] {
    return [...this.navigationItems];
  }
}

export default NavigationManager;