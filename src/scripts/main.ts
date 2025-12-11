/**
 * Main application entry point
 * TypeScript version of the core functionality
 */

import type { StatsCounter } from '../types/index.js';

/**
 * Application class to manage core functionality
 */
class LakinduQAApp {
  private initialized: boolean = false;
  private statsCounters: StatsCounter[] = [];

  constructor() {
    this.init();
  }

  /**
   * Initialize the application
   */
  private init(): void {
    if (this.initialized) {return;}

    this.setupEventListeners();
    this.initializeCounters();
    this.initialized = true;

    console.log('LakinduQA Portfolio - Enterprise Version Initialized');
  }

  /**
   * Set up event listeners
   */
  private setupEventListeners(): void {
    document.addEventListener('DOMContentLoaded', () => {
      this.onDOMReady();
    });

    window.addEventListener('load', () => {
      this.onWindowLoad();
    });
  }

  /**
   * Handle DOM ready event
   */
  private onDOMReady(): void {
    // Initialize components when DOM is ready
    this.initializeNavigation();
    this.initializeAnimations();
  }

  /**
   * Handle window load event
   */
  private onWindowLoad(): void {
    // Start animations and counters when everything is loaded
    this.startStatsCounters();
    this.hideLoadingScreen();
  }

  /**
   * Initialize navigation functionality
   */
  private initializeNavigation(): void {
    // This will be implemented with proper navigation logic
    console.log('Navigation initialized');
  }

  /**
   * Initialize animations
   */
  private initializeAnimations(): void {
    // This will be implemented with animation logic
    console.log('Animations initialized');
  }

  /**
   * Initialize stats counters
   */
  private initializeCounters(): void {
    const counterElements = document.querySelectorAll('.counter-number');
    
    counterElements.forEach((element: Element) => {
      const htmlElement = element as HTMLElement;
      const target = parseInt(htmlElement.getAttribute('data-target') || '0');
      
      this.statsCounters.push({
        element: htmlElement,
        target,
        current: 0,
        increment: Math.ceil(target / 100)
      });
    });
  }

  /**
   * Start the stats counters animation
   */
  private startStatsCounters(): void {
    this.statsCounters.forEach(counter => {
      this.animateCounter(counter);
    });
  }

  /**
   * Animate a single counter
   */
  private animateCounter(counter: StatsCounter): void {
    const updateCounter = (): void => {
      if (counter.current < counter.target) {
        counter.current = Math.min(counter.current + counter.increment, counter.target);
        counter.element.textContent = counter.current.toString();
        requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
  }

  /**
   * Hide the loading screen
   */
  private hideLoadingScreen(): void {
    const loadingScreen = document.querySelector('.loading-screen') as HTMLElement;
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }
  }
}

// Initialize the application
new LakinduQAApp();

export default LakinduQAApp;