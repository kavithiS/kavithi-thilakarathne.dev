// Main Application JavaScript

// Loading screen
window.addEventListener("load", function () {
  const loading = document.getElementById("loading");
  setTimeout(() => {
    loading.classList.add("hidden");
    // Animate skill progress bars
    animateSkillBars();
    // Initialize navigation (check if function exists first)
    if (typeof initNavigation === 'function') {
      initNavigation();
    }
    // Auto-update stats counters
    updateStatsCounters();
  }, 800);
});

// Auto-update stats based on actual content
function updateStatsCounters() {
  // Count projects - look for test-cards that contain GitHub links (actual projects)
  const projectCards = document.querySelectorAll(
    '.test-card a[href*="github.com"]'
  );
  const projectCount = projectCards.length;

  // Count skills (skill-cards)
  const skillTags = document.querySelectorAll(".skill-card");
  const skillCount = skillTags.length;

  // Calculate months in QA (started May 2025, so about 2-3 months)
  const qaStartDate = new Date("2025-05-01"); // Change to your actual start date
  const currentDate = new Date();
  const monthsDiff = Math.floor(
    (currentDate - qaStartDate) / (1000 * 60 * 60 * 24 * 30.44)
  ); // Average days per month
  const monthsInQA = Math.max(1, monthsDiff); // At least 1 month

  // Update the counters with animation
  animateCounter("projectCount", projectCount, "+");
  animateCounter("skillCount", skillCount, "+");
  animateCounter("monthsCount", monthsInQA, "");
}

// Animate counter with counting effect
function animateCounter(elementId, targetValue, suffix = "") {
  const element = document.getElementById(elementId);
  if (!element) return;

  const startValue = 0;
  const increment = targetValue / 50; // More steps for smoother animation
  let currentValue = startValue;

  // Add counting animation class
  element.classList.add("counting");
  element.style.animation = "counterPulse 0.1s ease-in-out infinite";

  const timer = setInterval(() => {
    currentValue += increment;
    if (currentValue >= targetValue) {
      currentValue = targetValue;
      clearInterval(timer);
      // Remove counting animation when done
      element.classList.remove("counting");
      element.style.animation = "";
      // Add completion effect
      element.style.transform = "scale(1.1)";
      setTimeout(() => {
        element.style.transform = "scale(1)";
      }, 200);
    }
    element.textContent = Math.floor(currentValue) + suffix;
  }, 30); // Faster updates for smoother counting
}

// Animate skill progress bars
function animateSkillBars() {
  // Just add a subtle fade-in without any translateY movement
  const skillTags = document.querySelectorAll(".skill-tag");
  skillTags.forEach((tag, index) => {
    setTimeout(() => {
      tag.style.opacity = "0.8";
      tag.style.transition = "opacity 0.3s ease";

      setTimeout(() => {
        tag.style.opacity = "1";
      }, 50);
    }, index * 20); // Very fast stagger
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Form handling
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      // Add visual feedback for form submission
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Formspree will handle the actual submission and redirect
      // The button will be re-enabled when the page reloads or user returns
    });
  }
});

// Copy email function
function copyEmail() {
  const email = "lakindudesilva007@gmail.com";

  // Modern way using Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        showCopySuccess();
      })
      .catch(() => {
        fallbackCopyTextToClipboard(email);
      });
  } else {
    // Fallback for older browsers
    fallbackCopyTextToClipboard(email);
  }
}

// Fallback copy method
function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
    showCopySuccess();
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
    alert("Email: lakindudesilva007@gmail.com");
  }

  document.body.removeChild(textArea);
}

// Show copy success feedback
function showCopySuccess() {
  const button = event.target.closest("button");
  const originalText = button.innerHTML;
  button.innerHTML = '<i class="fas fa-check"></i> Copied!';
  button.style.background = "#28a745";

  setTimeout(() => {
    button.innerHTML = originalText;
    button.style.background = "#6c757d";
  }, 2000);
}

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Add random terminal effects
function addTerminalEffects() {
  setInterval(() => {
    const terminals = document.querySelectorAll(".terminal-content");
    terminals.forEach((terminal) => {
      if (Math.random() > 0.8) {
        terminal.style.animation = "glitch 0.2s ease-in-out";
        setTimeout(() => {
          terminal.style.animation = "";
        }, 200);
      }
    });
  }, 8000);
}

// Start terminal effects after page load
setTimeout(addTerminalEffects, 3000);