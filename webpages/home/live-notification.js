const news = [
    "Live Update: Registrations for Yuvalay Summer Camp 2026 are now open.",
    "🌱 Plantation Drive scheduled on 20th July.",
    "❤️ Blood Donation Camp this Sunday from 9:00 AM.",
    "🎓 Scholarship applications close on 30th July.",
    "📸 New event photos have been uploaded.",
    "🤝 Volunteer recruitment is now open.",
    "🏆 Congratulations to all competition winners!"
];

const liveText = document.getElementById("liveText");

let current = 0;

function changeNews(){

    liveText.style.opacity = "0";

    setTimeout(()=>{

        current++;

        if(current >= news.length){
            current = 0;
        }

        liveText.textContent = news[current];

        liveText.style.opacity = "1";

    },400);

}

let interval = setInterval(changeNews,3000);

const notification = document.querySelector(".live-notification");

notification.addEventListener("mouseenter",()=>{

    clearInterval(interval);

});

notification.addEventListener("mouseleave",()=>{

    interval = setInterval(changeNews,3000);

});