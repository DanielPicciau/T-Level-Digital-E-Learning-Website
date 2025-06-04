// global.js - cosmic cursor and settings integration for all pages

document.addEventListener('DOMContentLoaded', () => {
    // Ensure cosmic cursor element exists
    let cursor = document.querySelector('.cosmic-cursor');
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.className = 'cosmic-cursor';
        document.body.appendChild(cursor);
    }

    // Ensure settings button exists
    let openSettingsBtn = document.getElementById('openSettings');
    if (!openSettingsBtn) {
        openSettingsBtn = document.createElement('button');
        openSettingsBtn.id = 'openSettings';
        openSettingsBtn.className = 'settings-btn';
        openSettingsBtn.innerHTML = '<i class="fas fa-cog"></i>';
        document.body.appendChild(openSettingsBtn);
    }

    // Ensure container for modal exists
    let settingsContainer = document.getElementById('settingsModalContainer');
    if (!settingsContainer) {
        settingsContainer = document.createElement('div');
        settingsContainer.id = 'settingsModalContainer';
        document.body.appendChild(settingsContainer);
    }

    let mouseMoveListener = null;

    function applyAnimationSetting(isEnabled) {
        const toggleButton = document.getElementById('visualEffectsToggle');
        if (isEnabled) {
            document.body.classList.remove('no-animations');
            if (!mouseMoveListener) {
                mouseMoveListener = (e) => {
                    if (cursor) {
                        cursor.style.left = `${e.clientX}px`;
                        cursor.style.top = `${e.clientY}px`;
                    }
                };
                document.addEventListener('mousemove', mouseMoveListener);
            }
            if (cursor) cursor.style.opacity = '1';
            if (toggleButton) {
                toggleButton.classList.add('active');
                toggleButton.setAttribute('aria-checked', 'true');
                const span = toggleButton.querySelector('span');
                if (span) span.textContent = 'Enabled';
            }
        } else {
            document.body.classList.add('no-animations');
            if (mouseMoveListener) {
                document.removeEventListener('mousemove', mouseMoveListener);
                mouseMoveListener = null;
            }
            if (cursor) cursor.style.opacity = '0';
            if (toggleButton) {
                toggleButton.classList.remove('active');
                toggleButton.setAttribute('aria-checked', 'false');
                const span = toggleButton.querySelector('span');
                if (span) span.textContent = 'Disabled';
            }
        }
    }

    const stored = localStorage.getItem('fancyAnimations');
    const animationsInitiallyEnabled = stored === null || stored === 'true';
    applyAnimationSetting(animationsInitiallyEnabled);

    document.querySelectorAll('a, button, .settings-toggle-btn, .key-term, .collapsible, .quiz-option')
        .forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (!document.body.classList.contains('no-animations') && cursor) {
                    cursor.classList.add('expanded');
                }
            });
            el.addEventListener('mouseleave', () => {
                if (cursor) cursor.classList.remove('expanded');
            });
        });

    function getSettingsPath() {
        const depth = window.location.pathname.split('/').filter(p => p).length - 1;
        return '../'.repeat(depth) + 'settings.html';
    }

    fetch(getSettingsPath())
        .then(resp => resp.text())
        .then(html => {
            settingsContainer.innerHTML = html;
            const settingsModal = document.getElementById('settingsModal');
            const closeBtn = settingsContainer.querySelector('.close-settings');
            const toggleButton = document.getElementById('visualEffectsToggle');
            if (!settingsModal || !closeBtn || !toggleButton) {
                console.error('Settings modal elements not found after fetch.');
                return;
            }

            applyAnimationSetting(animationsInitiallyEnabled);

            openSettingsBtn.addEventListener('click', () => {
                settingsModal.style.display = 'block';
            });
            closeBtn.addEventListener('click', () => {
                settingsModal.style.display = 'none';
            });
            window.addEventListener('click', (evt) => {
                if (evt.target === settingsModal) {
                    settingsModal.style.display = 'none';
                }
            });
            toggleButton.addEventListener('click', function () {
                const currentlyEnabled = this.classList.contains('active');
                const isEnabled = !currentlyEnabled;
                localStorage.setItem('fancyAnimations', isEnabled.toString());
                applyAnimationSetting(isEnabled);
            });
        })
        .catch(err => console.error('Settings load error:', err));
});
