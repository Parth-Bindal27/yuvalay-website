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

// ===============================
// AUTHENTICATION NAVBAR
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const authArea = document.getElementById("authArea");

    if (!authArea) return;

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("yuvalayaUser"));

    // ===============================
    // USER NOT LOGGED IN
    // ===============================

    if (isLoggedIn !== "true" || !user) {

        authArea.innerHTML = `

            <a href="Authentication/login.html" class="login-btn">

                Login

            </a>

            <a href="Authentication/signup.html" class="signup-btn">

                Sign Up

            </a>

        `;

        return;

    }

    // ===============================
    // USER LOGGED IN
    // ===============================

    authArea.innerHTML = `

        <div class="profile-menu">

            <button class="profile-btn" id="profileBtn">

                <div class="profile-avatar">

                    ${user.name.charAt(0).toUpperCase()}

                </div>

                <span class="profile-name">

                    ${user.name.split(" ")[0]}

                </span>

                <i class="fa-solid fa-chevron-down"></i>

            </button>

            <div class="profile-dropdown" id="profileDropdown">

                <div class="profile-info">

                    <strong>${user.name}</strong>

                    <span>${user.email}</span>

                </div>

                <hr>

                <a href="Authentication/dashboard.html">

                    <i class="ri-dashboard-line"></i>

                    Dashboard

                </a>

                <a href="Authentication/profile.html">

                    <i class="ri-user-line"></i>

                    My Profile

                </a>

                <a href="#" id="logoutBtn">

                    <i class="ri-logout-box-r-line"></i>

                    Logout

                </a>

            </div>

        </div>

    `;

    // ===============================
    // TOGGLE PROFILE MENU
    // ===============================

    const profileBtn = document.getElementById("profileBtn");

    const profileDropdown = document.getElementById("profileDropdown");

    profileBtn.addEventListener("click", function (e) {

        e.stopPropagation();

        profileDropdown.classList.toggle("show");

    });

    // Close on outside click

    document.addEventListener("click", function () {

        profileDropdown.classList.remove("show");

    });

    profileDropdown.addEventListener("click", function (e) {

        e.stopPropagation();

    });

    // ===============================
    // LOGOUT
    // ===============================

    document.getElementById("logoutBtn").addEventListener("click", function (e) {

        e.preventDefault();

        localStorage.removeItem("isLoggedIn");

        window.location.href = "Authentication/login.html";

    });

});