// Smart Responsive Carousel System
class SmartCarousel {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.track = this.container.querySelector(".carousel-track");
    this.items = this.track.querySelectorAll(".carousel-item");
    this.badges = this.container.querySelectorAll(".carousel-badge");

    // Look for navigation buttons in the parent container (outside the smart carousel container)
    const parentContainer = this.container.parentElement;
    this.prevBtn = parentContainer.querySelector(".carousel-nav.prev");
    this.nextBtn = parentContainer.querySelector(".carousel-nav.next");

    this.currentIndex = 0;
    this.itemsPerView = this.getItemsPerView();
    this.totalItems = this.items.length;

    this.init();
    this.setupEventListeners();
    this.updateVisibility();
  }

  getItemsPerView() {
    const containerWidth = this.container.offsetWidth;
    if (containerWidth >= 1200) return 3;
    if (containerWidth >= 768) return 2;
    return 1;
  }

  init() {
    this.updateCarousel();
    this.updateBadges();
  }

  setupEventListeners() {
    // Badge click handlers
    this.badges.forEach((badge, index) => {
      badge.addEventListener("click", () => {
        this.goToSlide(index);
      });
    });

    // Navigation button handlers
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => {
        this.navigate(-1);
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => {
        this.navigate(1);
      });
    }

    // Window resize handler
    window.addEventListener("resize", () => {
      const oldItemsPerView = this.itemsPerView;
      this.itemsPerView = this.getItemsPerView();

      // Reset current index if items per view changed
      if (oldItemsPerView !== this.itemsPerView) {
        this.currentIndex = 0;
      }

      this.updateCarousel();
      this.updateVisibility();
    });
  }

  updateCarousel() {
    // For single-post navigation, calculate width of one card regardless of screen size
    const containerWidth = this.container.offsetWidth;

    let slideDistance;
    if (this.itemsPerView === 1) {
      // Mobile: each slide should move container width + gap (20px gap on mobile)
      slideDistance = containerWidth + 20;
    } else {
      // Desktop/tablet: calculate with gaps
      const gap = 30;
      const totalGapWidth = (this.itemsPerView - 1) * gap;
      const singleCardWidth =
        (containerWidth - totalGapWidth) / this.itemsPerView;
      slideDistance = singleCardWidth + gap;
    }

    // Move by exactly one card width for smooth single-post navigation
    const translateX = -(this.currentIndex * slideDistance);
    this.track.style.transform = `translateX(${translateX}px)`;
    this.track.style.transition =
      "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"; // Smooth easing

    // Update button visibility
    this.updateVisibility();
  }

  updateBadges() {
    this.badges.forEach((badge, index) => {
      badge.classList.toggle("active", index === this.currentIndex);
    });
  }

  updateVisibility() {
    // Always show navigation if there are more items than can fit on screen
    const needsNavigation = this.totalItems > this.itemsPerView;

    if (this.prevBtn) {
      this.prevBtn.classList.toggle(
        "visible",
        needsNavigation && this.currentIndex > 0
      );
    }

    if (this.nextBtn) {
      // For single-post navigation, check if we can move to the next post
      const maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
      this.nextBtn.classList.toggle(
        "visible",
        needsNavigation && this.currentIndex < maxIndex
      );
    }
  }

  goToSlide(index) {
    // Constrain to valid range for single-post navigation
    const maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
    this.currentIndex = Math.max(0, Math.min(index, maxIndex));
    this.updateCarousel();
    this.updateBadges();
  }

  navigate(direction) {
    if (direction > 0) {
      // Next: move by exactly 1 post regardless of screen size
      const maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
      this.currentIndex = Math.min(this.currentIndex + 1, maxIndex);
    } else {
      // Previous: move by exactly 1 post regardless of screen size
      this.currentIndex = Math.max(this.currentIndex - 1, 0);
    }
    this.updateCarousel();
    this.updateBadges();
  }
}

// Navigation function for buttons
function navigateCarousel(carouselId, direction) {
  if (window.carousels && window.carousels[carouselId]) {
    window.carousels[carouselId].navigate(direction);
  }
}

// Initialize carousels on page load
document.addEventListener("DOMContentLoaded", () => {
  window.carousels = {};

  // Initialize LinkedIn carousel
  if (document.getElementById("linkedinCarousel")) {
    window.carousels["linkedinCarousel"] = new SmartCarousel(
      "linkedinCarousel"
    );
  }

  // Initialize Projects carousel
  if (document.getElementById("projectsCarousel")) {
    window.carousels["projectsCarousel"] = new SmartCarousel(
      "projectsCarousel"
    );
  }

  // Initialize Medium carousel
  if (document.getElementById("mediumCarousel")) {
    window.carousels["mediumCarousel"] = new SmartCarousel(
      "mediumCarousel"
    );
  }
});