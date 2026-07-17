document.addEventListener("DOMContentLoaded", () => {

    fetch("../../components/navbar.html")

        .then(response => response.text())

        .then(data => {

            document.getElementById("navbar").innerHTML = data;

            initializeNavbar();

        });

});

function initializeNavbar() {

    const hamburger = document.getElementById("hamburger");

    const navMenu = document.getElementById("navMenu");

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        hamburger.textContent =
            navMenu.classList.contains("active") ? "✕" : "☰";

        document.body.style.overflow =
            navMenu.classList.contains("active")
                ? "hidden"
                : "auto";

    });

}

document.addEventListener("DOMContentLoaded", () => {

    const authArea = document.getElementById("authArea");

    if (!authArea) return;

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("yuvalayaUser"));

    if (isLoggedIn === "true" && user) {

        authArea.innerHTML = `
            <div class="profile-menu">

                <button class="profile-btn">

                    <div class="profile-avatar">
                        ${user.name.charAt(0).toUpperCase()}
                    </div>

                </button>

                <div class="profile-dropdown">

                    <div class="profile-info">
                        <strong>${user.name}</strong>
                        <span>${user.email}</span>
                    </div>

                    <hr>

                    <a href="Authentication/dashboard.html">🏠 Dashboard</a>

                    <a href="Authentication/profile.html">👤 My Profile</a>

                    <a href="#" id="logoutBtn">🚪 Logout</a>

                </div>

            </div>
        `;

        document.getElementById("logoutBtn").addEventListener("click", function(e){

            e.preventDefault();

            localStorage.removeItem("isLoggedIn");

            window.location.href = "Authentication/login.html";

        });

    }

});