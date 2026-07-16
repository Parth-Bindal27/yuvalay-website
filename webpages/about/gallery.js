const heroSlides = Array.from(document.querySelectorAll('.gallery-hero-slide'));
const heroDots = Array.from(document.querySelectorAll('.gallery-hero-dot'));
const heroTitle = document.getElementById('galleryHeroTitle');
const heroSubtitle = document.getElementById('galleryHeroSubtitle');
let heroIndex = 0;
let heroInterval;

function setHeroSlide(index) {
    heroSlides.forEach((slide, slideIndex) => {
        slide.classList.toggle('gallery-hero-slide-active', slideIndex === index);
        slide.style.setProperty('--gallery-slide-image', `url('${slide.getAttribute('data-image')}')`);
    });
    heroDots.forEach((dot, dotIndex) => dot.classList.toggle('gallery-hero-dot-active', dotIndex === index));
    const activeSlide = heroSlides[index];
    if (heroTitle) heroTitle.textContent = activeSlide?.getAttribute('data-title') || 'Capturing Innovation';
    if (heroSubtitle) heroSubtitle.textContent = activeSlide?.getAttribute('data-subtitle') || 'Every frame holds a story of makers, builders, and bold ideas.';
}

function startHeroSlider() {
    if (heroSlides.length <= 1) return;
    heroInterval = window.setInterval(() => {
        heroIndex = (heroIndex + 1) % heroSlides.length;
        setHeroSlide(heroIndex);
    }, 5000);
}

heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        heroIndex = index;
        setHeroSlide(heroIndex);
        window.clearInterval(heroInterval);
        startHeroSlider();
    });
});

setHeroSlide(heroIndex);
startHeroSlider();

const filterButtons = Array.from(document.querySelectorAll('.gallery-filter'));
const masonryCards = Array.from(document.querySelectorAll('.gallery-masonry-card'));

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        filterButtons.forEach((item) => item.classList.toggle('gallery-filter-active', item === button));
        masonryCards.forEach((card) => {
            const matches = category === 'all' || card.getAttribute('data-category') === category;
            card.classList.toggle('is-hidden', !matches);
            card.classList.toggle('gallery-reveal', matches);
        });
    });
});

const lightbox = document.getElementById('galleryLightbox');
const lightboxImage = document.getElementById('galleryLightboxImage');
const lightboxBadge = document.getElementById('galleryLightboxBadge');
const lightboxTitle = document.getElementById('galleryLightboxTitle');
const lightboxMeta = document.getElementById('galleryLightboxMeta');
const lightboxCounter = document.getElementById('galleryLightboxCounter');
const lightboxThumbs = document.getElementById('galleryLightboxThumbs');
const openButtons = Array.from(document.querySelectorAll('.gallery-open-btn'));
let lightboxIndex = 0;
let lightboxItems = [];

function buildLightboxItems() {
    lightboxItems = masonryCards
        .filter((card) => !card.classList.contains('is-hidden'))
        .map((card) => ({
            image: card.getAttribute('data-image'),
            title: card.getAttribute('data-title'),
            meta: card.getAttribute('data-date'),
            badge: card.querySelector('.gallery-badge')?.textContent || 'Gallery',
            thumb: card.getAttribute('data-image')
        }));
}

function renderLightbox() {
    if (!lightboxItems.length) return;
    const item = lightboxItems[lightboxIndex];
    lightboxImage.src = item.image;
    lightboxImage.alt = item.title;
    lightboxBadge.textContent = item.badge;
    lightboxTitle.textContent = item.title;
    lightboxMeta.textContent = item.meta;
    lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxItems.length}`;
    lightboxThumbs.innerHTML = lightboxItems.map((thumbItem, index) => `<button type="button" aria-label="Preview ${thumbItem.title}" data-thumb-index="${index}"><img src="${thumbItem.thumb}" alt="${thumbItem.title}"></button>`).join('');
}

function openLightbox(index) {
    buildLightboxItems();
    lightboxIndex = index;
    renderLightbox();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

openButtons.forEach((button, index) => {
    button.addEventListener('click', () => openLightbox(index));
});

lightboxThumbs.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-thumb-index]');
    if (!button) return;
    lightboxIndex = Number(button.getAttribute('data-thumb-index'));
    renderLightbox();
});

lightbox.querySelector('.gallery-lightbox-next').addEventListener('click', () => {
    lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
    renderLightbox();
});

lightbox.querySelector('.gallery-lightbox-prev').addEventListener('click', () => {
    lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
    renderLightbox();
});

lightbox.querySelector('.gallery-lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.gallery-lightbox-backdrop').addEventListener('click', closeLightbox);

document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowRight') {
        lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
        renderLightbox();
    }
    if (event.key === 'ArrowLeft') {
        lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
        renderLightbox();
    }
});

const videoButtons = Array.from(document.querySelectorAll('.gallery-video-play'));
const videoModal = document.createElement('div');
videoModal.className = 'gallery-lightbox';
videoModal.innerHTML = '<div class="gallery-lightbox-backdrop" data-close-lightbox="true"></div><div class="gallery-lightbox-shell"><button class="gallery-lightbox-close" type="button" aria-label="Close video"><i class="ri-close-line"></i></button><div class="gallery-lightbox-media"><div style="min-height: 360px; display: grid; place-items: center; padding: 32px; background: linear-gradient(135deg, #0f172a, #16a34a); color: white; text-align: center;"><div><h3 id="galleryVideoTitle">Featured Video</h3><p>Video preview placeholder for the Yuvalay experience.</p></div></div></div></div>';
document.body.appendChild(videoModal);

videoButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const card = button.closest('.gallery-video-card');
        const thumb = card?.querySelector('.gallery-video-thumb');
        const title = thumb?.getAttribute('data-video-title') || 'Featured Video';
        const duration = thumb?.getAttribute('data-video-duration') || '';
        const titleEl = videoModal.querySelector('#galleryVideoTitle');
        if (titleEl) {
            titleEl.textContent = title;
            titleEl.insertAdjacentHTML('afterend', `<p>${duration}</p>`);
        }
        videoModal.classList.add('is-open');
        videoModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });
});

videoModal.querySelector('.gallery-lightbox-close').addEventListener('click', () => {
    videoModal.classList.remove('is-open');
    videoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
});
videoModal.querySelector('.gallery-lightbox-backdrop').addEventListener('click', () => {
    videoModal.classList.remove('is-open');
    videoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
});

const lazyImages = Array.from(document.querySelectorAll('.gallery-lazy-image'));
const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const image = entry.target;
        const src = image.getAttribute('data-src');
        if (src) {
            image.src = src;
            image.removeAttribute('data-src');
        }
        lazyObserver.unobserve(image);
    });
}, { rootMargin: '200px 0px' });

lazyImages.forEach((image) => lazyObserver.observe(image));

const revealItems = Array.from(document.querySelectorAll('.gallery-reveal'));
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

revealItems.forEach((item) => revealObserver.observe(item));

const fallbackPlaceholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"%3E%3Crect width="1200" height="800" fill="%23f3f4f6"/%3E%3Cpath d="M0 0h1200v800H0z" fill="none"/%3E%3Ctext x="50%25" y="50%25" font-size="42" text-anchor="middle" dominant-baseline="middle" fill="%2316a34a" font-family="Inter, Arial, sans-serif"%3EYUVALAY%3C/text%3E%3C/svg%3E';

document.querySelectorAll('img').forEach((img) => {
    img.addEventListener('error', () => {
        if (!img.getAttribute('data-fallback')) {
            img.setAttribute('data-fallback', 'true');
            img.src = fallbackPlaceholder;
        }
    });
});
