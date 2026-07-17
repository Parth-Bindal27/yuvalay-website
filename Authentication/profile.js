/* ==========================================
        YUVALAYA PROFILE
========================================== */

// Check Login
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}

// Get User
const user = JSON.parse(localStorage.getItem("yuvalayaUser"));

// Redirect if no user exists
if (!user) {
    window.location.href = "login.html";
}

// Profile Card
document.getElementById("userName").textContent = user.name;
document.getElementById("userRole").textContent = user.role;

// Personal Information
document.getElementById("profileName").textContent = user.name;
document.getElementById("profileEmail").textContent = user.email;
document.getElementById("profilePhone").textContent = user.phone;
document.getElementById("profileRole").textContent = user.role;
document.getElementById("profileJoined").textContent = user.joined;

// Logout
function logout() {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("isLoggedIn");

        window.location.href = "login.html";

    }

}