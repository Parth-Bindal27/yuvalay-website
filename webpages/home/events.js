const events = [

    {
        id: 1,
        title: "Tree Plantation Drive",
        status: "Registration Open",
        date: "18 July 2026",
        location: "Vadodara",
        image: "../../images/events/event1.png",
        description: "Join us in making our city greener and creating a sustainable future together.",
        register: "#",
        readMore: "events.html"
    },

    {
        id: 2,
        title: "Blood Donation Camp",
        status: "Upcoming",
        date: "22 July 2026",
        location: "Vadodara",
        image: "../../images/events/event2.png",
        description: "Donate blood and become a hero by helping those who need it the most.",
        register: "#",
        readMore: "events.html"
    },

    {
        id: 3,
        title: "Career Guidance Workshop",
        status: "Limited Seats",
        date: "30 July 2026",
        location: "Vadodara",
        image: "../../images/events/event3.png",
        description: "Meet industry experts and discover exciting career opportunities.",
        register: "#",
        readMore: "events.html"
    }

];

const eventsGrid = document.getElementById("eventsGrid");

events.forEach(event => {

    eventsGrid.innerHTML += `

        <div class="event-card">

            <div class="event-image">
                <img src="${event.image}" alt="${event.title}">
            </div>

            <div class="event-content">

                <span class="event-status">
                    ${event.status}
                </span>

                <h3>${event.title}</h3>

                <div class="event-info">

                    <span>📅 ${event.date}</span>

                    <span>📍 ${event.location}</span>

                </div>

                <p class="event-description">

                    ${event.description}

                </p>

                <div class="event-buttons">

                    <a href="${event.register}" class="register-btn">
                        Register Now
                    </a>

                    <a href="${event.readMore}" class="read-btn">
                        Read More →
                    </a>

                </div>

            </div>

        </div>

    `;

});


/* ===================================
        PREMIUM 3D TILT + SPOTLIGHT
=================================== */

const cards = document.querySelectorAll(".event-card");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        /* Spotlight Position */

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);

        /* Tilt */

        const rotateY = ((x / rect.width) - 0.5) * 16;
        const rotateX = ((0.5 - y / rect.height)) * 16;

        card.style.transition = "transform 0.08s linear";

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.03)
        `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transition = "transform .5s ease";

        card.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
        `;

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);

    });

});