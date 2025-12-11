// Enhanced scroll effects with progress bar and animations
let lastScrollTop = 0;

window.addEventListener("scroll", function () {
  const hero = document.querySelector(".hero");
  const scrollY = window.scrollY;
  const rate = scrollY * -0.5;
  const scrollProgress = document.getElementById("scrollProgress");
  const scrollToTopBtn = document.getElementById("scrollToTop");

  // Parallax effect for hero
  if (hero) {
    hero.style.transform = `translateY(${rate}px)`;
  }

  // Scroll progress bar
  const winHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (scrollY / winHeight) * 100;
  if (scrollProgress) {
    scrollProgress.style.width = scrolled + "%";
  }

  // Show/hide scroll to top button
  if (scrollToTopBtn) {
    if (scrollY > 500) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  }

  // Direction-based animations
  const scrollDirection = scrollY > lastScrollTop ? "down" : "up";
  document.body.setAttribute("data-scroll-direction", scrollDirection);
  lastScrollTop = scrollY;
});

// Enhanced Intersection Observer for varied animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -80px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;

      // Add appropriate animation class based on element type
      if (target.classList.contains("test-card")) {
        target.classList.add("scroll-scale", "visible");
      } else if (target.classList.contains("stat-card")) {
        target.classList.add("scroll-slide-left", "visible");
      } else {
        target.classList.add("scroll-fade-in", "visible");
      }

      // Stagger animations for child elements
      const children = target.querySelectorAll(
        ".skill-tag, .test-card, .stat-card"
      );
      children.forEach((child, index) => {
        setTimeout(() => {
          child.style.opacity = "1";
          child.style.transform = "translateY(0)";
        }, index * 100);
      });
    }
  });
}, observerOptions);

// Observe sections and cards for scroll animations
document.addEventListener("DOMContentLoaded", function () {
  const elementsToAnimate = document.querySelectorAll(
    "section, .test-card, .stat-card, .contact-form"
  );

  elementsToAnimate.forEach((element, index) => {
    // Set initial animation state
    if (element.tagName === "SECTION") {
      element.classList.add("scroll-fade-in");
    }

    observer.observe(element);
  });

  // Initialize SQA scroll animations
  initScrollAnimations();
  
  // Make sections visible after a short delay if they're in viewport
  setTimeout(() => {
    document.querySelectorAll('.section-animated').forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        section.classList.add('visible');
      }
    });
  }, 100);
});

// Scroll Animation Observer for SQA sections
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.08, // Sweet spot - trigger when 8% visible
    rootMargin: "0px 0px -30px 0px", // Balanced start distance
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Reduced delay for faster section appearance
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, 30); // Balanced timing - not instant, not slow

        // Trigger specific animations based on section
        const sectionTitle = entry.target.querySelector("h2");
        if (sectionTitle) {
          const title = sectionTitle.textContent;

          if (title.includes("About Me")) {
            // Trigger QA metrics animation with more delay
            setTimeout(() => {
              const metrics =
                entry.target.querySelectorAll(".test-progress");
              metrics.forEach((metric, index) => {
                setTimeout(() => {
                  metric.style.animation =
                    "testRunning 2s ease-in-out forwards";
                }, index * 600); // Increased delay between metrics
              });
            }, 800); // Increased initial delay
          }

          if (title.includes("Technical Skills")) {
            // Only animate the network nodes in the title, no skill tag floating
            setTimeout(() => {
              const nodes =
                entry.target.querySelectorAll(".network-node");
              nodes.forEach((node, index) => {
                setTimeout(() => {
                  node.style.animation =
                    "networkPulse 1s ease-in-out infinite";
                }, index * 200);
              });
            }, 300);
            // Remove any floating animations for skill tags
          }

          if (title.includes("What I Test For")) {
            // Animate test cards with enhanced stagger effect
            const testCards = entry.target.querySelectorAll(".test-card");
            testCards.forEach((card, index) => {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0) scale(1)";
                card.style.animation = `testCardEntrance 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;

                // Add a subtle pulse effect on entrance
                setTimeout(() => {
                  card.style.animation += ", cardPulse 0.3s ease-out";
                }, 800);
              }, index * 120); // Slightly longer stagger for better visual flow
            });
          }
        }
      }
    });
  }, observerOptions);

  // Observe all animated sections with staggered delays
  document
    .querySelectorAll(".section-animated")
    .forEach((section, index) => {
      // Add a CSS custom property for staggered animation delays
      section.style.setProperty("--section-delay", `${index * 0.08}s`); // Balanced stagger timing
      observer.observe(section);
    });
}