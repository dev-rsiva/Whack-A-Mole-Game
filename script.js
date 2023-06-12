
let scoreH2 = document.getElementById("score");
let timeLeftH2 = document.getElementById("timeLeft");
let startNewGameButton = document.getElementById("startNewGame");
let pauseGameButton = document.getElementById("pauseGame");
let squares = document.querySelectorAll(".square");
let gameMusic = new Audio('gameMusic.mp3');
let hitMusic = new Audio('hitMusic.mp3');
let grid = document.getElementsByClassName("grid")[0];

let score = 0;
let timeLeft = 0;
let hitPosition = null;
let randomMoleId = null;
let timerId = null;


function randomMole(){

    squares.forEach(square => {
        square.classList.remove("mole")
    })

    let randomSquare = squares[Math.floor(Math.random()*squares.length)];

    randomSquare.classList.add("mole")

    hitPosition = randomSquare.id
}

randomMole()

function countDown(){

    timeLeft-- ;
    timeLeftH2.innerHTML = `Time left: ${timeLeft}` ;

    if(timeLeft === 0){
        clearInterval(randomMoleId);
        clearInterval(timerId);
        grid.style.display = "none";
    }
}


function startNewGame(){
    score=0;
    timeLeft=60;
    score.innerHTML = "Your Score: 0";
    timeLeft.innerHTML = "Time Left: 60";
    grid.style.display = "flex";
    pauseGameButton.style.display = "inline-block";
    pauseGameButton.innerHTML = "Pause";
    gameMusic.play();
    randomMoleId = setInterval(randomMole, 1000);
    timerId = setInterval(countDown, 1000);
}

function pauseResumeButton(){

        if(pauseGameButton.textContent === "Pause"){
            gameMusic.pause();
            clearInterval(randomMoleId);
            clearInterval(timerId);
            randomMoleId = null;
            timerId = null;
            pauseGameButton.textContent = "Resume";
        }else{
            gameMusic.play();
            randomMoleId = setInterval(randomMole, 1000);
            timerId = setInterval(countDown, 1000);
            pauseGameButton.textContent = "Pause";
        }

}

startNewGameButton.addEventListener("click", startNewGame)

squares.forEach( square=>{

    square.addEventListener("mousedown", ()=>
    {
        if(timerId !== null){
            if(square.id===hitPosition){
                hitMusic.play();
                setTimeout(()=>{
                    hitMusic.pause()
                }, 1000) ;
                score++;
                scoreH2.innerText = `Your score: ${score}`
                hitPosition = null
    }
    }
    }
    )
    
})



pauseGameButton.addEventListener("click", pauseResumeButton)

