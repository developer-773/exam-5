const elSelectsBox = document.querySelector(".selects__box");
const elCounterSelect = document.querySelector(".counter__select");
const elSelection = document.querySelector(".select");
const elScore = document.querySelector(".score");
const elPlayStatusBox = document.querySelector(".play__status");
let elAnswerText = document.querySelector(".answer__txt");

let rand = Math.floor(Math.random() * 20) + 1;

const thirtyMovies = array.slice(rand, 22);
const fiftyMovies = array.slice(rand, 77);
const ninethyMovies = array.slice(rand, 90);
const elStartPage = document.querySelector("#mainblock");
const elForm = document.querySelector(".selectsForm");
const elDataList = document.querySelector(".data__list");
const elDataListFragment = document.createDocumentFragment();
const answersList = [];



function RandomBySelectValue(param) {
    
    let data = param.forEach(element => {
        console.log(element.name)
        if (!answersList.includes(element.name)) {
            answersList.push(element.name);
        }
    });
    
}


let score = 0;
let wrongAnswer = 5;


// Random answers
function randd() {  
    let randd = Math.floor(Math.random() * answersList.length);
    let answerListRandoming = answersList[randd];
    let check = answersList.includes(answerListRandoming);
    
    if (check === true) {
        elAnswerText.innerHTML =  answerListRandoming;
        elAnswerText.classList.add("mb-5" ,"p-2", "rounded", "sticky-top");
    }
}

// Rendering 

function showSings(arr) {
    
    for (i=0; i<arr.length; i++) {
        
        let newItem = document.createElement("li");
        newItem.classList.add("data__item");
        newItem.dataset.name = arr[i].name;
        
        newItem.style.backgroundImage = `url(${arr[i].arrayImg})`;
        
        elDataListFragment.appendChild(newItem);
        
        elDataList.appendChild(elDataListFragment);
    }
}


// Create sings via user selet value

function sortingAllSings() {
    
    if (elSelection.value === "thirty") {
        showSings(thirtyMovies);
    }
    if ((elSelection.value === "fifty") ) {
        showSings(fiftyMovies);
    }else if (elSelection.value === "ninethy") {
        showSings(ninethyMovies);
    }
    
}


// Countdown timer creating

let value = 180;

function countdownShow () {
    
    value--;
    
    let minut = Math.floor(value / 60);
    let seconds = Math.floor(value % 60);
    
    let b = document.querySelector('.minute');
    let m = document.querySelector('.seconds');
    elScore.innerHTML = `Your score: ${score}`  ;
    elScore.classList.add("mb-4");
    
    if (value >=0) {
        
        b.innerHTML = formatTime(minut) + " :";
        m.innerHTML = formatTime(seconds);
    }
    
}

// Adding zero to timer

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}


// User tallagan select valuesigaq qarab, taymer nastroykasi
function counterSelectValue() {
    
    if (elCounterSelect.value === "180") {
        countdownShow();
        setInterval(countdownShow, 1000);
        
    }
    else if (elCounterSelect.value === "300") {
        value = 300;
        
        countdownShow();
        setInterval(countdownShow, 1000);
    }
    else {
        value = 540;
        countdownShow();
        setInterval(countdownShow, 1000);
    }
}

// Startpafe digi form
elForm.addEventListener("submit", evt => {
    evt.preventDefault();
    
    // pauseAudio();
    // elAudio.pause()
    elStartPage.classList.add("d-none");
    elSelectsBox.classList.toggle("d-none");
    elPlayStatusBox.classList.toggle("pt-4")
    
    sortingAllSings(array);
    
    counterSelectValue();
    
    let item = document.querySelector(".data__item");
    
    elAnswerText.innerHTML = item.getAttribute("data-name");
    elAnswerText.classList.add("mb-5" ,"p-2", "rounded", "sticky-top");
    
    
});



// Congratulation show functions


function congratulationsShow() {
    //-----------Var Inits--------------
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cx = ctx.canvas.width / 2;
    cy = ctx.canvas.height / 2;
    
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
        resizeCanvas = () => {
            canvas.width ="100%";
            canvas.height = window.innerHeight;
            cx = ctx.canvas.width / 2;
            cy = ctx.canvas.height / 2;
        };
        
        randomRange = (min, max) => Math.random() * (max - min) + min;
        
        initConfetti = () => {
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
        render = () => {
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
        
        //---------Execution--------
        initConfetti();
        render();

        
        //------------Click------------
        window.addEventListener('click', function () {
            initConfetti();
        });
    }
    
    
    
    // event delegation
    
    elDataList.addEventListener("click", evt =>{
        evt.preventDefault();
        
        let targeted = evt.target.dataset.name;
        
        
        if (targeted === elAnswerText.innerHTML) {
            let finded = thirtyMovies.findIndex(item => item.name === targeted);
            
            score+=2
            
            if (elSelection.value === "thirty") {
                elAnswerText.innerHTML = ""
                answersList.splice(finded, 1);
                thirtyMovies.splice(finded, 1);
                elDataList.innerHTML = ""
                showSings(thirtyMovies);
                RandomBySelectValue(thirtyMovies)
                randd();
            }
            if ((elSelection.value === "fifty") ) {
                elAnswerText.innerHTML = ""
                answersList.splice(finded, 1);
                fiftyMovies.splice(finded, 1);
                elDataList.innerHTML = ""
                showSings(fiftyMovies);
                RandomBySelectValue(fiftyMovies);
                randd(fiftyMovies);
            }else if (elSelection.value === "ninethy") {
                elAnswerText.innerHTML = ""
                answersList.splice(finded, 1);
                ninethyMovies.splice(finded, 1);
                elDataList.innerHTML = ""
                showSings(ninethyMovies);
                RandomBySelectValue(ninethyMovies);
                randd(ninethyMovies)
            }
            
        }else {
            wrongAnswer-=1;
        }

        if (wrongAnswer == 0 ) {
            alert("Siz yutqazdingiz");

        }
        
        if (elAnswerText.innerHTML === "") {
            congratulationsShow()
        }
        
    })
    
    