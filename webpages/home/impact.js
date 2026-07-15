const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = parseInt(counter.dataset.target);

        let current = 0;

        // Faster animation on mobile
        const speed = window.innerWidth <= 768 ? 60 : 120;

        const increment = Math.max(1, Math.ceil(target / speed));

        function updateCounter() {

            current += increment;

            if (current < target) {

                counter.textContent = current.toLocaleString();

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target.toLocaleString() + "+";

            }

        }

        updateCounter();

        observer.unobserve(counter);

    });

}, {

    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"

});

counters.forEach(counter => observer.observe(counter));