// =====================================
// LOADER
// =====================================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.display = "none";

        music.play().then(() => {
            musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }).catch(err => {
            console.log("Autoplay blocked by browser:", err);
        });

    }, 1500);

});


// =====================================
// PERSONALIZED GUEST NAME
// Example:
// yourlink.com/?guest=Nimal
// =====================================

const params = new URLSearchParams(window.location.search);

const guest = params.get("guest");


if(guest){

    document.getElementById("guestName").innerHTML =
    "Dear " + guest + ",<br>You are warmly invited ❤️";

}



// =====================================
// COUNTDOWN TIMER
// =====================================


// Change your wedding date here

const weddingDate = new Date(
    "December 25, 2026 10:30:00"
).getTime();



const countdown = setInterval(()=>{


    const now = new Date().getTime();


    const distance = weddingDate - now;



    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );


    const hours = Math.floor(
        (distance % (1000*60*60*24))
        /(1000*60*60)
    );


    const minutes = Math.floor(
        (distance % (1000*60*60))
        /(1000*60)
    );


    const seconds = Math.floor(
        (distance % (1000*60))
        /1000
    );



    document.getElementById("days").innerHTML =
    days;


    document.getElementById("hours").innerHTML =
    hours;


    document.getElementById("minutes").innerHTML =
    minutes;


    document.getElementById("seconds").innerHTML =
    seconds;



    if(distance < 0){

        clearInterval(countdown);


        document.querySelector(".count-box")
        .innerHTML =
        "<h2>Our Special Day Has Arrived ❤️</h2>";

    }


},1000);



// =====================================
// BACKGROUND MUSIC
// =====================================


const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const enterBtn = document.getElementById("enterBtn");

music.volume = 0.5;

enterBtn.addEventListener("click", function(){

    music.play();

    musicBtn.innerHTML =
    '<i class="fa-solid fa-pause"></i>';

});

musicBtn.addEventListener("click", ()=>{

    if(music.paused){

        music.play();

        musicBtn.innerHTML =
        '<i class="fa-solid fa-pause"></i>';

    }else{

        music.pause();

        musicBtn.innerHTML =
        '<i class="fa-solid fa-music"></i>';

    }

});

// =====================================
// FALLING GOLD PETALS
// =====================================

function createPetal(){

    const petal = document.createElement("div");

    petal.classList.add("petal");


    petal.style.left =
    Math.random() * 100 + "vw";


    petal.style.animationDuration =
    (Math.random()*5 + 5) + "s";


    petal.style.opacity =
    Math.random();


    document.body.appendChild(petal);



    setTimeout(()=>{

        petal.remove();

    },10000);

}


setInterval(createPetal,500);



// =====================================
// SCROLL REVEAL ANIMATION
// =====================================


const sections =
document.querySelectorAll("section");


function reveal(){

    sections.forEach(section=>{


        const position =
        section.getBoundingClientRect()
        .top;


        const screen =
        window.innerHeight - 100;



        if(position < screen){

            section.classList.add("show");

        }


    });

}


window.addEventListener(
"scroll",
reveal
);


reveal();



// =====================================
// RSVP FORM
// GOOGLE SHEET CONNECTION
// =====================================


// Replace this URL with your
// Google Apps Script Web App URL

const sheetURL =
"https://script.google.com/macros/s/AKfycbwsuIkNAeIZvBO6Kn0DIa4b29xYv7j2ohFGrvp1yVNN7uo4ytt8gcPdu-x-mo16ahwfUA/exec";

const form = document.getElementById("rsvpForm");

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const submitBtn = form.querySelector("button[type='submit']");

        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending...";

        const data = {
            name: document.getElementById("name").value,
            attendance: document.getElementById("attendance").value,
            guests: document.getElementById("guests").value,
            message: document.getElementById("message").value
        };

        try {

            await fetch(sheetURL, {
                method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data)
            });

            Swal.fire({
                icon: "success",
                title: "RSVP Received ❤️",
                text: "Thank you! Your RSVP has been successfully recorded.",
                confirmButtonColor: "#c89b3c",
                background: "#fffdf8"
            });

            form.reset();

        } catch (error) {
                console.error(error);


            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Something went wrong. Please try again."
            });

        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = "Send RSVP";

    });

}

// =====================================
// WEDDING RSVP GOOGLE SHEET
// =====================================


