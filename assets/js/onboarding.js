/**
 * Onboarding Page JavaScript
 * Handles the interactive onboarding experience
 */

class OnboardingExperience {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 3;
    this.isAnimating = false;
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.startLoadingSequence();
  }

  bindEvents() {
    // Step indicator clicks
    document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.goToStep(index + 1);
      });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        this.nextStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prevStep();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (this.currentStep === this.totalSteps) {
          this.enterPortfolio();
        } else {
          this.nextStep();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        this.enterPortfolio();
      }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    });

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next step
          this.nextStep();
        } else {
          // Swipe right - previous step
          this.prevStep();
        }
      }
    };

    this.handleSwipe = handleSwipe;
  }

  startLoadingSequence() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.querySelector('.progress-bar');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        progressBar.style.width = '100%';
        clearInterval(loadingInterval);
        
        // Hide loading screen after a short delay
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          this.startOnboarding();
        }, 800);
      } else {
        progressBar.style.width = progress + '%';
      }
    }, 150);
  }

  startOnboarding() {
    // Enable the onboarding container
    const container = document.getElementById('onboardingContainer');
    container.style.display = 'block';
    
    // Animate in the first step
    this.animateStepIn(1);
    
    // Auto-advance after showing the first step for a moment
    setTimeout(() => {
      this.addAutoAdvanceHint();
    }, 3000);
  }

  nextStep() {
    if (this.isAnimating) return;
    
    if (this.currentStep < this.totalSteps) {
      this.goToStep(this.currentStep + 1);
    } else {
      this.enterPortfolio();
    }
  }

  prevStep() {
    if (this.isAnimating || this.currentStep === 1) return;
    
    this.goToStep(this.currentStep - 1);
  }

  goToStep(stepNumber) {
    if (this.isAnimating || stepNumber === this.currentStep) return;
    
    this.isAnimating = true;
    
    // Update step indicators
    this.updateStepIndicators(stepNumber);
    
    // Animate out current step
    const currentStepEl = document.querySelector(`[data-step="${this.currentStep}"]`);
    const nextStepEl = document.querySelector(`[data-step="${stepNumber}"]`);
    
    // Determine animation direction
    const isForward = stepNumber > this.currentStep;
    
    // Animate current step out
    currentStepEl.classList.remove('active');
    currentStepEl.classList.add(isForward ? 'prev' : 'next');
    
    // Setup next step position
    nextStepEl.style.transform = isForward ? 'translateX(100px)' : 'translateX(-100px)';
    nextStepEl.style.opacity = '0';
    
    // Animate next step in
    setTimeout(() => {
      nextStepEl.classList.add('active');
      nextStepEl.style.transform = 'translateX(0)';
      nextStepEl.style.opacity = '1';
      
      // Trigger step-specific animations
      this.animateStepContent(stepNumber);
      
      this.currentStep = stepNumber;
      
      setTimeout(() => {
        this.isAnimating = false;
        // Reset previous step classes
        currentStepEl.classList.remove('prev', 'next');
      }, 800);
    }, 100);
  }

  animateStepIn(stepNumber) {
    const stepEl = document.querySelector(`[data-step="${stepNumber}"]`);
    stepEl.classList.add('active');
    this.animateStepContent(stepNumber);
  }

  animateStepContent(stepNumber) {
    const stepEl = document.querySelector(`[data-step="${stepNumber}"]`);
    
    switch (stepNumber) {
      case 1:
        // Animate hero elements
        this.animateHeroElements(stepEl);
        break;
      case 2:
        // Animate profile section
        this.animateProfileSection(stepEl);
        break;
      case 3:
        // Animate services
        this.animateServicesSection(stepEl);
        break;
    }
  }

  animateHeroElements(stepEl) {
    const titleLines = stepEl.querySelectorAll('.title-line');
    const subtitle = stepEl.querySelector('.hero-subtitle');
    const button = stepEl.querySelector('.cta-button');
    
    // Reset and animate title lines
    titleLines.forEach((line, index) => {
      line.style.opacity = '0';
      line.style.transform = 'translateY(50px)';
      
      setTimeout(() => {
        line.style.transition = 'all 0.8s ease';
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
      }, index * 200);
    });
    
    // Animate subtitle and button
    setTimeout(() => {
      subtitle.style.opacity = '1';
      subtitle.style.transform = 'translateY(0)';
    }, 600);
    
    setTimeout(() => {
      button.style.opacity = '1';
      button.style.transform = 'translateY(0)';
    }, 800);
  }

  animateProfileSection(stepEl) {
    const image = stepEl.querySelector('.profile-image');
    const content = stepEl.querySelector('.profile-content');
    const tags = stepEl.querySelectorAll('.tag');
    
    // Animate image
    setTimeout(() => {
      image.style.transform = 'scale(1)';
      image.style.opacity = '1';
    }, 200);
    
    // Animate content
    setTimeout(() => {
      content.style.opacity = '1';
      content.style.transform = 'translateX(0)';
    }, 400);
    
    // Animate tags
    tags.forEach((tag, index) => {
      setTimeout(() => {
        tag.style.opacity = '1';
        tag.style.transform = 'translateY(0)';
      }, 600 + (index * 100));
    });
  }

  animateServicesSection(stepEl) {
    const cards = stepEl.querySelectorAll('.service-card');
    const title = stepEl.querySelector('.section-title');
    
    // Animate title
    title.style.opacity = '1';
    title.style.transform = 'translateY(0)';
    
    // Animate cards
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 200 + (index * 150));
    });
  }

  updateStepIndicators(activeStep) {
    document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
      indicator.classList.toggle('active', index + 1 === activeStep);
    });
  }

  addAutoAdvanceHint() {
    // Add a subtle pulsing animation to the next button or step indicator
    const button = document.querySelector('.cta-button');
    if (button) {
      button.style.animation = 'pulse 2s ease-in-out infinite';
      
      setTimeout(() => {
        button.style.animation = '';
      }, 4000);
    }
  }

  enterPortfolio() {
    // Animate out the onboarding
    const container = document.getElementById('onboardingContainer');
    
    container.style.transition = 'all 1s ease';
    container.style.opacity = '0';
    container.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      // Redirect to main portfolio
      window.location.href = 'index.html';
    }, 1000);
  }

  // Public methods for button clicks
  handleNextStep() {
    this.nextStep();
  }

  handleEnterPortfolio() {
    this.enterPortfolio();
  }
}

// Global functions for button onclick handlers
function nextStep() {
  if (window.onboardingApp) {
    window.onboardingApp.handleNextStep();
  }
}

function enterPortfolio() {
  if (window.onboardingApp) {
    window.onboardingApp.handleEnterPortfolio();
  }
}

// Initialize the onboarding experience
document.addEventListener('DOMContentLoaded', () => {
  window.onboardingApp = new OnboardingExperience();
});

// Preload main portfolio assets for smooth transition
const preloadAssets = () => {
  const assets = [
    'assets/css/base.css',
    'assets/css/components.css',
    'assets/css/animations.css',
    'assets/js/main.js'
  ];
  
  assets.forEach(asset => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = asset;
    document.head.appendChild(link);
  });
};

// Start preloading after a short delay
setTimeout(preloadAssets, 2000);