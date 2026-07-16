const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

// ===============================
// HAMBURGER MENU
// ===============================

hamburger.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {

        hamburger.innerHTML = '<i class="ri-close-line"></i>';

        document.body.style.overflow = "hidden";

    } else {

        closeMobileMenu();

    }

});

// ===============================
// MOBILE DROPDOWN
// ===============================

const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

dropdownToggles.forEach(toggle => {

    toggle.addEventListener("click", function (e) {

        if (window.innerWidth <= 992) {

            e.preventDefault();

            const parent = this.parentElement;

            // Close other dropdowns
            document.querySelectorAll(".dropdown").forEach(item => {

                if (item !== parent) {

                    item.classList.remove("active");

                }

            });

            // Toggle current dropdown
            parent.classList.toggle("active");

        }

    });

});

// ===============================
// CLOSE MENU ON LINK CLICK
// ===============================

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    link.addEventListener("click", function (e) {

        // Don't close menu when About is tapped on mobile
        if (
            window.innerWidth <= 992 &&
            this.classList.contains("dropdown-toggle")
        ) {
            return;
        }

        closeMobileMenu();

    });

});

// ===============================
// RESET ON DESKTOP
// ===============================

window.addEventListener("resize", () => {

    if (window.innerWidth > 992) {

        document.querySelectorAll(".dropdown").forEach(item => {

            item.classList.remove("active");

        });

        navMenu.classList.remove("active");

        hamburger.innerHTML = '<i class="ri-menu-3-line"></i>';

        document.body.style.overflow = "auto";

    }

});

// ===============================
// COMMON FUNCTION
// ===============================

function closeMobileMenu() {

    navMenu.classList.remove("active");

    hamburger.innerHTML = '<i class="ri-menu-3-line"></i>';

    document.body.style.overflow = "auto";

    document.querySelectorAll(".dropdown").forEach(item => {

        item.classList.remove("active");

    });

}