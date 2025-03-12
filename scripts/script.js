document.addEventListener('DOMContentLoaded', () => {
    const cosmicCursor = document.createElement('div');
    cosmicCursor.classList.add('cosmic-cursor');
    document.body.appendChild(cosmicCursor);

    // Minimal mouse movement tracking
    document.addEventListener('mousemove', (e) => {
        // Simple cursor movement
        cosmicCursor.style.left = `${e.clientX}px`;
        cosmicCursor.style.top = `${e.clientY}px`;
    });

    // Get all chapter buttons (if on index page)
    const chapterButtons = document.querySelectorAll('.chapter-btn');
    if (chapterButtons.length > 0) {
        // Simplified button interactions
        chapterButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                cosmicCursor.classList.add('expanded');
            });
            button.addEventListener('mouseleave', () => {
                cosmicCursor.classList.remove('expanded');
            });
        });
    }

    // Navigation between chapters
    const navLinks = document.querySelectorAll('.chapter-nav a');
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Optional: Add any pre-navigation logic if needed
                // e.g., saving state, tracking, etc.
            });
        });
    }

    // Optional: Add any interactive elements you want across pages
    // For example, a back-to-top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Example of adding a simple chapter content reveal animation
    const chapterContent = document.querySelector('.chapter-content');
    if (chapterContent) {
        chapterContent.style.opacity = 0;
        setTimeout(() => {
            chapterContent.style.transition = 'opacity 0.5s ease-in';
            chapterContent.style.opacity = 1;
        }, 100);
    }
});

// Initialize interactive elements
function initInteractiveFeatures() {
    // Collapsible sections
    document.querySelectorAll('.collapsible').forEach(item => {
      item.addEventListener('click', function() {
        const content = this.nextElementSibling;
        this.classList.toggle('active');
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
      });
    });
  
    // Diagram controls
    document.querySelectorAll('.diagram-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const diagram = this.closest('.visual-aid');
        diagram.classList.toggle('highlight-mode');
      });
    });
  
    // Tooltip positioning
    document.querySelectorAll('.key-term').forEach(term => {
      term.addEventListener('mousemove', function(e) {
        const tooltip = this.querySelector('::after');
        if(tooltip) {
          tooltip.style.left = `${e.clientX}px`;
          tooltip.style.top = `${e.clientY}px`;
        }
      });
    });
  }
  
  // Initialize when DOM loads
  document.addEventListener('DOMContentLoaded', initInteractiveFeatures);