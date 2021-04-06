const moldure = document.querySelector(".moldure");
moldure.setAttribute("width", canvas.width+70);

const clickSound = new Audio();
clickSound.src = "./assets/sounds/click.wav";

const main = document.querySelector("main");

const add = document.querySelector(".add");
const sub = document.querySelector(".sub");
const range = document.querySelectorAll(".range-img");
const lengthHTML = document.querySelector(".length");
let rangeValue0 = 3;
let rangeValue1 = 0;
let snakeLength = rangeValue0 + rangeValue1;
add.addEventListener("mousedown", ()=>{
    add.style.width = "45px";

    if(rangeValue0 + rangeValue1 === 10)return;
    rangeValue0 += 1;
    range[0].setAttribute("src", "./assets/images/range-value"+rangeValue0+".png");
    if(rangeValue0 > 5){
        rangeValue0 = 5;
        range[0].setAttribute("src", "./assets/images/range-value"+rangeValue0+".png");
        rangeValue1 += 1;
        range[1].setAttribute("src", "./assets/images/range-value"+rangeValue1+".png");
    }
    snakeLength = rangeValue0 + rangeValue1
    lengthHTML.innerText = snakeLength;
    clickSound.play();
});
sub.addEventListener("mousedown", ()=>{
    sub.style.width = "45px";

    if(rangeValue0 <= 1)return;
    rangeValue1 -= 1;
    range[1].setAttribute("src", "./assets/images/range-value"+rangeValue1+".png");
    if(rangeValue1 < 0){
        rangeValue1 = 0;
        range[1].setAttribute("src", "./assets/images/range-value"+rangeValue1+".png");
        rangeValue0 -= 1;
        range[0].setAttribute("src", "./assets/images/range-value"+rangeValue0+".png");
    }
    snakeLength = rangeValue0 + rangeValue1
    lengthHTML.innerText = snakeLength;
    clickSound.play();
});
add.addEventListener("mouseup", ()=>{
    add.style.width = "50px";
});
sub.addEventListener("mouseup", ()=>{
    sub.style.width = "50px";
});

const squareButton = document.querySelectorAll(".square-btn");
let dificulty = 2;
squareButton.forEach(btn=>{
    btn.addEventListener("mousedown", ()=>{
        btn.style.width = "45px";

        if(btn === squareButton[0])dificulty=1;
        else if(btn === squareButton[1])dificulty=2;
        else if(btn === squareButton[2])dificulty=3;

        if(dificulty == 1){
            document.querySelector(".dificulty-p").innerText = "Dificuldade: Facil";

            squareButton[0].setAttribute("src", "./assets/images/square_on.png");
            squareButton[1].setAttribute("src", "./assets/images/square_off.png");
            squareButton[2].setAttribute("src", "./assets/images/square_off.png");
        }else if(dificulty == 2){
            document.querySelector(".dificulty-p").innerText = "Dificuldade: Medio";

            squareButton[1].setAttribute("src", "./assets/images/square_on.png");
            squareButton[2].setAttribute("src", "./assets/images/square_off.png");
        }else if(dificulty == 3){
            document.querySelector(".dificulty-p").innerText = "Dificuldade: Dificil";

            squareButton[1].setAttribute("src", "./assets/images/square_on.png");
            squareButton[2].setAttribute("src", "./assets/images/square_on.png");
        }
        clickSound.play();
    });
    btn.addEventListener("mouseup", ()=>{
        btn.style.width = "50px";
    });
})


const startButton = document.querySelector(".start-game");
const gameContainer = document.querySelector(".game");
startButton.addEventListener("click", ()=>{
    gameContainer.removeChild(startButton);
    
    defineSnakeLengthStart(snakeLength);
    startGame(dificulty);
});

const restartButton = document.querySelector(".restart");
let restartInCanvas;
restartButton.addEventListener("mousedown", ()=>{
    restartButton.style.top = "3px";
    if(gameContainer.contains(startButton)){
        gameContainer.removeChild(startButton);
    }
    if(gameContainer.contains(restartInCanvas)){
        gameContainer.removeChild(restartInCanvas);
    }

    restartGame();
});
restartButton.addEventListener("mouseup", ()=>{
    restartButton.style.top = "0";
});
function verifyButtonInCanvas(){
    restartInCanvas = document.querySelector(".restart-btn-cnv");
    if(gameContainer.contains(restartInCanvas)){
        restartInCanvas.addEventListener("mousedown", ()=>{
            gameContainer.removeChild(restartInCanvas);
            
            restartGame();
        });
    }
}

function disableMenu(isEnable){
    const menu = document.querySelector(".config");
    const disableDiv = document.createElement("div");
    disableDiv.classList.add("disable");
    if(isEnable === "disable"){
        menu.appendChild(disableDiv);
    }else if(isEnable === "enable"){
        if(menu.contains(document.querySelector(".disable"))){
            menu.removeChild(document.querySelector(".disable"));
        }
    }
}

const githubButton = document.querySelector(".icon");
let isInfoOn = false;
githubButton.addEventListener("mousedown", ()=>{
    isInfoOn = !isInfoOn;

    if(main.contains(document.querySelector(".author")))main.removeChild(document.querySelector(".author"));

    if(isInfoOn){
        const info = document.createElement("div");
        info.classList.add("author");
        info.innerHTML = `
            <div>
                <span>Desenvolvido por <a href="https://github.com/arthurabreuvieira" target="_blank">Arthur Abreu Vieira Mendes</a></span>
                <span>Codigo disponivel no <a href="https://github.com/ArthurAbreuVieira/Snake-Game" target="_blank">repositorio do jogo no GitHub</a></span>
             </div>
        `;
        main.appendChild(info);
    }
});

const toggleMenu = document.querySelector(".toggle-menu");
let menuIsOpen = false;
const menu = document.querySelector(".info");
toggleMenu.addEventListener("mousedown", ()=>{
    const toggleMenuIcon = document.querySelector(".toggle-menu .icon");
    menuIsOpen = !menuIsOpen;
    if(menuIsOpen){
        menu.style.display = "block";
        toggleMenuIcon.innerHTML = "<i class='fas fa-times'></i>";
    }else{
        menu.style.display = "none";
        toggleMenuIcon.innerHTML = "<i class='fas fa-cog'></i>";
    }
        
});

window.addEventListener("resize", ()=>{
    const body = document.getElementsByTagName("body")[0];
    if(window.innerWidth <= 630){
        if(!body.contains(document.querySelector(".warn"))){
            const warn = document.createElement("div");
            warn.classList.add("warn");
            warn.innerHTML = `<div><p>O jogo nao e compativel com esse tamanho de tela!</p></div>`;
            body.appendChild(warn);
            main.style.display = "none";
        }
    }else{
        menu.style.display = "block";

        main.style.display = "flex";
        if(body.contains(document.querySelector(".warn")))
            body.removeChild(document.querySelector(".warn"));
    }
});