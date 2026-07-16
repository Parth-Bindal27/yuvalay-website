const faqItems = Array.from(document.querySelectorAll('.faq-item'));
const categoryButtons = Array.from(document.querySelectorAll('.faq-category'));
const searchInput = document.getElementById('faqSearch');
const resultCount = document.getElementById('faqResultCount');
let activeCategory = 'all';
let activeQuery = '';

function filterFaqs() {
    let visibleCount = 0;

    faqItems.forEach((item) => {
        const itemCategory = item.getAttribute('data-category') || 'general';
        const itemText = (item.getAttribute('data-search') || '') + ' ' + item.textContent.toLowerCase();
        const matchesCategory = activeCategory === 'all' || itemCategory === activeCategory;
        const matchesQuery = activeQuery === '' || itemText.includes(activeQuery.toLowerCase());
        const shouldShow = matchesCategory && matchesQuery;

        item.classList.toggle('faq-item-is-hidden', !shouldShow);
        item.classList.toggle('faq-item-is-match', shouldShow && activeQuery !== '' && itemText.includes(activeQuery.toLowerCase()));

        if (shouldShow) {
            visibleCount += 1;
        }
    });

    if (resultCount) {
        resultCount.textContent = visibleCount === 0
            ? 'No matching questions found. Try another keyword.'
            : `Showing ${visibleCount} of ${faqItems.length} questions`;
    }
}

categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
        activeCategory = button.getAttribute('data-category') || 'all';
        categoryButtons.forEach((item) => item.classList.toggle('faq-category-active', item === button));
        filterFaqs();
    });
});

if (searchInput) {
    searchInput.addEventListener('input', (event) => {
        activeQuery = event.target.value.trim();
        filterFaqs();
    });
}

const accordionButtons = Array.from(document.querySelectorAll('.faq-question'));

accordionButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const item = button.closest('.faq-item');
        if (!item) return;

        const isOpen = item.classList.contains('is-open');

        faqItems.forEach((faqItem) => {
            faqItem.classList.remove('is-open');
            const faqButton = faqItem.querySelector('.faq-question');
            if (faqButton) {
                faqButton.setAttribute('aria-expanded', 'false');
            }
        });

        if (!isOpen) {
            item.classList.add('is-open');
            button.setAttribute('aria-expanded', 'true');
        }
    });
});

filterFaqs();
