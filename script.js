/* ==========================================================================
   PORTFOLIO HERO SECTION - SCRIPT CONTROLLER (VANILLA JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // --- Theme Color Loading Logic ---
  const colors = {
    blue: {
      accent: '#2b4bf2',
      hover: '#1735cf',
      blob: 'radial-gradient(circle, rgba(224,130,185,0.7) 0%, rgba(152,89,245,0.4) 50%, rgba(255,255,255,0) 100%)'
    },
    emerald: {
      accent: '#059669',
      hover: '#047857',
      blob: 'radial-gradient(circle, rgba(167,243,208,0.7) 0%, rgba(16,185,129,0.4) 50%, rgba(255,255,255,0) 100%)'
    },
    purple: {
      accent: '#7c3aed',
      hover: '#6d28d9',
      blob: 'radial-gradient(circle, rgba(233,213,255,0.7) 0%, rgba(139,92,246,0.4) 50%, rgba(255,255,255,0) 100%)'
    },
    crimson: {
      accent: '#b91c1c',
      hover: '#991b1b',
      blob: 'radial-gradient(circle, rgba(254,226,226,0.7) 0%, rgba(220,38,38,0.4) 50%, rgba(255,255,255,0) 100%)'
    }
  };

  function applyTheme(colorKey) {
    const config = colors[colorKey];
    if (config) {
      document.documentElement.style.setProperty('--accent-color', config.accent);
      document.documentElement.style.setProperty('--accent-color-hover', config.hover);
      
      // Update all glowing blobs
      const glowingBlobs = document.querySelectorAll('.glowing-blob');
      glowingBlobs.forEach(blob => {
        blob.style.background = config.blob;
      });
    }
  }

  // Load and apply persistent theme from localStorage (default to emerald)
  const savedTheme = localStorage.getItem('selected-theme') || 'emerald';
  applyTheme(savedTheme);

  // Logo hover effect enhancements
  const logoContainer = document.querySelector('.logo-container');
  const logoShape1 = document.getElementById('logoShape1');
  const logoShape2 = document.getElementById('logoShape2');

  if (logoContainer && logoShape1 && logoShape2) {
    logoContainer.addEventListener('mouseenter', () => {
      logoShape1.style.transform = 'rotate(-30deg) scale(1.05)';
      logoShape2.style.transform = 'rotate(30deg) scale(1.05)';
    });

    logoContainer.addEventListener('mouseleave', () => {
      logoShape1.style.transform = 'rotate(-15deg) scale(1)';
      logoShape2.style.transform = 'rotate(15deg) scale(1)';
    });
  }
});
