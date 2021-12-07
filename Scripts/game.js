document.addEventListener('DOMContentLoad',()=>{
    const dino = document.querySelector('.dino')
    function control(e){
        if(e.keyCode === 32){
            jump();
        }
    }
    document.addEventListener('keyup', control);

    function jump(){
        let tempo = setInterval(function(){
            //cima
            console.log('up');
            position +=
        })
    }
})