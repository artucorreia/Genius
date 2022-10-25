let botaoStart = window.document.getElementById('start');
let sequencia = new Array;
let random = 0;
let nivel = 0;
let pontos = window.document.getElementById('pontos');
let level = document.querySelector('div#level');
let dificuldadeTxt = window.document.getElementById('dificuldade');
let clicado = false;

// iniciar
let gameIniciado = false;
function iniciar(){
    if (gameIniciado != true) {
        princial();
    } else {
        if (saldoNeg >= 1) {
            resetarVariáveis();
            iniciar();
        }
    }
}

// resetar variáveis
function resetarVariáveis(){
    random = 0;
    nivel = 0;
    clicado = false;
    gameIniciado = false;
    liberado = false;
    saldoNeg = 0;
    pos = 0;
    cont = 0;
    c = 0;
    velocidade = 0;
    difi = '';
    resp = [];
    sequencia = [];
    botaoStart.value = 'INICIAR';
}

// function principal
function princial(){  
    botaoStart.style.background = 'rgb(88, 88, 88)';
    gameIniciado = true;
    clicado = true;
    liberado = false; 
    sorteio();
    temporizador(); 
}

// sorteio
function sorteio(){
    random = Math.floor(Math.random() * 4 + 1);
    sequencia.push(random);
}

// temporizador
function temporizador(){
    switch(dificuldade()){
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

// parar o temporizador 
let liberado = false;
function paraTemporizador(){
    clearInterval(tempo);
    c = 0;
    cont = 0;
    bip.play();
    verde.style.background = 'rgb(128, 255, 0)';
    vermelho.style.background = 'rgb(255, 0, 51)';
    azul.style.background = 'deepskyblue';
    amarelo.style.background = 'rgb(255, 166, 0)';
    setTimeout(() => {verde.style.background = 'rgb(55, 110, 0)'}, 200);
    setTimeout(() => {vermelho.style.background = 'rgb(117, 0, 23)'}, 200);
    setTimeout(() => {azul.style.background = 'rgb(0, 63, 83)'}, 200);
    setTimeout(() => {amarelo.style.background = 'rgb(109, 71, 0)'}, 200);
    liberado = true;
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
            pontos.innerHTML = `Você perdeu`;
            level.innerHTML = `Pontuação: ${nivel}`;
            msgRecorde(nivel);
            liberado = false;
            botaoStart.style.background = 'white';
            botaoStart.value = `REINICIAR`;
        } else {
            nivel++;
            pos = 0;
            princial();
        }
    }
}

// verificar qual o recorde do jogador
let recorde = 0;
function msgRecorde(n){
    if (n > recorde) {
        recorde = n;
        dificuldadeTxt.innerHTML = `Novo Recorde: ${recorde}`;
    } else {
        dificuldadeTxt.innerHTML = `Recorde: ${recorde}`;
    }
}

// associação de valores
let resp = new Array;
let cont = 0;
let bip = new Audio('bip.mp3');
function green(){
    if (clicado == true) {        
        if (liberado == true) {
            resp[cont] = 1;
            cont++;
            // efeito
            bip.play();
            verde.style.background = 'rgb(128, 255, 0)';
            setTimeout(() => {verde.style.background = 'rgb(55, 110, 0)'}, 130);
            verificar();
        }
    } else {
        window.alert('Pressione o botão START para iniciar');
    }
}
function red(){
    if (clicado == true) {
        if (liberado == true) {
            resp[cont] = 2;
            cont++;
            // efeito
            bip.play();
            vermelho.style.background = 'rgb(255, 0, 51)';
            setTimeout(() => {vermelho.style.background = 'rgb(117, 0, 23)'}, 130);
            verificar();
        }
    } else {
        window.alert('Pressione o botão START para iniciar');
    }
}
function blue(){
    if (clicado == true) {
        if (liberado == true) {
            resp[cont] = 3;
            cont++;
            // efeito
            bip.play();
            azul.style.background = 'deepskyblue';
            setTimeout(() => {azul.style.background = 'rgb(0, 63, 83)'}, 130);
            verificar();
        }
    } else {
        window.alert('Pressione o botão START para iniciar');
    }
}
function yellow(){
    if (clicado == true) {
        if (liberado == true) {
            resp[cont] = 4;
            cont++;
            // efeito
            bip.play();
            amarelo.style.background = 'rgb(255, 166, 0)';
            setTimeout(() => {amarelo.style.background = 'rgb(109, 71, 0)'}, 130);
            verificar();
        }
    } else {
        window.alert('Pressione o botão START para iniciar');
    }
}

// piscar cores
let c = 0;
let velocidade = 0;
function piscaCor(){         
    switch(dificuldade()){
        case 1:
            velocidade = 1500;
            break;
        case 2:
            velocidade = 1000;
            break;
        default:
            velocidade = 500;
            break;
    }
    if(c <= nivel){
        switch (sequencia[c]){
            case 1:
                bip.play();
                verde.style.background = 'rgb(128, 255, 0)';
                setTimeout(() => {verde.style.background = 'rgb(55, 110, 0)'}, velocidade);
                c++;
                break;
            case 2:
                bip.play();
                vermelho.style.background = 'rgb(255, 0, 51)';
                setTimeout(() => {vermelho.style.background = 'rgb(117, 0, 23)'}, velocidade);
                c++;
                break;
            case 3:
                bip.play();
                azul.style.background = 'deepskyblue';
                setTimeout(() => {azul.style.background = 'rgb(0, 63, 83)'}, velocidade);
                c++;
                break;
            default:
                bip.play();
                amarelo.style.background = 'rgb(255, 166, 0)';
                setTimeout(() => {amarelo.style.background = 'rgb(109, 71, 0)'}, velocidade);
                c++;
                break;
        }  
    } else {
        paraTemporizador();
    }
}

// mudança na velocidade
let difi = '';
function dificuldade(){
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
    pontos.innerHTML = `Pontuação: `;
    pontos.innerHTML += `${nivel}`;
    level.innerHTML = `Nível: `;
    level.innerHTML += `${nivel+1}`;
    dificuldadeTxt.innerHTML = `Dificuldade: `;
    dificuldadeTxt.innerHTML += `${difi}`;
}   