/* ===========================================
        YUVALAYA AUTHENTICATION
=========================================== */

// ----------------------------
// SIGN UP
// ----------------------------

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const role = document.getElementById("role").value;

        if (password !== confirmPassword) {

            alert("Passwords do not match.");
            return;

        }

        const user = {

            name,
            email,
            phone,
            password,
            role,
            joined: new Date().toLocaleDateString()

        };

        localStorage.setItem("yuvalayaUser", JSON.stringify(user));

        alert("Account created successfully!");

        window.location.href = "login.html";

    });

}

// ----------------------------
// LOGIN
// ----------------------------

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const user = JSON.parse(localStorage.getItem("yuvalayaUser"));

        if (!user) {

            alert("No account found. Please sign up first.");
            return;

        }

        if (email === user.email && password === user.password) {

            localStorage.setItem("isLoggedIn", "true");

            alert("Login Successful!");

            window.location.href = "../index.html";

        }

        else {

            alert("Invalid email or password.");

        }

    });

}

// ----------------------------
// LOGOUT
// ----------------------------

function logout() {

    localStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";

}