/* ==========================================================
                    HERO SLIDER
========================================================== */

const heroSlides = document.querySelectorAll(".hero-slide");

let currentSlide = 0;

function showSlide(index){

    heroSlides.forEach(slide=>{

        slide.classList.remove("active");

    });

    heroSlides[index].classList.add("active");

}

function nextSlide(){

    currentSlide++;

    if(currentSlide>=heroSlides.length){

        currentSlide=0;

    }

    showSlide(currentSlide);

}

if(heroSlides.length){

    setInterval(nextSlide,5000);

}


/* ==========================================================
                    COUNTDOWN
========================================================== */

const eventDate = new Date("August 15, 2026 10:00:00").getTime();

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

function updateCountdown(){

    const now = new Date().getTime();

    const distance = eventDate - now;

    if(distance<=0){

        if(days) days.innerHTML="00";
        if(hours) hours.innerHTML="00";
        if(minutes) minutes.innerHTML="00";
        if(seconds) seconds.innerHTML="00";

        return;

    }

    const d = Math.floor(distance/(1000*60*60*24));

    const h = Math.floor((distance%(1000*60*60*24))/(1000*60*60));

    const m = Math.floor((distance%(1000*60*60))/(1000*60));

    const s = Math.floor((distance%(1000*60))/1000);

    if(days) days.innerHTML=d.toString().padStart(2,"0");

    if(hours) hours.innerHTML=h.toString().padStart(2,"0");

    if(minutes) minutes.innerHTML=m.toString().padStart(2,"0");

    if(seconds) seconds.innerHTML=s.toString().padStart(2,"0");

}

updateCountdown();

setInterval(updateCountdown,1000);


/* ==========================================================
                    EVENT FILTER
========================================================== */

const filterButtons = document.querySelectorAll(".filter-btn");

const eventCards = document.querySelectorAll(".event-card");

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const filter = button.textContent.trim().toLowerCase();

        eventCards.forEach(card=>{

            if(filter==="all"){

                card.style.display="block";

                return;

            }

            const badge = card.querySelector(".event-badge");

            if(!badge){

                card.style.display="block";

                return;

            }

            const category = badge.textContent.trim().toLowerCase();

            if(category===filter){

                card.style.display="block";

            }

            else{

                card.style.display="none";

            }

        });

    });

});


/* ==========================================================
                    FAQ
========================================================== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

    const question = item.querySelector(".faq-question");

    question.addEventListener("click",()=>{

        const isOpen = item.classList.contains("active");

        faqItems.forEach(faq=>{

            faq.classList.remove("active");

        });

        if(!isOpen){

            item.classList.add("active");

        }

    });

});


/* ==========================================================
                    SCROLL REVEAL
========================================================== */

const revealElements = document.querySelectorAll(

    ".event-card, .impact-card, .speaker-card, .timeline-item, .testimonial-card, .featured-event-wrapper"

);

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";

            entry.target.style.transform="translateY(0)";

        }

    });

},{

    threshold:0.15

});

revealElements.forEach(element=>{

    element.style.opacity="0";

    element.style.transform="translateY(40px)";

    element.style.transition=".8s ease";

    observer.observe(element);

});


/* ==========================================================
                GALLERY HOVER (OPTIONAL)
========================================================== */

const galleryImages = document.querySelectorAll(".gallery-grid img");

galleryImages.forEach(image=>{

    image.addEventListener("mouseenter",()=>{

        image.style.transform="scale(1.05)";

    });

    image.addEventListener("mouseleave",()=>{

        image.style.transform="scale(1)";

    });

});


/* ==========================================================
                    PARALLAX HERO
========================================================== */

window.addEventListener("scroll",()=>{

    const hero = document.querySelector(".events-hero");

    if(!hero) return;

    hero.style.backgroundPositionY = `${window.scrollY * 0.4}px`;

});