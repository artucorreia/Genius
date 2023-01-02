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
                colors['greenOn']();
                setTimeout(() => {colors['greenOff']()}, speed);
                c++;
                break;
            case 2:
                bip.play();
                colors['redOn']();
                setTimeout(() => {colors['redOff']()}, speed);
                c++;
                break;
            case 3:
                bip.play();
                colors['blueOn']();
                setTimeout(() => {colors['blueOff']()}, speed);
                c++;
                break;
            default:
                bip.play();
                colors['yellowOn']();
                setTimeout(() => {colors['yellowOff']()}, speed);
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
    resp[cont] = 1;
    colors['greenOn']();
    setTimeout(() => {colors['greenOff']()}, 100);
};
const red = () => {
    resp[cont] = 2;
    colors['redOn']();
    setTimeout(() => {colors['redOff']()}, 100);
};
const blue = () => {
    resp[cont] = 3;
    colors['blueOn']();
    setTimeout(() => {colors['blueOff']()}, 100);
};
const yellow = () => {
    resp[cont] = 4;
    colors['yellowOn']();
    setTimeout(() => {colors['yellowOff']()}, 100);
};

// direciona para funções a partir do elemento pai
const turnOn = {
    'btnGreen':  () => green(),
    'btnRed':    () => red(),
    'btnYellow': () => yellow(),
    'btnBlue':   () => blue(), 
};

// procedimento padrão, para todas as cores
const Options = id => {
    if (clicked) {
        if (open) {
            clearInterval(inactiveInterval);
            inactive();
            bip.play();
            turnOn[id]();
            cont++;
            verificar();
        }
    } else {
        window.alert('Pressione o botão INICIAR');
    }
};

const sectionBtns = window.document.getElementById('btns');
sectionBtns.addEventListener('click', (event) => {
    let id = event.target.id
    if (id != 'btns' && id != '') {
        Options(id);
    }
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
let newRecord = false;
const saveRecord = n => {
    let record = localStorage.getItem('record');
    if (record == null) {
        localStorage.setItem('record', n);
    }
    if (n > Number(record)) {
        localStorage.record = n.toString();
        newRecord = true;
    }
    msgRecord(localStorage.record);
};

const msgRecord = record => {
    if (newRecord) {
        difficultyTxt.innerHTML = `Novo Recorde: ${record}`;
    } else {
        difficultyTxt.innerHTML = `Recorde: ${record}`;
    }
    newRecord = false;
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
            saveRecord(nivel);
            open = false;
            btnStart.style.background = 'white';
            btnStart.value = `REINICIAR`;
        } else {
            nivel++;
            pos = 0;
            main();
        }
        clearInterval(inactiveInterval);
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
    colors['greenOn']();
    colors['redOn']();
    colors['blueOn']();
    colors['yellowOn']();
    setTimeout(() => {colors['greenOff']()}, 200);
    setTimeout(() => {colors['redOff']()}, 200);
    setTimeout(() => {colors['blueOff']()}, 200);
    setTimeout(() => {colors['yellowOff']()}, 200);
};

// botões do genius
const btnGreen = window.document.getElementById('btnGreen') 
const btnRed = window.document.getElementById('btnRed')   
const btnBlue = window.document.getElementById('btnBlue')
const btnYellow = window.document.getElementById('btnYellow')

// trocar cores
colors = {
    greenOn:   () => btnGreen.style.background  = '#80ff00',
    greenOff:  () => btnGreen.style.background  = '#376e00',
    redOn:     () => btnRed.style.background    = '#ff0033',
    redOff:    () => btnRed.style.background    = '#750017',
    blueOn:    () => btnBlue.style.background   = '#00bfff',
    blueOff:   () => btnBlue.style.background   = '#003f53',
    yellowOn:  () => btnYellow.style.background = '#ffa600',
    yellowOff: () => btnYellow.style.background = '#6d4700',
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
};

// const principal
const main = () => {  
    btnStart.style.background = 'rgb(88, 88, 88)';
    gameStarted = true;
    clicked = true;
    open = false; 
    raffle();
    timer(); 
};

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