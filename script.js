// =====================================
// LOADER
// =====================================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.display = "none";

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


const music =
document.getElementById("bgMusic");


const musicBtn =
document.getElementById("musicBtn");


let playing = false;



musicBtn.addEventListener("click",()=>{


    if(playing){

        music.pause();

        musicBtn.innerHTML =
        '<i class="fa-solid fa-music"></i>';

        playing=false;


    }else{


        music.play();

        musicBtn.innerHTML =
        '<i class="fa-solid fa-pause"></i>';

        playing=true;

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
"https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";



const form =
document.getElementById("rsvpForm");



if(form){


form.addEventListener("submit",
function(e){


    e.preventDefault();



    const data = {


        name:
        document.getElementById("name").value,


        attendance:
        document.getElementById("attendance").value,


        guests:
        document.getElementById("guests").value,


        meal:
        document.getElementById("meal").value,


        message:
        document.getElementById("message").value


    };



    fetch(sheetURL,{

        method:"POST",

        mode:"no-cors",

        headers:{

            "Content-Type":
            "application/json"

        },

        body:
        JSON.stringify(data)

    })



    .then(()=>{


        alert(
        "Thank you ❤️ Your RSVP has been received!"
        );


        form.reset();


    })



    .catch(()=>{


        alert(
        "Something went wrong. Please try again."
        );


    });



});


}

// =====================================
// WEDDING RSVP GOOGLE SHEET
// =====================================


function doPost(e) {


  const sheet =
  SpreadsheetApp
  .getActiveSpreadsheet()
  .getActiveSheet();



  const data =
  JSON.parse(e.postData.contents);



  sheet.appendRow([


    new Date(),


    data.name,


    data.attendance,


    data.guests,


    data.meal,


    data.message


  ]);



  return ContentService
  .createTextOutput(
    "Success"
  )

  .setMimeType(
    ContentService.MimeType.TEXT
  );


}

