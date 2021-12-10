document.addEventListener('DOMContentLoaded', () => {
    const homer = document.querySelector('.homer> img');
    const grid = document.querySelector('.grid');
    const body = document.querySelector('body');
    
    let gravidade = 1;
    let isGameOver = false;

       function control(e){
        if(e.keyCode === 32){
            pular();
        }
    }
    document.addEventListener('keyup', control);

    let posicao = 10;
    function pular () {
      let contar = 0;  
      let tempoId = setInterval(function () {
        //mover para baixo
        if (contar === 15) {
          clearInterval(tempoId);
          let baixoTempoId = setInterval(function () {
            if (contar === 0) {
              clearInterval(baixoTempoId);
            } else{
                posicao -= 15;
                contar --;
                posicao *= gravidade;
                homer.style.bottom = posicao + 'px'
            }

          },20)
        }
        //mover para cima
        posicao +=15;
        contar++;
        posicao *= gravidade;
        homer.style.bottom = posicao + 'px'
      },20)
    }
  
    function gerarObstaculos() {
        let randomTime = Math.random() * 4000
        let posicaoObstaculo = 1000;
        const obstaculo = document.createElement('div');
        obstaculo.classList.add('obstaculo');
        grid.appendChild(obstaculo);
        obstaculo.style.left = posicaoObstaculo;
        let timerId = setInterval(function() {
            if (posicaoObstaculo > 0 && posicaoObstaculo < 60 && position < 60) {
              clearInterval(timerId)
              alert.innerHTML = 'Game Over';
              isGameOver = true;
              //remove all children
              body.removeChild(body.firstChild)
              while (grid.firstChild) {
                grid.removeChild(grid.lastChild)
              }
            }
          posicaoObstaculo -=10;
          obstaculo.style.left = posicaoObstaculo + 'px';  
        },20)
        if (!isGameOver) setTimeout(generateObstacles, randomTime)
      }
      gerarObstaculos()
    })