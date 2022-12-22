// mensagens
const mensagens = () => {
    score.innerHTML = `Pontuação: `;
    score.innerHTML += `${nivel}`;
    level.innerHTML = `Nível: `;
    level.innerHTML += `${nivel+1}`;
    difficultyTxt.innerHTML = `Dificuldade: `;
    difficultyTxt.innerHTML += `${difi}`;
};  

// mudança na velocidade
let difi = '';
const difficulty = () => {
    if (nivel <= 2) {
        difi = 'Fácil';
        mensagens();
        return 1;
    } else if (nivel <= 6) {
        difi = 'Médio';
        mensagens();
        return 2;
    } else if (nivel >= 7){
        difi = 'Difícil';
        mensagens();
        return 3;     
    }
};

// piscar cores
let c = 0;
let speed = 0;
const piscaCor = () => {         
    switch(difficulty()){
        case 1:
            speed = 1200;
            break;
        case 2:
            speed = 1000;
            break;
        default:
            speed = 500;
            break;
    }
    if(c <= nivel){
        switch (sequencia[c]){
            case 1:
                bip.play();
                btnGreen.style.background = colors['greenOn'];
                setTimeout(() => {btnGreen.style.background = colors['greenOff']}, speed);
                c++;
                break;
            case 2:
                bip.play();
                btnRed.style.background = colors['redOn'];
                setTimeout(() => {btnRed.style.background = colors['redOff']}, speed);
                c++;
                break;
            case 3:
                bip.play();
                btnBlue.style.background = colors['blueOn'];
                setTimeout(() => {btnBlue.style.background = colors['blueOff']}, speed);
                c++;
                break;
            default:
                bip.play();
                btnYellow.style.background = colors['yellowOn'];
                setTimeout(() => {btnYellow.style.background = colors['yellowOff']}, speed);
                c++;
                break;
        }  
    } else {
        stopTimer();
    }
};

// associação de valores
let resp = [];
let cont = 0;
let bip = new Audio('./audio/bip.mp3');
const green = () => {
    if (clicked == true) {        
        clearInterval(inactiveInterval);
        if (open == true) {
            resp[cont] = 1;
            cont++;
            // efeito
            bip.play();
            btnGreen.style.background = colors['greenOn'];
            setTimeout(() => {btnGreen.style.background = colors['greenOff']}, 100);
            verificar();
        }
    } else {
        window.alert('Pressione o botão INICIAR');
    }
};
const red = () => {
    if (clicked == true) {
        clearInterval(inactiveInterval);
        if (open == true) {
            resp[cont] = 2;
            cont++;
            // efeito
            bip.play();
            btnRed.style.background = colors['redOn'];
            setTimeout(() => {btnRed.style.background = colors['redOff']}, 100);
            verificar();
        }
    } else {
        window.alert('Pressione o botão INICIAR');
    }
};
const blue = () => {
    if (clicked == true) {
        clearInterval(inactiveInterval);
        if (open == true) {
            resp[cont] = 3;
            cont++;
            // efeito
            bip.play();
            btnBlue.style.background = colors['blueOn'];
            setTimeout(() => {btnBlue.style.background = colors['blueOff']}, 100);
            verificar();
        }
    } else {
        window.alert('Pressione o botão INICIAR');
    }
};
const yellow = () => {
    if (clicked == true) {
        clearInterval(inactiveInterval);
        if (open == true) {
            resp[cont] = 4;
            cont++;
            // efeito
            bip.play();
            btnYellow.style.background = colors['yellowOn'];
            setTimeout(() => {btnYellow.style.background = colors['yellowOff']}, 100);
            verificar();
        }
    } else {
        window.alert('Pressione o botão INICIAR');
    }
};

// direciona para funções a partir do elemento pai
const optionsColor = {
    'btnGreen':  () => green(),
    'btnRed':    () => red(),
    'btnYellow': () => yellow(),
    'btnBlue':   () => blue(), 
};

const btns = id => optionsColor[id]();

const divBtns = window.document.getElementById('btns');
divBtns.addEventListener('click', (event) => {
    btns(event.target.id);
});

// verifica a inatividade 
let mili = 0;
let aux = 0;
const inactiveTimer = () => {
    mili += 10;
    if (mili == 600) {
        mili = 0;
        aux++;
        turnOnAll();
    }
    if (aux == 3) {
        clearInterval(inactiveInterval);
        saldoNeg++;
        verificar();
    }
};

const inactive = () => {
    mili = 0;
    aux = 0;
    inactiveInterval = setInterval(inactiveTimer, 100);
};

// verificar qual o recorde do jogador
let recorde = 0;
const msgRecord = (n) => {
    if (n > recorde) {
        recorde = n;
        difficultyTxt.innerHTML = `Novo Recorde: ${recorde}`;
    } else {
        difficultyTxt.innerHTML = `Recorde: ${recorde}`;
    }
};

// verificação
let saldoNeg = 0;
let pos = 0;
const verificar = () => {
    if (resp[pos] != sequencia[pos]){
        saldoNeg++;
    }
    pos++;
    if ((saldoNeg != 0) || (resp.length == sequencia.length)) {
        if (saldoNeg >= 1){
            score.innerHTML = `Você perdeu`;
            level.innerHTML = `Pontuação: ${nivel}`;
            msgRecord(nivel);
            open = false;
            btnStart.style.background = 'white';
            btnStart.value = `REINICIAR`;
        } else {
            nivel++;
            pos = 0;
            main();
        }
    }
};

// parar o timer 
let open = false;
const stopTimer = () => {
    clearInterval(tempo);
    c = 0;
    cont = 0;
    turnOnAll()
    open = true;
    inactive();
};

const turnOnAll = () => {
    bip.play();
    btnGreen.style.background = colors['greenOn'];
    btnRed.style.background = colors['redOn'];
    btnBlue.style.background = colors['blueOn'];
    btnYellow.style.background = colors['yellowOn'];
    setTimeout(() => {btnGreen.style.background = colors['greenOff']}, 200);
    setTimeout(() => {btnRed.style.background = colors['redOff']}, 200);
    setTimeout(() => {btnBlue.style.background = colors['blueOff']}, 200);
    setTimeout(() => {btnYellow.style.background = colors['yellowOff']}, 200);
};

colors = {
    greenOn:   '#80ff00',
    greenOff:  '#376e00',
    redOn:     '#ff0033',
    redOff:    '#750017',
    blueOn:    '#00bfff',
    blueOff:   '#003f53',
    yellowOn:  '#ffa600',
    yellowOff: '#6d4700',
};

// temporizador
const timer = () => {
    switch(difficulty()){
        case 1:
            tempo = setInterval(piscaCor, 2000);
            break;
        case 2:
            tempo = setInterval(piscaCor, 1500);
            break;
        default:
            tempo = setInterval(piscaCor, 800);
            break; 
    }
};

// sorteio
const raffle = () => {
    random = Math.floor(Math.random() * 4 + 1);
    sequencia.push(random);
}

// const principal
const main = () => {  
    btnStart.style.background = 'rgb(88, 88, 88)';
    gameStarted = true;
    clicked = true;
    open = false; 
    raffle();
    timer(); 
}

// resetar variáveis
const resetVariables = () => {
    random = 0;
    nivel = 0;
    clicked = false;
    gameStarted = false;
    open = false;
    saldoNeg = 0;
    pos = 0;
    cont = 0;
    c = 0;
    speed = 0;
    difi = '';
    resp = [];
    sequencia = [];
    btnStart.value = 'INICIAR';
};

// iniciar
let gameStarted = false;
const start = () => {
    if (gameStarted != true) {
        main();
    } else {
        if (saldoNeg >= 1) {
            resetVariables();
            start();
        }
    }
};

const btnStart = window.document.getElementById('btnStart');
btnStart.addEventListener('click', start); 

let sequencia = [];
let random = 0;
let nivel = 0;
const score = window.document.getElementById('score');
const level = window.document.getElementById('level');
const difficultyTxt = window.document.getElementById('difficulty');
let clicked = false;