
window.onload = function(){
    function startGame(){
        gameStart();
    }
    var test = document.getElementById('test');
    const buttonNewGame = document.createElement('button');
    buttonNewGame.setAttribute('class','button-6')
    buttonNewGame.textContent = 'New Game';
    buttonNewGame.style.width = '12%';
    const imgOne = document.getElementById('source');
    const imgTwo = document.getElementById('source2');
    imgOne.style.visibility = 'hidden';
    imgTwo.style.visibility = 'hidden';
    test.append(buttonNewGame);
    buttonNewGame.addEventListener('click',function(){
        buttonNewGame.parentNode.removeChild(buttonNewGame);
        startGame();
    } );
    
}

function gameStart(){
    
    var test = document.getElementById('test');
    
    var src = document.createElement('canvas');
    
    src.setAttribute('id', 'stage');
    src.setAttribute('width', '1920px');
    src.setAttribute('height', '1080px');
    test.append(src);
    document.getElementById("source").style.display = "none";
    document.getElementById("source2").style.display = "none";
    var stage = document.getElementById('stage');
    var ctx = stage.getContext("2d");
    const image = document.getElementById('source');
    const imageTwo = document.getElementById('source2');
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000/15);
    
    var count = 0;
    const vel = 1;
    var gamestarted = false;
    var vx = vy = 0;
    var px = py = 10;
    var lp = 20;
    var qp = 96;
    var gp = 48;
    var ax=Math.floor(Math.random()*qp)
    var aax=Math.floor(Math.random()*qp)
    var ay=Math.floor(Math.random()*gp);
    var aay=Math.floor(Math.random()*gp);
    var pontos = 0;
    var vidas = 5;
    var trail = [];
    tail = 5;
    
    function game(){
        px += vx;
        py += vy;
        if(px <0){
            px = qp-1;
        }
        if(px>qp-1){
            px = 0;
        }
        if(py<0){
            py = gp-1;
        }
        if(py>gp-1){
            py = 0;
        }

        ctx.fillStyle="black";
        ctx.fillRect(0, 0, stage.width, stage.height);
        ctx.fillStyle = "red";
        ctx.drawImage(imageTwo,ax*lp, ay*lp, lp, lp);
        
        if (count>400){
            ctx.drawImage(image,aax*lp, aay*lp, lp, lp);
        }
        
        

        ctx.fillStyle = "gray";
        for (var i = 0; i < trail.length; i++) {
        ctx.drawImage(image,trail[i].x*lp, trail[i].y*lp, lp-1,lp-1);
        if (trail[i].x == px && trail[i].y == py){
            vx = vy = 0;
            
            if(vidas>0&&gamestarted==true){
                var randX = Math.floor(Math.random()*qp);
                var randY=  Math.floor(Math.random()*gp);
                px = randX;
                py = randY;
                gamestarted = false;
                vidas--;
            }
            else if((vidas==1||vidas==0)&&gamestarted==true){
               
                
                vidas = 5;
                pontos = 0;
                
                alert("Você morreu");
                   
                tail =5;
                pontos = 0;
                gamestarted = false;
                var randX = Math.floor(Math.random()*qp);
                var randY=  Math.floor(Math.random()*gp);
                px = randX;
                py = randY;
            }
            
            }
        }
        trail.push({x:px,y:py })
        while(trail.length > tail){
            trail.shift();
        }

        
        if(ax==px && ay==py){
            tail++;
            pontos++;
            ax = Math.floor(Math.random()*qp);
            ay = Math.floor(Math.random()*gp);
        }
        if(aax==px && aay==py && count>400){
            tail++;
            pontos+=2;
            aax = Math.floor(Math.random()*qp);
            aay = Math.floor(Math.random()*gp);
        }
        
        ctx.font = "22px myFont";
        ctx.fillText("Pontos:", 0, 25);
        ctx.fillText(pontos, 200, 25);
        ctx.fillText("Vida:", 0, 55);
        ctx.fillText(vidas, 200, 55);
        count++;
    } 
    function keyPush(event){
        switch (event.keyCode){
            case 37:
                vx = -vel;
                vy = 0;
                gamestarted = true;
                break;
            case 38:
                vx = 0;
                vy = -vel;
                gamestarted = true;
                break;
            case 39:
                vx = vel;
                vy = 0;
                gamestarted = true;
                break;
            case 40:
                vx = 0;
                vy = vel;
                gamestarted = true;
                break;
            default:
                break;
        }
    }
    const titles = [
        "S", "Sn", "Sna", "Snak", "Snake","SnakeG","SnakeGa","SnakeGam","SnakeGame", "SnakeGam","SnakeGa","SnakeG", "Snake", "Snak", "Sna", "Sn","S"
      ]
    function changeTitles(titles){
      let ii = 0
      return (function update() {
        document.querySelector('title').textContent = titles[(ii++ % titles.length)]
        setTimeout(update, 400)
      })()
    }
    changeTitles(titles);
}


