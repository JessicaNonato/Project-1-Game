document.addEventListener('DOMContentLoaded', () => {
    const homer = document.querySelector('.homer');
    const grid = document.querySelector('.grid');
    const body = document.querySelector('body');
    const alert = document.getElementById('alert');
    const ceu = document.querySelector("#ceu");
    let pulando = false;
    let gravidade = 1;
    let gameOver = false;
    let timerId = null;
    let tempoDoObstaculo = 0;
    let gameStarted = false;

    function controle(e){
      if (e.keyCode === 32) {
        if (!pulando) {
          pulando = true;
          pular()
        }
      }
    }

    document.addEventListener('keyup', controle);

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
              pulando = false;
            } else {
                posicao -= 15;
                contar --;
                posicao *= gravidade;
                homer.style.bottom = posicao + 'px';
            }

          },20)
        }
        //mover para cima
        posicao +=15;
        contar++;
        posicao *= gravidade;
        homer.style.bottom = posicao + 'px';
      },20)
    }
    
    let posicaoObstaculo = 1800;
   
    let obstaculos = [];
    function criarUmObstaculo(){
      console.log("estoufuncionandoCriar")
      const obstaculo = document.createElement('div');
      obstaculo.classList.add('obstaculo');
      obstaculo.style.left = posicaoObstaculo + 'px'; 
      grid.appendChild(obstaculo);
      
    }

    function moverObstaculos(obstaculo){
      console.log("estoufuncionando")

        let posicao = Number(obstaculo.style.left.replace("px",""));
        obstaculo.style.left = (posicao - 10) + "px";
    
    }

    function imageOption(){
      document.getElementById("imageoption").src="./img/game-over-homer.png";
      console.log('estouimg')
   }
    function gOver(obstaculo){
     
        let posicaoObstaculo = Number(obstaculo.style.left.replace("px",""));
        if (posicaoObstaculo > 0 && posicaoObstaculo < 70 && posicao < 70) {
          gameOver = true;
          imageOption();  
          alert.innerHTML = 'Game Over';       
          ceu.removeChild(grid);
          console.log('over');
      } 
    }
  
    function gerarObstaculos() {
      gameStarted = true;
      
        timerId = setInterval(function() {
          tempoDoObstaculo += 1;
          if(!gameOver){
            if (tempoDoObstaculo % 60 === 0){
              let randomTempo = Math.random() * 2000 + 1000;
              setTimeout(criarUmObstaculo, randomTempo);
            } 
            let todosObstaculos = grid.querySelectorAll(".obstaculo");
            for(let obstaculo of todosObstaculos){
            moverObstaculos(obstaculo);
            gOver(obstaculo);
            pontuacao(obstaculo);
            }
          } else{
            clearInterval(timerId);
            console.log("oi");
          }
        },30)
       
      }

      let pontos = 0;
      let score = body.querySelector(".score span");

      function pontuacao(obstaculo){
        let posicaoObstaculo = Number(obstaculo.style.left.replace("px",""));
        if(posicaoObstaculo <= 0){
          grid.removeChild(obstaculo);
          pontos += 1;
          score.innerHTML = pontos;
        }
      }

      //let btnStart = document.querySelector("#start");
      //btnStart.addEventListener("click",() =>{
        if(!gameStarted){
         gerarObstaculos();
         
        }
        
        let btn = document.querySelector("#refresh");
        btn.addEventListener("click", function() {
    
         location.reload();
          });

        });    
        
//});
