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
    
    