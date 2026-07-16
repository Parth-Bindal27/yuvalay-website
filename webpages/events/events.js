const heroSlides = Array.from(document.querySelectorAll('.events-hero-slide'));
const heroDots = Array.from(document.querySelectorAll('.events-hero-dot'));
const heroTitle = document.getElementById('eventsHeroPanelTitle');
const heroCopy = document.getElementById('eventsHeroPanelCopy');
let heroIndex = 0;
let heroTimer;

const heroCopyMap = [
    {
        title: 'Build, Learn, Lead',
        copy: 'A hands-on experience for young innovators and future makers.'
    },
    {
        title: 'Where Ideas Become Prototypes',
        copy: 'Design immersive workshops that turn curiosity into confidence and capability.'
    },
    {
        title: 'Celebrate Community and Craft',
        copy: 'Connect with mentors, peers and creators in unforgettable gatherings.'
    }
];

function setHeroSlide(index) {
    heroSlides.forEach((slide, slideIndex) => {
        slide.classList.toggle('events-hero-slide-active', slideIndex === index);
    });
    heroDots.forEach((dot, dotIndex) => {
        dot.classList.toggle('events-hero-dot-active', dotIndex === index);
    });
    if (heroTitle) heroTitle.textContent = heroCopyMap[index]?.title || heroCopyMap[0].title;
    if (heroCopy) heroCopy.textContent = heroCopyMap[index]?.copy || heroCopyMap[0].copy;
}

function startHeroSlider() {
    if (heroSlides.length <= 1) return;
    heroTimer = window.setInterval(() => {
        heroIndex = (heroIndex + 1) % heroSlides.length;
        setHeroSlide(heroIndex);
    }, 5000);
}

heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        heroIndex = index;
        setHeroSlide(heroIndex);
        window.clearInterval(heroTimer);
        startHeroSlider();
    });
});

setHeroSlide(heroIndex);
startHeroSlider();

const filterButtons = Array.from(document.querySelectorAll('.events-filter-pill'));
const eventCards = Array.from(document.querySelectorAll('.events-upcoming-card'));

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category') || 'all';
        filterButtons.forEach((item) => item.classList.toggle('events-filter-active', item === button));
        eventCards.forEach((card) => {
            const matches = category === 'all' || card.getAttribute('data-category') === category;
            card.style.display = matches ? 'block' : 'none';
        });
    });
});

const counters = Array.from(document.querySelectorAll('.events-counter-value'));
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const counter = entry.target;
        const target = Number(counter.getAttribute('data-target') || 0);
        let current = 0;
        const step = Math.max(1, Math.floor(target / 40));
        const interval = window.setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                window.clearInterval(interval);
            } else {
                counter.textContent = current;
            }
        }, 24);
        counterObserver.unobserve(counter);
    });
}, { threshold: 0.6 });

counters.forEach((counter) => counterObserver.observe(counter));

const faqItems = Array.from(document.querySelectorAll('.events-faq-item'));
faqItems.forEach((item) => {
    const button = item.querySelector('.events-faq-question');
    if (!button) return;
    button.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        faqItems.forEach((faqItem) => {
            faqItem.classList.remove('is-open');
            const faqButton = faqItem.querySelector('.events-faq-question');
            if (faqButton) faqButton.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
            item.classList.add('is-open');
            button.setAttribute('aria-expanded', 'true');
        }
    });
});

const testimonials = Array.from(document.querySelectorAll('.events-testimonial-card'));
let testimonialIndex = 0;
if (testimonials.length) {
    setInterval(() => {
        testimonials.forEach((item, index) => {
            item.classList.toggle('events-testimonial-active', index === testimonialIndex);
        });
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    }, 5000);
}
