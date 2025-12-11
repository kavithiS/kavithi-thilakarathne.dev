// Navigation functionality
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    const icon = mobileMenuBtn.querySelector("i");
    if (mobileMenu.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");

      // Close mobile menu if open
      mobileMenu.classList.remove("active");
      const icon = mobileMenuBtn.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");

      if (targetId === "#") {
        // Scroll to top for home link
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        // Scroll to section
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
  });

  // Update active navigation link based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 150; // Offset for fixed navbar
    const navLinks = document.querySelectorAll(".nav-link");

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPos >= sectionTop &&
        scrollPos < sectionTop + sectionHeight
      ) {
        currentSection = sectionId;
      }
    });

    // Special handling for the last section (contact) when near bottom
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollBottom = window.scrollY + windowHeight;

    if (scrollBottom >= documentHeight - 100) {
      currentSection = "contact";
    }

    // Special case for home/top of page
    if (window.scrollY < 50) {
      currentSection = "";
    }

    // Update active states
    navLinks.forEach((link) => link.classList.remove("active"));

    if (currentSection) {
      const activeLink = document.querySelector(
        `.nav-link[href="#${currentSection}"]`
      );
      if (activeLink) {
        activeLink.classList.add("active");
      }
    } else {
      // Home section
      const homeLink = document.querySelector('.nav-link[href="#"]');
      if (homeLink) {
        homeLink.classList.add("active");
      }
    }
  }
}