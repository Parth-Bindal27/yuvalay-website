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