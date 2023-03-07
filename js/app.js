const elSelectsBox = document.querySelector(".selects__box");
const elCounterSelect = document.querySelector(".counter__select");
const elSelection = document.querySelector(".select");
const elScore = document.querySelector(".score");
const elPlayStatusBox = document.querySelector(".play__status");
let elAnswerText = document.querySelector(".answer__txt");
let rand = Math.floor(Math.random() * 20) + 1;
const thirtySings = array.slice(rand, 22);
const fiftySings = array.slice(rand, 77);
const ninethySings = array.slice(rand, 90);
const elStartPage = document.querySelector("#mainblock");
const elForm = document.querySelector(".selectsForm");
const elDataList = document.querySelector(".data__list");
const elDataListFragment = document.createDocumentFragment();
const elAudio = document.querySelector(".audio")
const musics = ["../music/lean.mp3", "../music/name.mp3", "../music/riders.mp3"]
let elVideo = document.querySelector("#vid")
let elConfetti = document.querySelector("#canvas")
const elScoreUp = document.querySelector(".scoreUp")
const elCar = document.querySelector(".carr")
const elModal = document.querySelector(".modall")
const elOverlay = document.querySelector("#overlay")
const elMusicBtn = document.querySelector(".music-btn")
const elWrongScore = document.querySelector(".wrong")
const elWrongLabel = document.querySelector(".wrong-answer")
const elModalTitle = document.querySelector(".modal-tittle")
let wrongAnswer = 0;
let score = 0;
const answersList = [];
let timer;
const elApplause = document.querySelector(".applause")
let evt = new Event('click')




function useState(defaultValue) {
    let value = defaultValue

    function setValue(newValue) {
        value = newValue
    }

    function getValue() {
        return value
    }

    return [getValue, setValue]
}

let [selectedSings, setSelectedSings] = useState(thirtySings)

function RandomBySelectValue(param) {

    let data = param.forEach(element => {
        if (!answersList.includes(element.name)) {
            answersList.push(element.name);
        }
    });
    return data
}


// Random music 
const randomMusics = () => {
    const randomingMusic = Math.floor(Math.random() * musics.length)
    const randomed = musics[randomingMusic]
    musics.forEach(item => {
        elAudio.src = randomed
        elAudio.play()
    })
}


// Random answers
function randd() {
    let randd = Math.floor(Math.random() * answersList.length);
    let answerListRandoming = answersList[randd];
    let check = answersList.includes(answerListRandoming);

    if (check === true) {
        elAnswerText.innerHTML = answerListRandoming;
        elAnswerText.classList.add("mb-5", "p-2", "rounded", "sticky-top", "fs-3");
    }
}

// Rendering 
function showSings(arr) {

    for (i = 0; i < arr.length; i++) {

        let newItem = document.createElement("li");
        newItem.classList.add("data__item");
        newItem.dataset.name = arr[i].name;
        newItem.style.backgroundImage = `url(${arr[i].arrayImg})`;
        newItem.style.cursor = 'pointer'
        newItem.classList.add("positoin-relative")
        elDataListFragment.appendChild(newItem);
        elDataList.appendChild(elDataListFragment);
    }
}


// Create sings via user selet value
function sortingAllSings() {

    if (elSelection.value === "thirty") {
        setSelectedSings(thirtySings)
        showSings(thirtySings);
    }
    if ((elSelection.value === "fifty")) {
        setSelectedSings(fiftySings)
        showSings(fiftySings);
    } else if (elSelection.value === "ninethy") {
        setSelectedSings(ninethySings)
        showSings(ninethySings);
    }
}


// Countdown timer creating
let value = 180;

function countdownShow() {

    value--;

    let minut = Math.floor(value / 60);
    let seconds = Math.floor(value % 60);

    let b = document.querySelector('.minute');
    let m = document.querySelector('.seconds');
    elScore.innerHTML = `Your score: ${score}`;
    elScore.classList.add("mb-4");

    if (value >= 0) {

        b.innerHTML = formatTime(minut) + " :";
        m.innerHTML = formatTime(seconds);
    }
    if (value === 0) {
        elModalTitle.textContent = 'TIMEOUT!'
        elModal.classList.remove("d-none")
        elOverlay.classList.remove("d-none")
    }

}

startCountDownTimer = () => {
    timer = setInterval(countdownShow, 1000);
}


// Adding zero to timer
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}


// User tallagan select valuesigaq qarab, taymer nastroykasi
function counterSelectValue() {

    if (elCounterSelect.value === "180") {
        startCountDownTimer()

    }
    else if (elCounterSelect.value === "300") {
        value = 300;
        startCountDownTimer()
    }
    else {
        value = 540;
        startCountDownTimer()
    }
}

window.addEventListener("DOMContentLoaded", () => {
    randomMusics()
})


// Homepage form
elForm.addEventListener("submit", evt => {
    evt.preventDefault();
    elCar.classList.add("carDrive")
    setTimeout(() => {
        randomMusics()
        elStartPage.classList.add("d-none");
        elSelectsBox.classList.toggle("d-none");
        elPlayStatusBox.classList.toggle("pt-4")
        sortingAllSings(array);
        counterSelectValue();
        let item = document.querySelector(".data__item");
        elAnswerText.innerHTML = item.getAttribute("data-name");
        elAnswerText.classList.add("my-5", "p-2", "rounded", "sticky-top", "fs-3", "fw-medium");
        elMusicBtn.classList.remove("d-none")
        elWrongLabel.classList.remove('d-none')
    }, 1500);

});


function generateNextStep(findedData, sings) {
    elAnswerText.innerHTML = ""
    answersList.splice(findedData, 1);
    sings.splice(findedData, 1);
    elDataList.innerHTML = ""
    showSings(sings);
    RandomBySelectValue(sings)
    randd();
}

// Event delegation
elDataList.addEventListener("click", evt => {
    evt.preventDefault();
    elDataList.classList.remove("shake")
    const state = selectedSings()
    let targeted = evt.target.dataset.name;
    if (targeted === elAnswerText.innerHTML) {
        let finded = state.findIndex(item => item.name === targeted);
        score += 2
        elScoreUp.classList.add("scoreAnimation")

        setTimeout(() => {
            elScoreUp.classList.remove("scoreAnimation")
        }, 1500)

        if (elSelection.value === "thirty") {
            generateNextStep(finded, thirtySings)
        }
        else if ((elSelection.value === "fifty")) {
            generateNextStep(finded, fiftySings)

        } else if (elSelection.value === "ninethy") {
            generateNextStep(finded, ninethySings)
        }
    }

    else if (targeted !== elAnswerText.innerHTML) {
        elDataList.classList.add("shake")
        wrongAnswer += 1
        elWrongScore.innerHTML = wrongAnswer;
    }

    if (wrongAnswer == 5) {
        clearInterval(timer)
        elModalTitle.textContent = 'GAME OVER!'
        elModal.classList.remove("d-none")
        elOverlay.classList.remove("d-none")
    }

    else if (elAnswerText.innerHTML === "") {
        clearInterval(timer)
        elConfetti.style.display = 'block'
        initConfetti()
        render()
        elApplause.play()
        elModalTitle.textContent = 'CONGRATULATIONS! YOU WIN!!'
        elModal.classList.remove("d-none")
    }

})

elMusicBtn.addEventListener("click", () => {
    if (elMusicBtn.classList.contains("btn-warning")) {
        elAudio.muted = true
        elMusicBtn.classList.toggle('btn-warning')
    }
    else {
        elMusicBtn.classList.toggle('btn-warning')
        elAudio.muted = false;

    }

})



elModal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("main")) {
        window.location.reload()
    }
})




//Congratulation functions start
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let cx = ctx.canvas.width / 2;
let cy = ctx.canvas.height / 2;

let confetti = [];
const confettiCount = 300;
const gravity = 0.5;
const terminalVelocity = 5;
const drag = 0.075;
const colors = [
    { front: 'red', back: 'darkred' },
    { front: 'green', back: 'darkgreen' },
    { front: 'blue', back: 'darkblue' },
    { front: 'yellow', back: 'darkyellow' },
    { front: 'orange', back: 'darkorange' },
    { front: 'pink', back: 'darkpink' },
    { front: 'purple', back: 'darkpurple' },
    { front: 'turquoise', back: 'darkturquoise' }];


//-----------Functions--------------
const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cx = ctx.canvas.width / 2;
    cy = ctx.canvas.height / 2;
};

const randomRange = (min, max) => Math.random() * (max - min) + min;

const initConfetti = () => {
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            color: colors[Math.floor(randomRange(0, colors.length))],
            dimensions: {
                x: randomRange(10, 20),
                y: randomRange(10, 30)
            },

            position: {
                x: randomRange(0, canvas.width),
                y: canvas.height - 1
            },

            rotation: randomRange(0, 2 * Math.PI),
            scale: {
                x: 1,
                y: 1
            },

            velocity: {
                x: randomRange(-25, 25),
                y: randomRange(0, -50)
            }
        });


    }
};

//---------Render-----------
const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach((confetto, index) => {
        let width = confetto.dimensions.x * confetto.scale.x;
        let height = confetto.dimensions.y * confetto.scale.y;

        // Move canvas to position and rotate
        ctx.translate(confetto.position.x, confetto.position.y);
        ctx.rotate(confetto.rotation);

        // Apply forces to velocity
        confetto.velocity.x -= confetto.velocity.x * drag;
        confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
        confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

        // Set position
        confetto.position.x += confetto.velocity.x;
        confetto.position.y += confetto.velocity.y;

        // Delete confetti when out of frame
        if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

        // Loop confetto x position
        if (confetto.position.x > canvas.width) confetto.position.x = 0;
        if (confetto.position.x < 0) confetto.position.x = canvas.width;

        // Spin confetto by scaling y
        confetto.scale.y = Math.cos(confetto.position.y * 0.1);
        ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

        // Draw confetto
        ctx.fillRect(-width / 2, -height / 2, width, height);

        // Reset transform matrix
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    });

    // Fire off another round of confetti
    if (confetti.length <= 10) initConfetti();

    window.requestAnimationFrame(render);
};



//----------Resize----------
window.addEventListener('resize', function () {
    resizeCanvas();
});

//------------Click------------
window.addEventListener('click', function () {
    initConfetti();
});



// const randomArray = new Uint32Array(1);
// window.crypto.getRandomValues(randomArray);

// const message = 'he';
// const encoder = new TextEncoder();
// const data = encoder.encode(message);
// window.crypto.subtle.digest('SHA-256', data)


//   function generateRandomString(length) {
//     const randomArray = new Uint8Array(length);
//     window.crypto.getRandomValues(randomArray);
//     const base64String = btoa(String.fromCharCode(...randomArray));
//     const finalR = base64String.replaceAll("/", "m")
//     return finalR.slice(0, length);
//   }


//   console.log(generateRandomString(24));

//   const options = {
//     method: "GET",
//     responseType: "arraybuffer",
//     url: '../deo.mp4'
//   }


// async function replaceUrl() {
//     const res = await axios.request(options)
//     const data = new Blob([res.data])
//     const urll = URL.createObjectURL(data)
//     elVideo.src = urll
//     console.log(urll)
// }

// replaceUrl()


