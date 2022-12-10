const btnStart = window.document.getElementById('start');
let sequencia = [];
let random = 0;
let nivel = 0;
const score = window.document.getElementById('score');
const level = window.document.getElementById('level');
const difficultyTxt = window.document.getElementById('difficulty');
let clicked = false;

// iniciar
const start = () => {
    if (gameStarted != true) {
        main();
    } else {
        if (saldoNeg >= 1) {
            resetarVariáveis();
            start();
        }
    }
};
let gameStarted = false;
btnStart.addEventListener('click', start); 

// resetar variáveis
function resetarVariáveis(){
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
}

// function principal
function main(){  
    btnStart.style.background = 'rgb(88, 88, 88)';
    gameStarted = true;
    clicked = true;
    open = false; 
    sorteio();
    timer(); 
}

// sorteio
function sorteio(){
    random = Math.floor(Math.random() * 4 + 1);
    sequencia.push(random);
}

// temporizador
function timer(){
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
}

// parar o timer 
let open = false;
function paratimer(){
    clearInterval(tempo);
    c = 0;
    cont = 0;
    bip.play();
    verde.style.background = 'rgb(128, 255, 0)';
    vermelho.style.background = 'rgb(255, 0, 51)';
    azul.style.background = 'rgb(0, 191, 255)';
    amarelo.style.background = 'rgb(255, 166, 0)';
    setTimeout(() => {verde.style.background = 'rgb(55, 110, 0)'}, 200);
    setTimeout(() => {vermelho.style.background = 'rgb(117, 0, 23)'}, 200);
    setTimeout(() => {azul.style.background = 'rgb(0, 63, 83)'}, 200);
    setTimeout(() => {amarelo.style.background = 'rgb(109, 71, 0)'}, 200);
    open = true;
}

// verificação
let saldoNeg = 0;
let pos = 0;
function verificar(){
    if (resp[pos] != sequencia[pos]){
        saldoNeg++;
    }
    pos++;
    if ((saldoNeg != 0) || (resp.length == sequencia.length)) {
        if (saldoNeg >= 1){
            score.innerHTML = `Você perdeu`;
            level.innerHTML = `Pontuação: ${nivel}`;
            msgRecorde(nivel);
            open = false;
            btnStart.style.background = 'white';
            btnStart.value = `REINICIAR`;
        } else {
            nivel++;
            pos = 0;
            main();
        }
    }
}

// verificar qual o recorde do jogador
let recorde = 0;
function msgRecorde(n){
    if (n > recorde) {
        recorde = n;
        difficultyTxt.innerHTML = `Novo Recorde: ${recorde}`;
    } else {
        difficultyTxt.innerHTML = `Recorde: ${recorde}`;
    }
}

// associação de valores
let resp = new Array;
let cont = 0;
let bip = new Audio('bip.mp3');
const green = () => {
    if (clicked == true) {        
        if (open == true) {
            resp[cont] = 1;
            cont++;
            // efeito
            bip.play();
            verde.style.background = 'rgb(128, 255, 0)';
            setTimeout(() => {verde.style.background = 'rgb(55, 110, 0)'}, 100);
            verificar();
        }
    } else {
        window.alert('Pressione o botão INICIAR');
    }
}
const red = () => {
    if (clicked == true) {
        if (open == true) {
            resp[cont] = 2;
            cont++;
            // efeito
            bip.play();
            vermelho.style.background = 'rgb(255, 0, 51)';
            setTimeout(() => {vermelho.style.background = 'rgb(117, 0, 23)'}, 100);
            verificar();
        }
    } else {
        window.alert('Pressione o botão INICIAR');
    }
}
const blue = () => {
    if (clicked == true) {
        if (open == true) {
            resp[cont] = 3;
            cont++;
            // efeito
            bip.play();
            azul.style.background = 'rgb(0, 191, 255)';
            setTimeout(() => {azul.style.background = 'rgb(0, 63, 83)'}, 100);
            verificar();
        }
    } else {
        window.alert('Pressione o botão INICIAR');
    }
}
const yellow = () => {
    if (clicked == true) {
        if (open == true) {
            resp[cont] = 4;
            cont++;
            // efeito
            bip.play();
            amarelo.style.background = 'rgb(255, 166, 0)';
            setTimeout(() => {amarelo.style.background = 'rgb(109, 71, 0)'}, 100);
            verificar();
        }
    } else {
        window.alert('Pressione o botão INICIAR');
    }
}

// direciona para funções a partir do elemento pai
const optionsColor = {
    'verde':    () => green(),
    'vermelho': () => red(),
    'amarelo':  () => yellow(),
    'azul':     () => blue(), 
};

const btns = id => optionsColor[id]();

const divBtns = window.document.getElementById('btns');
divBtns.addEventListener('click', (event) => {
    btns(event.target.id)
});

// piscar cores
let c = 0;
let speed = 0;
function piscaCor(){         
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
                verde.style.background = 'rgb(128, 255, 0)';
                setTimeout(() => {verde.style.background = 'rgb(55, 110, 0)'}, speed);
                c++;
                break;
            case 2:
                bip.play();
                vermelho.style.background = 'rgb(255, 0, 51)';
                setTimeout(() => {vermelho.style.background = 'rgb(117, 0, 23)'}, speed);
                c++;
                break;
            case 3:
                bip.play();
                azul.style.background = 'rgb(0, 191, 255)';
                setTimeout(() => {azul.style.background = 'rgb(0, 63, 83)'}, speed);
                c++;
                break;
            default:
                bip.play();
                amarelo.style.background = 'rgb(255, 166, 0)';
                setTimeout(() => {amarelo.style.background = 'rgb(109, 71, 0)'}, speed);
                c++;
                break;
        }  
    } else {
        paratimer();
    }
}

// mudança na speed
let difi = '';
function difficulty(){
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
}

//mensagens
function mensagens(){
    score.innerHTML = `Pontuação: `;
    score.innerHTML += `${nivel}`;
    level.innerHTML = `Nível: `;
    level.innerHTML += `${nivel+1}`;
    difficultyTxt.innerHTML = `Dificuldade: `;
    difficultyTxt.innerHTML += `${difi}`;
}   