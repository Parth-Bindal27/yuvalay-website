const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {

        hamburger.innerHTML = '<i class="ri-close-line"></i>';

        document.body.style.overflow = "hidden";

    } else {

        hamburger.innerHTML = '<i class="ri-menu-3-line"></i>';

        document.body.style.overflow = "auto";

    }

});

/* Close menu when a link is clicked */

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        hamburger.innerHTML = '<i class="ri-menu-3-line"></i>';

        document.body.style.overflow = "auto";

    });

});