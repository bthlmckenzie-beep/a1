// ClutchParade - Luxury Atelier Interactive Scripts
document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggler (Onyx Dark / Ivory Light)
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const rootElement = document.documentElement;
  const savedTheme = localStorage.getItem('cp_theme') || 'dark';
  rootElement.setAttribute('data-theme', savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = rootElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      rootElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('cp_theme', nextTheme);
    });
  });

  // 2. Mobile Drawer Navigation
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const drawerClose = document.querySelector('.drawer-close');

  if (hamburgerBtn && drawer && drawerOverlay) {
    hamburgerBtn.addEventListener('click', () => {
      drawer.classList.add('active');
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    const closeDrawer = () => {
      drawer.classList.remove('active');
      drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  // 3. Reading Progress Bar
  const progressBar = document.querySelector('.reading-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
      }
    });
  }

  // 4. Accordion FAQ
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 5. Interactive Clutch Silhouette Simulator
  const silhouetteBtns = document.querySelectorAll('[data-silhouette]');
  const finishBtns = document.querySelectorAll('[data-finish]');
  const previewBox = document.querySelector('.preview-graphic');
  const previewLabel = document.querySelector('.preview-label');

  if (previewBox && previewLabel) {
    let currentSil = 'Hard Minaudière';
    let currentFin = '24K Gilded Gold';

    const updatePreview = () => {
      previewLabel.textContent = `${currentSil} • ${currentFin}`;
      if (currentSil.includes('Minaudière')) {
        previewBox.style.borderRadius = '24px';
        previewBox.style.height = '130px';
        previewBox.style.width = '200px';
      } else if (currentSil.includes('Envelope')) {
        previewBox.style.borderRadius = '4px';
        previewBox.style.height = '145px';
        previewBox.style.width = '240px';
      } else if (currentSil.includes('Cylinder')) {
        previewBox.style.borderRadius = '40px';
        previewBox.style.height = '110px';
        previewBox.style.width = '230px';
      }

      if (currentFin.includes('Gold')) {
        previewBox.style.borderColor = '#d4af37';
      } else if (currentFin.includes('Ruthenium')) {
        previewBox.style.borderColor = '#555555';
      } else if (currentFin.includes('Palladium')) {
        previewBox.style.borderColor = '#e0e0e0';
      }
    };

    silhouetteBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        silhouetteBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSil = btn.getAttribute('data-silhouette');
        updatePreview();
      });
    });

    finishBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        finishBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFin = btn.getAttribute('data-finish');
        updatePreview();
      });
    });
  }

  // 6. Live Search & Category Filter on Blog Archive
  const searchInput = document.querySelector('.search-input');
  const filterChips = document.querySelectorAll('.category-filter-chip');
  const blogCards = document.querySelectorAll('.blog-card');

  if (searchInput || filterChips.length > 0) {
    let currentCategory = 'all';
    let currentQuery = '';

    const filterArticles = () => {
      blogCards.forEach(card => {
        const title = (card.querySelector('h3')?.textContent || '').toLowerCase();
        const desc = (card.querySelector('p')?.textContent || '').toLowerCase();
        const cat = (card.getAttribute('data-category') || '').toLowerCase();

        const matchesQuery = !currentQuery || title.includes(currentQuery) || desc.includes(currentQuery);
        const matchesCategory = currentCategory === 'all' || cat === currentCategory;

        if (matchesQuery && matchesCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    };

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentQuery = e.target.value.toLowerCase().trim();
        filterArticles();
      });
    }

    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentCategory = (chip.getAttribute('data-filter') || 'all').toLowerCase();
        filterArticles();
      });
    });
  }

  // 7. Bespoke Modal
  const modalOpenBtns = document.querySelectorAll('.open-bespoke-modal');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalCloseBtn = document.querySelector('.modal-close-btn');

  if (modalOverlay) {
    modalOpenBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modalOverlay.classList.add('active');
      });
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
      });
    }

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }
});