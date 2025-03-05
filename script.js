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