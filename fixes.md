
# Fixes & Improvements

## SEO Tags


Add the following SEO tags to your HTML <head> section:

```html
<meta name="description" content="Lakindu De Silva – QA Engineer portfolio. Manual & automated testing, Playwright, Postman, and more." />
<meta name="keywords" content="QA Portfolio, Lakindu De Silva, Quality Assurance, Software Testing, Playwright, Manual Testing, Automation, lakinduqa.github.io" />
<meta name="author" content="Lakindu De Silva" />
<meta name="google-site-verification" content="dO4eFPMtvHbfTNPqoY8zkGnM1XNC778ci9Ug_Z_XPsU" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://lakinduqa.github.io/" />
<meta property="og:title" content="Lakindu De Silva – QA Engineer Portfolio" />
<meta property="og:description" content="QA Engineer specializing in manual & automated testing, Playwright, Postman, and security testing. Building quality software through comprehensive testing." />
<meta property="og:image" content="https://lakinduqa.github.io/media/profile new.jpeg" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://lakinduqa.github.io/" />
<meta property="twitter:title" content="Lakindu De Silva – QA Engineer Portfolio" />
<meta property="twitter:description" content="QA Engineer specializing in manual & automated testing, Playwright, Postman, and security testing." />
<meta property="twitter:image" content="https://lakinduqa.github.io/media/profile new.jpeg" />

<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'></text></svg>" />

<title>Lakindu De Silva – QA Portfolio</title>

<!-- Structured Data -->
<script type="application/ld+json">
     {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Lakindu De Silva",
          "jobTitle": "QA Engineer",
          "description": "Quality Assurance Engineer specializing in manual and automated testing",
          "url": "https://lakinduqa.github.io/",
          "sameAs": [
               "https://github.com/LakinduQA",
               "https://www.linkedin.com/in/lakindu-de-silva"
          ],
          "knowsAbout": [
               "Software Testing",
               "Test Automation",
               "Playwright",
               "JavaScript",
               "Security Testing",
               "Performance Testing"
          ]
     }
</script>
```

---
## Landing Page

-  Same as the reference website but with QA stats (Playwright test execution and passed in a terminal -> then load to the index)

## Cleanup Instructions

- Remove extra files that are no longer needed (e.g., `portfolio.html`, `demo.html`, etc.)
- Clean the `update` branch after removing unnecessary files.

## Navigation
- **Mobile Nav Bar:** Not working

## UI/UX
- **Mobile View:** "My process (how I work)" section has UI misalignment
- **Move Designation:** Move "QA & Automation Engineer" to the top in mobile view
- **Profile Picture:** Adjust size to avoid showing the footer in the image
- **Font Color Updates:** Change the green color to match the reference website's green color


## Skills Section
- Ensure 26 skills (including GitHub Actions and Docker) match the hosted web version

## Education Card
- Update to:
     - *Currently pursuing HND in Information Systems (2025 - 2026)*
     - *Successfully completed Diploma in Management Information Systems with 4.0 GPA (2024 - 2025)*

## Projects
- **Add New Project:**
     - [Rooster Onboarding Defects](https://github.com/LakinduQA/rooster-onboarding-defects)
     - Detailed bug reports and evidence regarding GraphQL validation failures and UI/UX issues on the Rooster Jobs talent platform

## Articles Section
- **Remove** LinkedIn tag from Medium article

## Articles.html 
- remove the "MCP in Testing" article
- add the first 3 articles of the test automation series:
     1. What Is Test Automation?
     https://medium.com/@lakindudesilva007/what-is-test-automation-e521afd8cbaf

     2. Understanding Automation Scope: What Should You Automate?
     https://medium.com/@lakindudesilva007/understanding-automation-scope-what-should-you-automate-d8be92df2d56

     3. Playwright vs Cypress vs Selenium: Choosing the Right Test Automation Tool in 2025
     https://medium.com/@lakindudesilva007/playwright-vs-cypress-vs-selenium-choosing-the-right-test-automation-tool-in-2025-9e2093d1b2de

## General Text Updates
- Replace all instances of **"LAKINDU_OS"** with **"Lakindu_QA"**
- **Articles & Insights Section:**
     - Change to: "Sharing knowledge with the QA community on Medium." (remove the word "LinkedIn")

## Profile Card Details
**Manual Testing**
- Functional Testing
- Exploratory Testing
- Usability Testing

**Test Automation**
- Playwright Framework
- API Testing
- CI/CD Integration

**Performance Testing**
- Load Testing
- Stress Testing
- Performance Monitoring

## Cards
- Replace "120+ automated tests" card with **"200+ Hands-on QA Hours"**



##

## Next Sprint

- Font animation (decrypting effect)
- Section-based background
- Footer
- X-ray animation (white to green)

